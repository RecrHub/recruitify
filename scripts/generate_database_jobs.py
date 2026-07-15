#!/usr/bin/env python3
"""
Generate ~500 database-related job postings (Vietnam) as SQL INSERTs
for the recruitify `job` and `job_skill` tables.

Targets:
- job.id 5..504 (4 seed jobs already exist)
- category_id = 1 (Information Technology) for all
- company_id cycles through 1..8
- employment_type_id, experience_level_id, work_approach_id varied
- ward_code sampled from real ward codes (HCM/HN/DN focus)
- min/max salary in USD/month, realistic ranges by experience level
- job_skill: 3-5 skills per job, focused on database stacks
"""

import os
import random
import re
from datetime import datetime, timedelta

random.seed(42)  # reproducible

OUT_PATH = "database-jobs-seed.sql"
NUM_JOBS = 500
START_ID = 5

# ---------------------------------------------------------------------------
# Load real ward codes from backup.sql so FK constraints always hold.
# backup.sql line format:
#   INSERT INTO public.wards VALUES ('00004', 'ba_dinh', 'Phường Ba Đình',
#       'Ba Dinh Ward', 'Ba Đình', 'Ba Dinh', 3, '01');
#   columns: code, code_name, full_name, full_name_en, name, name_en,
#            district_id, province_code
# ---------------------------------------------------------------------------
BACKUP_SQL_PATH = os.environ.get(
    "RECRUITIFY_BACKUP_SQL",
    os.path.join(os.path.dirname(__file__), "..", "backup.sql"),
)

def load_ward_codes(path: str) -> dict[str, list[str]]:
    """Return {province_code: [ward_code, ...]} from backup.sql."""
    text = open(path, encoding="utf-8").read()
    rows = re.findall(
        r"INSERT INTO public\.wards VALUES \('([^']+)',\s*'[^']+',\s*'[^']+',"
        r"\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*\d+,\s*'(\d+)'\)",
        text,
    )
    out: dict[str, list[str]] = {}
    for code, prov in rows:
        out.setdefault(prov, []).append(code)
    return out


WARDS_BY_PROVINCE = load_ward_codes(BACKUP_SQL_PATH)
# Province codes: 79=HCM, 01=HN, 48=DN, 31=Hai Phong, 92=Can Tho,
# 74=Binh Duong, 75=Dong Nai, 80=Long An (current 34-province scheme)
PRIMARY_PROVINCES = ["79", "01", "48", "31", "92", "74", "75", "80"]

# ---------------------------------------------------------------------------
# Reference data (must match ids in backup.sql)
# ---------------------------------------------------------------------------
COMPANY_IDS = list(range(1, 9))           # 1..8
CATEGORY_ID_IT = 1
WORK_APPROACH_IDS = [1, 2]                # 1=Onsite, 2=Remote
WORK_APPROACH_WEIGHTS = [0.55, 0.45]      # ~55% onsite, 45% remote

EMPLOYMENT_TYPE_IDS = [1, 4, 7, 8, 3, 2]  # Full-time, Contract, Remote, Hybrid, Internship, Part-time
EMPLOYMENT_TYPE_WEIGHTS = [0.55, 0.12, 0.10, 0.13, 0.06, 0.04]

EXPERIENCE_LEVEL_IDS = list(range(1, 9))  # 1..8
# Title suffix drives level bucket
LEVEL_BUCKETS = {
    1: ("Fresher",     (0.4, 1.0)),    # 0.4..1.0k USD
    2: ("Junior",      (0.8, 1.8)),
    3: ("Middle",      (1.5, 3.0)),
    4: ("Senior",      (2.5, 4.5)),
    5: ("Lead",        (3.5, 5.5)),
    6: ("Principal",   (4.5, 7.0)),
    7: ("Manager",     (4.0, 6.5)),
    8: ("Director",    (6.0, 10.0)),
}

# Pool of (province_code, label, short) for the 8 major tech cities.
PROVINCE_POOL = [
    ("79", "TP. Hồ Chí Minh", "HCM"),
    ("01", "Hà Nội",          "HN"),
    ("48", "Đà Nẵng",         "DN"),
    ("31", "Hải Phòng",       "HP"),
    ("92", "Cần Thơ",         "CT"),
    ("74", "Bình Dương",      "BD"),
    ("75", "Đồng Nai",        "DNI"),
    ("80", "Long An",         "LA"),
]
# Only keep provinces that actually have wards in backup.sql
PROVINCE_POOL = [
    (p, name, short)
    for p, name, short in PROVINCE_POOL
    if WARDS_BY_PROVINCE.get(p)
]


def pick_ward(province_code: str) -> str:
    return random.choice(WARDS_BY_PROVINCE[province_code])

# Skill ids from backup.sql (1=Java, 2=Spring Boot, 3=ReactJS, 4=NextJS,
# 5=PostgreSQL, 6=Docker, 7=Kubernetes, 8=CI/CD). DB-focused subset:
DB_SKILLS = [1, 2, 5, 6, 7, 8]  # exclude frontend-heavy React/NextJS for DB jobs

# ---------------------------------------------------------------------------
# Job title pool (database-related, mix of Vietnamese + English)
# ---------------------------------------------------------------------------
TITLE_TEMPLATES_BY_LEVEL = {
    1: [  # Fresher
        "Database Developer (Fresher)",
        "Junior SQL Developer",
        "Fresher Data Engineer",
        "Database Administrator (Fresher)",
        "Thực tập sinh Database",
        "Fresher Backend Developer (Database)",
    ],
    2: [  # Junior
        "Junior Database Administrator",
        "Junior MySQL Developer",
        "Junior PostgreSQL Engineer",
        "Junior Data Engineer",
        "Junior SQL Developer",
        "Junior NoSQL Developer",
        "Junior Database Developer",
        "Lập trình viên Database (Junior)",
    ],
    3: [  # Middle
        "Middle Database Administrator",
        "Database Developer (Middle)",
        "Middle SQL Developer",
        "Middle Data Engineer",
        "Database Engineer",
        "Backend Developer (Database, Middle)",
        "Middle ETL Developer",
        "Middle NoSQL Engineer",
    ],
    4: [  # Senior
        "Senior Database Administrator",
        "Senior PostgreSQL DBA",
        "Senior MySQL DBA",
        "Senior Database Engineer",
        "Senior Data Engineer",
        "Senior ETL Developer",
        "Senior SQL Developer",
        "Senior Database Developer",
        "Senior NoSQL Engineer",
        "Senior Database Migration Specialist",
    ],
    5: [  # Lead
        "Lead Database Engineer",
        "Lead Data Engineer",
        "Lead DBA",
        "Database Team Lead",
        "Lead ETL Engineer",
    ],
    6: [  # Principal
        "Principal Database Engineer",
        "Principal Data Engineer",
        "Principal DBA",
        "Staff Database Engineer",
    ],
    7: [  # Manager
        "Database Manager",
        "Data Engineering Manager",
        "Manager - Database Operations",
    ],
    8: [  # Director
        "Director of Database Engineering",
        "Director of Data Engineering",
        "Head of Database",
    ],
}

# Skill-set focus determines the description flavor
SKILL_FOCUS = [
    ("postgresql", [5, 2, 1, 6],
     "PostgreSQL", "advanced SQL, indexing, query optimization, replication, partitioning"),
    ("mysql",      [1, 2, 6, 8],
     "MySQL", "schema design, performance tuning, backup/recovery, replication"),
    ("oracle",     [1, 2, 5],
     "Oracle", "PL/SQL, RAC, Data Guard, performance tuning, RMAN"),
    ("sqlserver",  [1, 2, 5],
     "SQL Server", "T-SQL, stored procedures, Always On, SSIS/SSRS"),
    ("mongodb",    [1, 2, 6],
     "MongoDB", "sharding, replica sets, aggregation framework, schema design"),
    ("redis",      [1, 6],
     "Redis", "cluster, persistence, pub/sub, caching strategies"),
    ("bigdata",    [1, 7, 6, 8],
     "Big Data", "Spark, Hadoop, Kafka, Airflow, data lake architectures"),
    ("datawarehouse", [5, 1, 8],
     "Data Warehouse", "dimensional modeling, ETL/ELT, dbt, Snowflake/BigQuery"),
    ("clouddb",    [5, 6, 7, 8],
     "Cloud Database", "AWS RDS/Aurora, Azure SQL, GCP Cloud SQL, IaC"),
    ("devops_db",  [6, 7, 8, 5],
     "Database DevOps", "Flyway/Liquibase, CI/CD, containerized DBs, monitoring"),
]

BENEFITS_POOL = [
    "13th month salary, Health insurance, Annual leave 12+ days",
    "Performance bonus up to 3 months, Stock options, Premium healthcare",
    "Remote-friendly, Flexible hours, Meal allowance 1.5M VND",
    "Health insurance for family, Annual health check, Team building budget",
    "Laptop & gear provided, Training budget 5M/year, Conference sponsorship",
    "Hybrid working, 14 days annual leave, Free snacks & coffee",
    "Competitive salary, Project bonus, Long-service award",
    "Flexible working hours, WFH 3 days/week, Annual trip",
    "Premium health insurance, English class, Book allowance",
    "Performance review 2x/year, Clear career path, International projects",
]

DESCRIPTIONS_BY_FOCUS = [
    "{company} đang tìm kiếm một {title} để gia nhập đội ngũ kỹ thuật tại {city}. "
    "Bạn sẽ làm việc với {tech} và các công nghệ liên quan để xây dựng, vận hành "
    "và tối ưu các hệ thống dữ liệu phục vụ hàng triệu người dùng tại Việt Nam.",

    "We are hiring a {title} to join our database engineering team in {city}. "
    "You will design, build, and operate scalable data platforms using {tech}. "
    "Our systems process billions of records and power core business operations.",

    "{company} mở rộng team database và cần một {title} giàu kinh nghiệm về {tech}. "
    "Bạn sẽ đóng vai trò chủ chốt trong việc thiết kế schema, tối ưu truy vấn và "
    "đảm bảo độ tin cậy của các hệ thống dữ liệu quan trọng.",

    "Join {company} as a {title} working on {tech}-based platforms. "
    "You will collaborate with backend, data and DevOps teams to deliver "
    "high-performance data infrastructure serving customers across Vietnam and SEA.",

    "{company} is looking for a {title} based in {city} to strengthen our data platform. "
    "You will work on {tech}, focusing on {detail} for production-grade systems.",
]

REQUIREMENTS_BY_LEVEL = {
    1: [
        "Tốt nghiệp Đại học chuyên ngành CNTT hoặc tương đương.",
        "Hiểu biết cơ bản về SQL và một hệ quản trị cơ sở dữ liệu quan hệ.",
        "Tiếng Anh đọc hiểu tài liệu kỹ thuật.",
        "Tinh thần ham học hỏi, có khả năng làm việc nhóm.",
    ],
    2: [
        "1-2 năm kinh nghiệm với SQL và ít nhất một RDBMS (MySQL/PostgreSQL/Oracle).",
        "Hiểu biết về indexing, query optimization và transaction isolation.",
        "Quen thuộc với Git và quy trình phát triển phần mềm.",
        "Khả năng đọc hiểu tài liệu tiếng Anh.",
    ],
    3: [
        "3-4 năm kinh nghiệm làm việc thực tế với cơ sở dữ liệu quan hệ hoặc NoSQL.",
        "Thành thạo {detail}.",
        "Có kinh nghiệm thiết kế schema, partitioning, replication.",
        "Kinh nghiệm monitoring và troubleshooting production databases.",
        "Khả năng làm việc độc lập và mentor junior members.",
    ],
    4: [
        "5+ năm kinh nghiệm database engineering với {tech}.",
        "Chuyên sâu về {detail}.",
        "Kinh nghiệm thiết kế hệ thống high-availability và disaster recovery.",
        "Khả năng review code, đào tạo và dẫn dắt kỹ thuật cho team.",
        "Tiếng Anh giao tiếp tốt là một lợi thế.",
    ],
    5: [
        "7+ năm kinh nghiệm, trong đó có ít nhất 2 năm ở vị trí lead.",
        "Chuyên sâu {tech} và hệ sinh thái xung quanh.",
        "Kinh nghiệm thiết kế kiến trúc dữ liệu cho hệ thống scale lớn.",
        "Khả năng lãnh đạo team 4-6 người, làm việc với stakeholders.",
    ],
    6: [
        "10+ năm kinh nghiệm database/data engineering ở các hệ thống production quy mô lớn.",
        "Tầm nhìn kiến trúc và khả năng đưa ra quyết định công nghệ dài hạn.",
        "Kinh nghiệm làm việc với cloud data platforms (AWS/Azure/GCP).",
        "Đã từng thiết kế hệ thống phục vụ hàng trăm triệu records.",
    ],
    7: [
        "12+ năm kinh nghiệm CNTT, trong đó 5+ năm quản lý team data/database.",
        "Kinh nghiệm xây dựng và vận hành data platform ở quy mô enterprise.",
        "Kỹ năng quản lý stakeholder, ngân sách và lộ trình kỹ thuật.",
        "Tư duy chiến lược về data governance, security và compliance.",
    ],
    8: [
        "15+ năm kinh nghiệm, trong đó 7+ năm ở vị trí director/head.",
        "Định hướng chiến lược dữ liệu cho toàn bộ tổ chức.",
        "Kinh nghiệm làm việc với C-level, xây dựng data-driven culture.",
        "Hiểu biết sâu về data mesh, data fabric và modern data stack.",
    ],
}

RESPONSIBILITIES_BY_FOCUS = [
    "Thiết kế, phát triển và vận hành các giải pháp dữ liệu sử dụng {tech}.",
    "Tối ưu hiệu năng truy vấn, indexing và partitioning cho hệ thống production.",
    "Phối hợp với team backend/frontend để đảm bảo data layer ổn định.",
    "Xây dựng tooling, automation và quy trình backup/recovery.",
    "Tham gia on-call rotation, xử lý sự cố liên quan đến database.",
    "Viết tài liệu kỹ thuật, mentor thành viên mới trong team.",
    "Nghiên cứu và đánh giá công nghệ mới phục vụ nhu cầu kinh doanh.",
    "Đảm bảo tuân thủ security, data governance và privacy regulations.",
]



# ---------------------------------------------------------------------------
# Generators
# ---------------------------------------------------------------------------
def gen_title(level_id: int, idx: int) -> str:
    titles = TITLE_TEMPLATES_BY_LEVEL[level_id]
    # Cycle through titles, occasional suffix variants
    base = titles[idx % len(titles)]
    if idx % 7 == 0 and level_id >= 3:
        base += " (Vietnam)"
    elif idx % 11 == 0 and level_id >= 4:
        base += " - Hybrid"
    return base


def gen_salary(level_id: int) -> tuple[int, int]:
    label, (lo, hi) = LEVEL_BUCKETS[level_id]
    # Round to nearest 100 USD
    mn = round(random.uniform(lo, hi * 0.7) * 10) * 100
    mx = round(random.uniform(lo * 1.4, hi) * 10) * 100
    if mx <= mn:
        mx = mn + 300
    return mn, mx


def gen_skills(level_id: int, focus: tuple) -> list[int]:
    primary = list(focus[1])
    # Higher levels → slightly more skills
    extra_pool = [s for s in DB_SKILLS if s not in primary]
    n_extra = {1: 0, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 3, 8: 3}[level_id]
    extras = random.sample(extra_pool, k=min(n_extra, len(extra_pool)))
    skills = primary + extras
    random.shuffle(skills)
    return skills[:5]


def sql_str(s: str | None) -> str:
    if s is None:
        return "NULL"
    # Escape single quotes by doubling them (PostgreSQL standard)
    return "'" + s.replace("'", "''") + "'"


def gen_job(jid: int) -> tuple[str, str]:
    company_id = random.choice(COMPANY_IDS)
    company_name = COMPANY_NAMES[company_id - 1]

    level_id = random.choices(
        EXPERIENCE_LEVEL_IDS,
        weights=[8, 14, 24, 22, 10, 6, 8, 8]   # skewed to middle/senior
    )[0]

    emp_id = random.choices(EMPLOYMENT_TYPE_IDS, weights=EMPLOYMENT_TYPE_WEIGHTS)[0]
    work_id = random.choices(WORK_APPROACH_IDS, weights=WORK_APPROACH_WEIGHTS)[0]

    focus_key, _, tech_label, detail = random.choice(SKILL_FOCUS)
    province_code, city_full, city_short = random.choice(PROVINCE_POOL)
    ward_code = pick_ward(province_code)

    title = gen_title(level_id, jid)
    mn, mx = gen_salary(level_id)

    desc_template = random.choice(DESCRIPTIONS_BY_FOCUS)
    description = desc_template.format(
        company=company_name, title=title, tech=tech_label,
        city=city_full, detail=detail,
    )

    requirements = "\n".join(f"- {r}" for r in REQUIREMENTS_BY_LEVEL[level_id]).format(
        tech=tech_label, detail=detail,
    )
    responsibilities = "\n".join(f"- {r}" for r in RESPONSIBILITIES_BY_FOCUS).format(
        tech=tech_label,
    )
    benefit = random.choice(BENEFITS_POOL)

    # Spread created_at across the last 90 days
    base_ts = datetime(2026, 5, 1, 9, 0, 0)
    offset = timedelta(
        days=random.randint(0, 60),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
        seconds=random.randint(0, 59),
    )
    ts = (base_ts + offset).strftime("%Y-%m-%d %H:%M:%S.%f")

    is_featured = random.random() < 0.18  # ~18% featured
    is_hidden = False
    applied = random.randint(0, 80)
    view = random.randint(50, 1500)

    job_sql = (
        "INSERT INTO public.job VALUES ("
        f"{jid}, "
        f"{sql_str(benefit)}, "
        f"'{ts}', 'system', NULL, NULL, "
        f"{sql_str(description)}, "
        f"{'true' if is_hidden else 'false'}, "
        f"{sql_str(requirements)}, "
        f"{sql_str(responsibilities)}, "
        f"{sql_str(title)}, "
        f"'{ts}', 'system', "
        f"{CATEGORY_ID_IT}, {company_id}, {emp_id}, {level_id}, "
        f"{sql_str(ward_code)}, {work_id}, "
        f"{'true' if is_featured else 'false'}, "
        f"{mx}, {mn}, {applied}, {view}"
        ");"
    )

    # job_skill rows
    skill_ids = gen_skills(level_id, (focus_key, _, tech_label, detail))
    seen: set[int] = set()
    skill_sqls = []
    for sid in skill_ids:
        if sid in seen:
            continue
        seen.add(sid)
        skill_sqls.append(
            f"INSERT INTO public.job_skill VALUES ({jid}, {sid});"
        )

    return job_sql, "\n".join(skill_sqls)


COMPANY_NAMES = [
    "NextGen Software", "CodeBridge Solutions", "FinCore Tech", "ShopSphere",
    "MediTech Global", "EduSmart", "ChainWorks", "VietConnect Telecom",
]


def main() -> None:
    header = """-- ============================================================
-- recruitify: 500 database-related job postings (Vietnam)
-- Generated for AI training data
--
-- Usage:
--   psql -U <user> -d <db> -f database-jobs-seed.sql
--
-- Notes:
--   * Assumes backup.sql already loaded (categories 1..8, companies
--     1..8, skills 1..8, employment_types 1..8, experience_levels
--     1..8, work_approaches 1..2, wards) all present.
--   * job.id starts at 5 (4 seed jobs already exist).
--   * job_skill is populated with 3-5 DB-focused skills per job.
-- ============================================================

BEGIN;

-- Advance the sequence past the seed rows so future inserts continue
-- from MAX(id)+1 automatically.
SELECT setval(
    pg_get_serial_sequence('public.job', 'id'),
    (SELECT COALESCE(MAX(id), 0) FROM public.job)
);

"""
    footer = "\nCOMMIT;\n"

    job_lines: list[str] = []
    skill_lines: list[str] = []

    for i in range(NUM_JOBS):
        jid = START_ID + i
        job_sql, skill_sql = gen_job(jid)
        job_lines.append(job_sql)
        if skill_sql:
            skill_lines.append(skill_sql)

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(header)
        f.write("-- ----- job rows -------------------------------------------------\n")
        f.write("\n".join(job_lines))
        f.write("\n\n-- ----- job_skill rows ------------------------------------------\n")
        f.write("\n".join(skill_lines))
        f.write(footer)

    print(f"Wrote {OUT_PATH}: {NUM_JOBS} jobs, {len(skill_lines)} job_skill rows.")


if __name__ == "__main__":
    main()

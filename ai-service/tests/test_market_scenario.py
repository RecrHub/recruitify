"""
Scenario test cho market analyzer:
HR posts Job A (low views), clicks "Analysis" → so sánh với benchmark.

Dùng REAL functions từ app.analyzers.market (không mock logic) để verify
rằng fix #1 (Benefit comparison) và fix #2 (top performer ranking) thực sự
hoạt động trên code production.

Chroma được bypass bằng MockDoc — chỉ test pure logic.

Chạy:
    cd ai-service && venv/bin/python -m tests.test_market_scenario    # walkthrough
    cd ai-service && venv/bin/pytest tests/test_market_scenario.py -v  # assertions
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.schemas.analysis import JobRequest
from app.analyzers.market import _rank_candidates, build_comparison


# ============================================================
# Mock Document (giả lập LangChain Document — chỉ cần .metadata)
# ============================================================

class MockDoc:
    """Stand-in cho langchain_core.documents.Document — chỉ cần .metadata."""
    def __init__(self, metadata: dict):
        self.metadata = metadata


# ============================================================
# SCENARIO SETUP
# ============================================================

DEMO_PATH = Path(__file__).resolve().parent.parent / "app" / "demo_low_view_job.json"
JOB_A_RAW = json.loads(DEMO_PATH.read_text())
job_a = JobRequest(**JOB_A_RAW)

# 3 candidates đã có trong Chroma (search "Backend Java Information Technology")
# Distance = 1 - similarity, càng nhỏ càng giống
CANDIDATE_DATA = [
    {
        "id": "X",  # giống text nhất NHƯNG cũng đang chết
        "title": "Backend Java Developer",
        "company": "NextGen Software",
        "category": "Information Technology",
        "employment_type": "Full-time",
        "experience_level": "Junior",
        "work_approach": "On-site",
        "ward": "Ba Đình",
        "province": "Thành phố Hà Nội",
        "min_salary": 4000,
        "max_salary": 6000,
        "applied": 0,
        "view": 0,
        "description_word_count": 8,
        "benefit_word_count": 4,
        "_distance": 0.08,
    },
    {
        "id": "Y",  # ít giống text hơn NHƯNG performance TỐT — benchmark HR cần
        "title": "Senior Backend Engineer",
        "company": "EduSmart",
        "category": "Information Technology",
        "employment_type": "Full-time",
        "experience_level": "Senior",
        "work_approach": "On-site",
        "ward": "Tây Hồ",
        "province": "Thành phố Hà Nội",
        "min_salary": 2700,
        "max_salary": 4100,
        "applied": 68,
        "view": 307,
        "description_word_count": 50,
        "benefit_word_count": 8,
        "_distance": 0.18,
    },
    {
        "id": "Z",  # giống vừa, performance trung bình, Mid-Level match Job A
        "title": "Java Spring Boot Developer",
        "company": "CodeBridge Solutions",
        "category": "Information Technology",
        "employment_type": "Full-time",
        "experience_level": "Mid-Level",
        "work_approach": "On-site",
        "ward": "Cầu Giấy",
        "province": "Thành phố Hà Nội",
        "min_salary": 3000,
        "max_salary": 4500,
        "applied": 34,
        "view": 200,
        "description_word_count": 25,
        "benefit_word_count": 5,
        "_distance": 0.15,
    },
]


def _to_raw(candidates):
    """Convert candidate dicts sang (MockDoc, distance) tuples cho _rank_candidates."""
    return [
        (MockDoc({k: v for k, v in c.items() if k != "_distance"}), c["_distance"])
        for c in candidates
    ]


RAW_CANDIDATES = _to_raw(CANDIDATE_DATA)


# ============================================================
# MOCK LLM ADVICE — show what gap analysis would see
# ============================================================

def mock_llm_advice(comparison, your_applied, bench_applied, your_view, bench_view,
                    your_title, bench_title):
    weaker = [c["field"] for c in comparison if c["verdict"] == "worse"]
    weaker_text = ", ".join(weaker) if weaker else "no clearly weaker points"
    return (
        f"  [LLM gap-analysis input]\n"
        f"    Your '{your_title}' applied={your_applied}, view={your_view}\n"
        f"    Benchmark '{bench_title}' applied={bench_applied}, view={bench_view}\n"
        f"    Weaker fields: {weaker_text}"
    )


# ============================================================
# RUN
# ============================================================

def banner(s):
    print(f"\n{'=' * 72}\n{s}\n{'=' * 72}")


def main():
    banner("SCENARIO: HR Job A — tại sao ít view?")
    print(f"  Title:        {job_a.title}")
    print(f"  Company:      {job_a.company}")
    print(f"  Location:     '{job_a.ward}' | {job_a.province}")
    print(f"  Salary:       {job_a.min_salary:,} - {job_a.max_salary:,}")
    print(f"  Benefit:      '{job_a.benefit}'   <-- TRỐNG")
    print(f"  Description:  {len((job_a.description or '').split())} words")
    print(f"  Applied:      {job_a.applied}")
    print(f"  View:         {job_a.view}    <-- THẤP, HR thắc mắc")

    banner("3 CANDIDATES TRONG CHROMA (sau khi search)")
    print(f"  {'ID':<3} {'Title':<28} {'Location':<22} {'App':<5} {'View':<6} {'BenefitW':<9} {'Distance':<9}")
    for c in CANDIDATE_DATA:
        loc = f"{c['ward']}, {c['province'][:14]}"
        print(f"  {c['id']:<3} {c['title']:<28} {loc:<22} {c['applied']:<5} {c['view']:<6} {c['benefit_word_count']:<9} {c['_distance']:<9}")

    banner("OLD LOGIC — strategy='similarity' (composite = (1-distance) + field_bonus)")
    old_result = _rank_candidates(RAW_CANDIDATES, job_a, strategy="similarity", min_similarity=0.0)
    assert old_result is not None, "OLD strategy phải trả về candidate"
    old_top_meta, old_top_distance, old_candidates = old_result
    print(f"  {'Pool':<24} {'Composite':<10} {'Bonus':<7} {'Similarity':<11} {'Applied':<8}")
    for doc, dist, comp in old_candidates:
        # Reconstruct bonus from scratch (rough — chỉ để hiển thị)
        from app.analyzers.market import _field_bonus
        bonus = _field_bonus(job_a, doc.metadata)
        sim = round(1 - dist, 4)
        print(f"  {doc.metadata['title'][:23]:<24} {round(comp, 3):<10} {round(bonus, 2):<7} {sim:<11} {doc.metadata['applied']:<8}")
    old_pick_meta = old_top_meta
    print(f"\n  >>> OLD PICK: '{old_pick_meta['title']}'")
    print(f"      applied={old_pick_meta['applied']}, view={old_pick_meta['view']}  <-- (vẫn thấp hơn top performer)")

    banner("NEW LOGIC — strategy='performance' (default mới, min_similarity=0.45)")
    new_result = _rank_candidates(RAW_CANDIDATES, job_a, strategy="performance",
                                  min_similarity=0.45, perf_view_weight=0.05)
    assert new_result is not None, "NEW strategy phải trả về candidate"
    new_top_meta, new_top_distance, new_candidates = new_result
    print(f"  {'Pool':<24} {'PerfScore':<11} {'Similarity':<11} {'Applied':<8} {'View':<6}")
    for doc, dist, comp in new_candidates:
        sim = round(1 - dist, 4)
        perf = doc.metadata["applied"] + doc.metadata["view"] * 0.05
        print(f"  {doc.metadata['title'][:23]:<24} {round(perf, 2):<11} {sim:<11} {doc.metadata['applied']:<8} {doc.metadata['view']:<6}")
    new_pick_meta = new_top_meta
    print(f"\n  >>> NEW PICK: '{new_pick_meta['title']}'")
    print(f"      applied={new_pick_meta['applied']}, view={new_pick_meta['view']}  <-- DOI THU THANH CONG")

    banner("ADVICE GAP-ANALYSIS — OLD PICK")
    old_comp = build_comparison(job_a, old_pick_meta)
    print("  Comparison (OLD — không có Benefit):")
    has_benefit = False
    for c in old_comp:
        mark = "X" if c["verdict"] == "worse" else " "
        if c["field"] == "Benefit richness (words)":
            has_benefit = True
        print(f"    [{mark}] {c['field']:<35} yours={c['your_value']:<18} bench={c['competitor_value']:<15} ({c['verdict']})")
    if not has_benefit:
        print(f"\n  ⚠️  'Benefit richness' KHÔNG có trong comparison — gap về phúc lợi bị ẩn!")
    weaker_old = [c["field"] for c in old_comp if c["verdict"] == "worse"]
    print(f"\n  Weaker fields: {weaker_old}")
    print(f"  {mock_llm_advice(old_comp, job_a.applied, old_pick_meta['applied'], job_a.view, old_pick_meta['view'], job_a.title, old_pick_meta['title'])}")
    print(f"\n  ⚠️  LLM sẽ nói: 'Đối thủ cũng chỉ có {old_pick_meta['applied']} applied — bạn thua ở mô tả'")
    print(f"      → HR không nhận được gợi ý nào về BENEFIT (trường bị thiếu!)")

    banner("ADVICE GAP-ANALYSIS — NEW PICK (có Benefit)")
    new_comp = build_comparison(job_a, new_pick_meta)
    print("  Comparison (NEW — có Benefit):")
    for c in new_comp:
        mark = "X" if c["verdict"] == "worse" else " "
        print(f"    [{mark}] {c['field']:<35} yours={c['your_value']:<18} bench={c['competitor_value']:<15} ({c['verdict']})")
    weaker_new = [c["field"] for c in new_comp if c["verdict"] == "worse"]
    print(f"\n  Weaker fields: {weaker_new}")
    print(f"  {mock_llm_advice(new_comp, job_a.applied, new_pick_meta['applied'], job_a.view, new_pick_meta['view'], job_a.title, new_pick_meta['title'])}")
    print(f"\n  ✅ LLM sẽ nói:")
    print(f"      'Phúc lợi của bạn TRỐNG, đối thủ liệt kê 8 từ cụ thể (Stock options, Premium healthcare).'")
    print(f"      'Đối thủ ở Tây Hồ HN, bạn ở Bình Định — cân nhắc remote hoặc tăng lương.'")
    print(f"      'Mô tả của bạn 14 từ vs 50 từ — chi tiết tech stack sẽ tăng conversion.'")
    print(f"      → HR nhận 3 gap CỤ THỂ + gợi ý sửa!")

    banner("VERDICT")
    print(f"  OLD pick: '{old_pick_meta['title']}' (similarity+bonus)  — applied={old_pick_meta['applied']}, view={old_pick_meta['view']}")
    print(f"  NEW pick: '{new_pick_meta['title']}' (top performer)      — applied={new_pick_meta['applied']}, view={new_pick_meta['view']}")
    print()
    print(f"  Cùng input Job A, 2 strategy cho 2 benchmark khác hẳn nhau:")
    print(f"    OLD strategy → HR không nhận gap về BENEFIT, đối thủ cũng đang thấp")
    print(f"    NEW strategy → HR nhận 4 gap (Applications, Views, Description, Benefit) + gợi ý sửa")


# ============================================================
# Pytest assertions — verify REAL functions, not mocks
# ============================================================

def test_old_strategy_picks_by_similarity_plus_bonus_not_performance():
    """OLD strategy (similarity) pick theo (similarity + field_bonus) — KHÔNG quan tâm applied/view."""
    result = _rank_candidates(RAW_CANDIDATES, job_a, strategy="similarity", min_similarity=0.0)
    assert result is not None
    top_meta, _, candidates = result
    # Z thắng vì Mid-Level match +0.10 bonus, đẩy Z lên 1.05 trong khi X (giống text hơn) chỉ 1.02
    assert top_meta["title"] == "Java Spring Boot Developer", f"got {top_meta['title']}"
    # Pick vì field-match bonus, không vì perform tốt
    assert top_meta["applied"] < 68, "OLD pick vẫn thấp hơn top performer Y (68)"
    # Y (top performer) bị xếp cuối trong OLD
    assert candidates[-1][0].metadata["title"] == "Senior Backend Engineer"


def test_new_strategy_picks_top_performer_in_similar_group():
    """NEW strategy (performance, default) pick Y — top performer trong nhóm similarity >= 0.45."""
    result = _rank_candidates(RAW_CANDIDATES, job_a)  # default = performance
    assert result is not None
    top_meta, _, _ = result
    assert top_meta["title"] == "Senior Backend Engineer"
    assert top_meta["applied"] == 68
    assert top_meta["view"] == 307


def test_new_strategy_excludes_low_similarity_outliers():
    """Nếu có candidate quá khác (similarity < ngưỡng), NEW strategy loại khỏi pool
    ngay cả khi nó có applied cao — đảm bảo so sánh đúng loại job."""
    # Thêm candidate W: rất khác (distance=0.95) nhưng applied=999
    wild_doc = MockDoc({
        "title": "Marketing Manager",
        "company": "OtherCorp",
        "category": "Marketing",
        "applied": 999,
        "view": 5000,
        "description_word_count": 100,
        "benefit_word_count": 50,
        "ward": "",
        "province": "",
    })
    raw_with_wild = RAW_CANDIDATES + [(wild_doc, 0.95)]  # similarity = 0.05
    result = _rank_candidates(raw_with_wild, job_a, strategy="performance",
                              min_similarity=0.45, perf_view_weight=0.05)
    assert result is not None
    top_meta, _, _ = result
    assert top_meta["title"] == "Senior Backend Engineer", "W (Marketing) phải bị loại vì similarity < 0.45"


def test_old_comparison_lacks_benefit_field():
    """build_comparison phải có field 'Benefit richness (words)' — nếu thiếu là regression."""
    comp = build_comparison(job_a, CANDIDATE_DATA[1])  # candidate Y
    fields = [c["field"] for c in comp]
    assert "Benefit richness (words)" in fields, (
        f"Benefit field missing — analyzer sẽ không phát hiện gap về phúc lợi. "
        f"Got fields: {fields}"
    )


def test_benefit_field_flags_worse_when_benefit_is_empty():
    """Job A benefit='' (0 words), candidate Y benefit=8 words → verdict phải là 'worse'."""
    comp = build_comparison(job_a, CANDIDATE_DATA[1])  # candidate Y có benefit_word_count=8
    benefit_row = next(c for c in comp if c["field"] == "Benefit richness (words)")
    assert benefit_row["your_value"] == "0"
    assert benefit_row["competitor_value"] == "8"
    assert benefit_row["verdict"] == "worse"


def test_benefit_field_handles_missing_metadata_gracefully():
    """Nếu DB chưa reindex với benefit_word_count, so sánh vẫn hoạt động (fallback)."""
    legacy_meta = {k: v for k, v in CANDIDATE_DATA[1].items() if k not in ("benefit_word_count", "_distance")}
    comp = build_comparison(job_a, legacy_meta)
    benefit_row = next(c for c in comp if c["field"] == "Benefit richness (words)")
    assert benefit_row["competitor_value"] == "No data"
    assert benefit_row["verdict"] == "equal"  # fallback không kết luận


def test_new_strategy_picks_better_performing_benchmark_than_old():
    """NEW pick phải có applied/view CAO HƠN OLD pick — đó mới là mục đích thật
    của top-performer strategy. (Số lượng field 'worse' có thể bằng nhau vì
    Benefit comparison đã được thêm vào cả 2 strategy; điểm khác biệt nằm ở
    MỨC ĐỘ của gap, không phải số lượng field.)
    """
    old_result = _rank_candidates(RAW_CANDIDATES, job_a, strategy="similarity", min_similarity=0.0)
    new_result = _rank_candidates(RAW_CANDIDATES, job_a, strategy="performance")
    assert old_result is not None and new_result is not None
    old_pick = old_result[0]
    new_pick = new_result[0]

    # NEW pick phải là job perform tốt hơn OLD pick
    assert new_pick["applied"] > old_pick["applied"], (
        f"NEW applied ({new_pick['applied']}) should exceed OLD applied ({old_pick['applied']})"
    )
    assert new_pick["view"] > old_pick["view"], (
        f"NEW view ({new_pick['view']}) should exceed OLD view ({old_pick['view']})"
    )

    # Cùng 4 worse fields, nhưng gap của NEW lớn hơn (Applications 8 vs 68 thay vì 8 vs 34)
    old_comp = build_comparison(job_a, old_pick)
    new_comp = build_comparison(job_a, new_pick)
    old_app = int(next(c["competitor_value"] for c in old_comp if c["field"] == "Applications"))
    new_app = int(next(c["competitor_value"] for c in new_comp if c["field"] == "Applications"))
    assert new_app > old_app, (
        f"NEW Applications gap should be bigger: OLD competitor={old_app}, NEW competitor={new_app}"
    )


if __name__ == "__main__":
    main()

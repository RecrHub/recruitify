"""Test format advice text sinh ra từ _structured_to_text theo đúng spec HR.

Spec HR yêu cầu:
1. 5 sections đúng thứ tự: Bối cảnh / Giới thiệu Job tương đồng / Khoảng cách /
   Phúc lợi thiếu / Khuyến nghị ưu tiên.
2. Gọi tin HR là "Job phân tích", tin so sánh là "Job tương đồng".
3. KHÔNG dùng: "benchmark", "similarity", "vector", "Job A/B", "competitor".
4. KHÔNG markdown header (##), chỉ danh sách đánh số.
5. KHÔNG câu sáo rỗng: "hãy cân nhắc", "có thể xem xét".
6. Tổng ≤ 200 từ.
7. skills_analysis KHÔNG được render vào advice (kể cả khi có data).
8. Recommendations tối đa 3 items.

Chạy:
    cd ai-service && venv/bin/pytest tests/test_advice_format.py -v
"""
import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.analyzers.market import _structured_to_text, _market_context


# ============================================================
# Fixtures
# ============================================================

@pytest.fixture
def full_structured() -> dict:
    """Structured dict giả lập đầy đủ data — đầy đủ sections LLM."""
    return {
        "job_analyzing": {
            "title": "Senior SQL Developer",
            "company": "ChainWorks",
            "category": "Information Technology",
            "employment_type": "Full-time",
            "experience_level": "Senior",
            "work_approach": "Remote",
            "location": "Hồ Tràm, Thành phố Hồ Chí Minh",
            "salary": "3,000 - 4,000",
            "applied": 23,
            "view": 60,
        },
        "benchmark": {
            "title": "Senior ETL Developer",
            "company": "ShopSphere",
            "category": "Information Technology",
            "employment_type": "Contract",
            "experience_level": "Senior",
            "work_approach": "Onsite",
            "location": "Gò Dầu, Tỉnh Tây Ninh",
            "salary": "2,600 - 4,000",
            "applied": 80,
            "view": 1296,
        },
        "benchmark_reason": "Top performer nhóm IT Senior cùng danh mục.",
        "gap_analysis": [
            "Lượt xem Job phân tích 60 vs Job tương đồng 1296 — thêm 3 hashtag SEO vào tiêu đề.",
            "Phúc lợi Job phân tích 10 từ vs Job tương đồng 8 từ — đã đủ, không cần bổ sung.",
        ],
        "benefit_analysis": [
            "Job tương đồng có 'lương tháng 13, bảo hiểm premium' — Job phân tích nên thêm 2 mục này.",
        ],
        "skills_analysis": [
            "Skills không phù hợp cấp bậc.",  # ← PHẢI bị bỏ qua khi render advice
        ],
        "recommendations": [
            "Tăng SEO tiêu đề bằng 3 hashtag IT.",
            "Thêm lương tháng 13 vào phúc lợi.",
            "Đăng lại tin vào khung giờ 9-11h sáng.",
            "Viết lại mô tả dài hơn 50 từ.",  # ← thứ 4, phải bị cắt (max 3)
        ],
    }


# ============================================================
# Spec: 5 sections đúng thứ tự
# ============================================================

def test_advice_has_exactly_5_numbered_sections(full_structured):
    """Phải có đúng 5 section bắt đầu bằng '1.', '2.', '3.', '4.', '5.'"""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    lines = advice.split("\n")
    section_lines = [ln for ln in lines if ln and ln[0].isdigit() and ln[1] == "."]
    assert len(section_lines) == 5, (
        f"Expected 5 sections, got {len(section_lines)}:\n" + "\n".join(section_lines)
    )
    # Verify correct numbering
    assert section_lines[0].startswith("1. ")
    assert section_lines[1].startswith("2. ")
    assert section_lines[2].startswith("3. ")
    assert section_lines[3].startswith("4. ")
    assert section_lines[4].startswith("5. ")


def test_section_1_is_market_context(full_structured):
    """Section 1 phải nói Job phân tích đang ở đâu so với trung bình nhóm."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    sec1 = advice.split("\n")[0]
    assert "Job phân tích" in sec1
    # your_applied=23, avg=42.3, ratio=0.54 → "thấp hơn khoảng 46%"
    assert "thấp hơn" in sec1.lower() or "cao hơn" in sec1.lower() or "ngang" in sec1.lower()


def test_section_2_introduces_similar_job_with_reasons(full_structured):
    """Section 2 phải tên Job tương đồng + lý do chọn (cùng ngành/cấp bậc/cao nhất nhóm)."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    sec2 = advice.split("\n")[1]
    assert "Job tương đồng" in sec2
    assert "Senior ETL Developer" in sec2
    assert "ShopSphere" in sec2
    # Phải có 3 lý do: cùng ngành, cùng cấp bậc, cao nhất nhóm
    assert "cùng ngành" in sec2.lower()
    assert "cấp bậc" in sec2.lower()
    assert "cao nhất" in sec2.lower()


def test_section_3_renders_gap_analysis_items(full_structured):
    """Section 3 phải render từng item trong gap_analysis."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    assert "60" in advice  # your view
    assert "1296" in advice  # competitor view (gap item 1)


def test_section_4_renders_benefit_analysis(full_structured):
    """Section 4 phải render benefit_analysis items."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    assert "lương tháng 13" in advice.lower()
    assert "bảo hiểm premium" in advice.lower()


def test_section_5_caps_recommendations_at_3(full_structured):
    """Section 5 chỉ render tối đa 3 recommendations — item thứ 4 phải bị cắt."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    # Item 1, 2, 3 phải có
    assert "SEO tiêu đề" in advice
    assert "lương tháng 13" in advice
    assert "khung giờ" in advice
    # Item 4 phải bị cắt
    assert "Viết lại mô tả" not in advice, (
        "Recommendation thứ 4 phải bị cắt (max 3 theo spec HR)"
    )


# ============================================================
# Spec: Terminology — KHÔNG dùng thuật ngữ cũ
# ============================================================

@pytest.mark.parametrize("forbidden_word", [
    "benchmark", "Benchmark", "BENCHMARK",
    "Job A", "Job B",
    "your posting", "competitor", "Competitor",
    "similarity score", "vector", "embedding",
])
def test_advice_uses_no_forbidden_terminology(full_structured, forbidden_word):
    """Không được dùng thuật ngữ cũ trong advice text."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    assert forbidden_word not in advice, (
        f"Advice chứa từ cấm '{forbidden_word}':\n{advice}"
    )


# ============================================================
# Spec: Format constraints
# ============================================================

def test_advice_has_no_markdown_headers(full_structured):
    """Không được dùng markdown headers (## hoặc #)."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    assert "##" not in advice
    assert "\n#" not in advice


def test_advice_uses_correct_terminology(full_structured):
    """Phải dùng 'Job phân tích' và 'Job tương đồng'."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    assert "Job phân tích" in advice
    assert "Job tương đồng" in advice


def test_advice_does_not_render_skills_analysis(full_structured):
    """skills_analysis có data nhưng KHÔNG được render vào advice text."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    # skills_analysis có câu "Skills không phù hợp cấp bậc" — phải bị bỏ qua
    assert "Skills không phù hợp cấp bậc" not in advice, (
        "skills_analysis không được render trong advice (UI tự dùng từ structured)"
    )


def test_advice_word_count_under_200(full_structured):
    """Tổng advice text không quá 200 từ theo spec HR."""
    advice = _structured_to_text(
        full_structured, your_applied=23, avg_applied=42.3
    )
    word_count = len(advice.split())
    assert word_count <= 200, f"Advice quá dài: {word_count} từ (max 200)"


# ============================================================
# Spec: Edge cases
# ============================================================

def test_market_context_handles_zero_average():
    """Khi avg_applied = 0 (chưa có data), section 1 phải nói 'chưa đủ dữ liệu'."""
    ctx = _market_context(your_applied=10, avg_applied=0)
    assert "chưa có đủ dữ liệu" in ctx.lower() or "chưa" in ctx.lower()


def test_market_context_handles_none_average():
    """Khi avg_applied = None, section 1 phải nói 'chưa có đủ dữ liệu'."""
    ctx = _market_context(your_applied=10, avg_applied=None)
    assert "chưa" in ctx.lower()


@pytest.mark.parametrize("your_applied,avg,expected_keyword", [
    (10, 20, "thấp hơn"),       # ratio 0.5 → thấp hơn
    (19, 20, "ngang"),          # ratio 0.95 → ngang
    (40, 20, "cao hơn"),         # ratio 2.0 → cao hơn
])
def test_market_context_ratio_branches(your_applied, avg, expected_keyword):
    """3 nhánh: thấp hơn / ngang / cao hơn tùy tỉ lệ your/avg."""
    ctx = _market_context(your_applied=your_applied, avg_applied=float(avg))
    assert expected_keyword in ctx.lower(), (
        f"Expected keyword '{expected_keyword}' in context for your={your_applied}, avg={avg}: got '{ctx}'"
    )


def test_advice_handles_empty_llm_sections():
    """Khi LLM fail / trả rỗng, advice vẫn phải render đủ 5 sections với fallback text."""
    structured = {
        "job_analyzing": {"title": "X", "company": "Y", "category": "IT",
                          "employment_type": "Full-time", "experience_level": "Senior",
                          "work_approach": "Remote", "location": "HN",
                          "salary": "1k-2k", "applied": 0, "view": 0},
        "benchmark": {"title": "Z", "company": "W", "category": "IT",
                      "employment_type": "Full-time", "experience_level": "Senior",
                      "work_approach": "Onsite", "location": "HCM",
                      "salary": "2k-3k", "applied": 10, "view": 100},
        "benchmark_reason": "test",
        "gap_analysis": [],
        "benefit_analysis": [],
        "skills_analysis": [],
        "recommendations": [],
    }
    advice = _structured_to_text(structured, your_applied=0, avg_applied=5.0)

    # Vẫn phải có 5 sections
    lines = [ln for ln in advice.split("\n") if ln and ln[0].isdigit() and ln[1] == "."]
    assert len(lines) == 5

    # Mỗi section rỗng phải có fallback text (không phải "(không có dữ liệu)" cũ)
    assert "Không phát hiện" in advice or "Không có dữ liệu" in advice
    assert "Chưa có khuyến nghị" in advice


# ============================================================
# Logging: khi LLM throw, full traceback phải được log
# ============================================================

import logging  # noqa: E402  (đặt cạnh các import app-level để dễ thấy)

from app.analyzers import market as market_module  # noqa: E402
from app.schemas.analysis import JobRequest  # noqa: E402


def _sample_job() -> JobRequest:
    return JobRequest(
        title="Backend Java Developer",
        description="Spring Boot + MySQL",
        requirement="Java, Spring Boot",
        benefit="",
        category="Information Technology",
        employment_type="Full-time",
        experience_level="Mid-Level",
        work_approach="On-site",
        ward="",
        province="Bình Định",
        min_salary=8000000,
        max_salary=18000000,
        applied=8,
        view=150,
    )


_SAMPLE_META = {
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
    "benefit": "Performance bonus, Stock options",
    "requirement": "Java, Spring Boot",
    "description": "Senior backend role...",
}


def test_structured_sections_logs_full_traceback_on_llm_failure(caplog, monkeypatch):
    """Khi LLM throw (vd: NVIDIA_API_KEY chưa set), logger.exception phải được gọi
    với full traceback để user thấy nguyên nhân thật thay vì fallback mù."""
    # Monkeypatch generate_advice để raise giả lập lỗi thật (vd: thiếu API key)
    def fake_generate(*args, **kwargs):
        raise RuntimeError("NVIDIA_API_KEY chưa được set")

    monkeypatch.setattr(market_module, "generate_advice", fake_generate)

    with caplog.at_level(logging.ERROR, logger="app.analyzers.market"):
        result = market_module._generate_structured_sections(_sample_job(), _SAMPLE_META)

    # Fallback vẫn phải return (không break behavior hiện tại)
    assert result["gap_analysis"] == []
    assert result["benefit_analysis"] == []
    assert result["skills_analysis"] == []
    assert result["recommendations"][0].startswith("Không thể tạo phân tích")

    # Verify traceback đã được log
    error_records = [r for r in caplog.records if r.levelno >= logging.ERROR]
    assert len(error_records) >= 1, (
        "Phải có ít nhất 1 log record ở level ERROR khi LLM throw"
    )

    # Message phải chứa job title để dễ trace
    assert any("Backend Java Developer" in r.getMessage() for r in error_records), (
        f"Log message phải chứa job title để trace. Got: {[r.getMessage() for r in error_records]}"
    )

    # exc_info phải được attach — đây là điểm khác biệt giữa logger.error và logger.exception
    assert any(r.exc_info is not None for r in error_records), (
        "logger.exception phải attach exc_info để in full traceback. "
        "Nếu dùng logger.error thay thế, traceback sẽ bị mất — đó là bug."
    )


def test_structured_sections_does_not_log_on_success(caplog, monkeypatch):
    """Khi LLM thành công, KHÔNG được log error (tránh noise trong logs)."""
    fake_response = json.dumps({
        "gap_analysis": ["gap 1"],
        "benefit_analysis": ["benefit 1"],
        "skills_analysis": ["skills 1"],
        "recommendations": ["rec 1", "rec 2"],
    })

    monkeypatch.setattr(market_module, "generate_advice", lambda *a, **kw: fake_response)

    with caplog.at_level(logging.ERROR, logger="app.analyzers.market"):
        result = market_module._generate_structured_sections(_sample_job(), _SAMPLE_META)

    assert result["gap_analysis"] == ["gap 1"]
    error_records = [r for r in caplog.records if r.levelno >= logging.ERROR]
    assert len(error_records) == 0, (
        f"Không được log error khi LLM thành công. Got: {[r.getMessage() for r in error_records]}"
    )

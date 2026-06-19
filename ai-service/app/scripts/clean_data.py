from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent  # app/
RAW_DATA = BASE_DIR / "data" / "raw" / "job_postings.csv"
OUT_DATA = BASE_DIR / "data" / "processed" / "job_postings.csv"

df = pd.read_csv(RAW_DATA)

# Can load truong chinh
df = df[[
    'title',
    'description',
    'skills_desc',
    'company_name',
    'location',
    'min_salary',
    'max_salary',
    'formatted_work_type',
    'remote_allowed',
    'formatted_experience_level',
    'applies'
]].copy()

df = df.dropna(subset=['title', 'description', 'applies'])

df = df.head(500)


df['applies'] = pd.to_numeric(df['applies'], errors='coerce').fillna(0).astype(int)

OUT_DATA.parent.mkdir(parents=True, exist_ok=True)
df.to_csv(OUT_DATA, index=False)

print(f"Đã làm sạch {len(df)} job")
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent  # app/
RAW_DATA = BASE_DIR / "data" / "raw" / "job_postings.csv"
OUT_DATA = BASE_DIR / "data" / "processed" / "jobs_clean.csv"

df = pd.read_csv(RAW_DATA)
df = df[[
    'title',
    'description',
    'requirement',
    'responsibilities',
    'benefit',
    'company',
    'category',
    'employment_type',
    'experience_level',
    'work_approach',
    'ward',
    'province',
    'min_salary',
    'max_salary',
    'applied',
    'view'
]].copy()

df = df.dropna(subset=['title', 'description', 'applied'])
df = df.head(500)
if "applied" in df.columns:
    df["applied"] = (
        pd.to_numeric(df["applied"], errors="coerce")
        .fillna(0)
        .astype(int)
    )

if "view" in df.columns:
    df["view"] = (
        pd.to_numeric(df["view"], errors="coerce")
        .fillna(0)
        .astype(int)
    )

OUT_DATA.parent.mkdir(parents=True, exist_ok=True)
df.to_csv(OUT_DATA, index=False)

print(f"Đa lam sach {len(df)} job")
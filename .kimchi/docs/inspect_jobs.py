"""One-off inspection script for job_postings.csv schema.
Reads with stdlib csv, prints columns + sample rows, then finds the
3 lowest-view jobs that have all critical fields filled.
"""
import csv
import sys
from collections import Counter
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parents[2] / "ai-service" / "app" / "data" / "raw" / "job_postings.csv"

with CSV_PATH.open("r", encoding="utf-8", errors="replace", newline="") as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    columns = reader.fieldnames or []

print(f"Total rows: {len(rows)}")
print(f"Total columns: {len(columns)}")
print()
print("Columns:")
for i, c in enumerate(columns, 1):
    print(f"  {i:3d}. {c!r}")
print()

# Find lowest-view jobs (rows that have a view count and at least title + description)
def parse_int(v):
    if not v:
        return None
    try:
        return int(float(v))
    except (ValueError, TypeError):
        return None

view_key = None
for cand in ["view", "views", "View", "Views"]:
    if cand in columns:
        view_key = cand
        break
print(f"View column detected: {view_key!r}")
print()

# Coerce view counts and filter to rows with title + description
candidates = []
for r in rows:
    if not (r.get("title") and r.get("description")):
        continue
    v = parse_int(r.get(view_key)) if view_key else None
    if v is None:
        continue
    candidates.append((v, r))

candidates.sort(key=lambda x: x[0])
print(f"Rows with title+description+view: {len(candidates)}")
print()
print("=== 3 lowest-view jobs ===")
for v, r in candidates[:3]:
    print(f"\n--- view = {v} ---")
    for k in ["title", "company", "company_name", "location", "province",
             "view", "applied", "applies", "min_salary", "max_salary",
             "experience_level", "formatted_experience_level",
             "work_approach", "work_type", "formatted_work_type",
             "employment_type", "category", "remote_allowed"]:
        if k in r:
            val = r[k][:80] if r[k] else "<empty>"
            print(f"  {k:32s}: {val!r}")

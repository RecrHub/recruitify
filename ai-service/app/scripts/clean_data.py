import pandas as pd

df = pd.read_csv("app/data/raw/job_postings.csv")

# Can load truong chinh
df = df[[
    'title',
    'description',
    'requirements',
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
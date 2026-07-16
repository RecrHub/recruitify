-- =====================================================================
-- Consolidate salary columns + add `applied` column on public.job
-- =====================================================================
-- Bối cảnh: do spring.jpa.hibernate.ddl-auto=update, mỗi lần entity đổi
-- tên field lương, Hibernate THÊM cột mới nhưng KHÔNG bao giờ xoá cột cũ,
-- nên bảng job đang có 4 cột lương trùng lặp:
--   "minSalary" (bigint)  <- có dữ liệu thật
--   maxsalary   (bigint)  <- có dữ liệu thật
--   min_salary  (integer) <- rỗng
--   max_salary  (integer) <- rỗng
--
-- Script này gộp về đúng 1 cặp canonical `min_salary`/`max_salary` (bigint)
-- để khớp với schema mà AI service dùng, và thêm cột `applied` (lượt ứng tuyển).
--
-- Chạy 1 lần trực tiếp trên Postgres của recruitify:
--   psql -h localhost -p 5433 -U recruitify -d recruitify \
--        -f backend/web-api/src/main/resources/db/migration/V2__consolidate_salary_add_applied.sql
-- =====================================================================

BEGIN;

-- 1) Thêm cột applied (số lượt ứng tuyển), mặc định 0
ALTER TABLE public.job
    ADD COLUMN IF NOT EXISTS applied bigint NOT NULL DEFAULT 0;

-- 2) Chuẩn hoá kiểu cột lương canonical về bigint (đang là integer)
ALTER TABLE public.job
    ALTER COLUMN min_salary TYPE bigint USING min_salary::bigint;
ALTER TABLE public.job
    ALTER COLUMN max_salary TYPE bigint USING max_salary::bigint;

-- 3) Đổ dữ liệu lương cũ (đang nằm ở "minSalary"/maxsalary) sang cột canonical,
--    chỉ ghi khi cột canonical còn trống để không đè dữ liệu đã có.
UPDATE public.job
    SET min_salary = "minSalary"
    WHERE min_salary IS NULL AND "minSalary" IS NOT NULL;

UPDATE public.job
    SET max_salary = maxsalary
    WHERE max_salary IS NULL AND maxsalary IS NOT NULL;

-- 4) Xoá các cột lương trùng lặp không còn dùng
ALTER TABLE public.job DROP COLUMN IF EXISTS "minSalary";
ALTER TABLE public.job DROP COLUMN IF EXISTS maxsalary;

-- 5) Xoá cột salary lẻ (BigDecimal cũ) nếu Hibernate đã lỡ tạo ra
ALTER TABLE public.job DROP COLUMN IF EXISTS salary;

COMMIT;

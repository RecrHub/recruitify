--
-- PostgreSQL database dump
--

\restrict ocDo0UXpuCmD7CqoKn8hVZYbZ8HCYL3gkWgDiVPfEjR5jnKPJWofxccN4Y3Degi

-- Dumped from database version 17.9
-- Dumped by pg_dump version 17.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.account (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    created_by character varying(100),
    email character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    locked_until timestamp(6) with time zone,
    password_hash character varying(255) NOT NULL,
    updated_at timestamp without time zone,
    updated_by character varying(100),
    username character varying(255) NOT NULL,
    role_id bigint
);


ALTER TABLE public.account OWNER TO recruitify;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_id_seq OWNER TO recruitify;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: administrative_units; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.administrative_units (
    id integer NOT NULL,
    code_name character varying(255),
    code_name_en character varying(255),
    full_name character varying(255),
    full_name_en character varying(255),
    short_name character varying(255),
    short_name_en character varying(255)
);


ALTER TABLE public.administrative_units OWNER TO recruitify;

--
-- Name: category; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.category (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    created_by character varying(255),
    deleted_at timestamp(6) without time zone,
    deleted_by character varying(255),
    name character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(255)
);


ALTER TABLE public.category OWNER TO recruitify;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO recruitify;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.company (
    id bigint NOT NULL,
    company_size character varying(255),
    company_type character varying(255),
    created_at timestamp(6) without time zone NOT NULL,
    created_by character varying(255),
    delete_at timestamp(6) without time zone,
    delete_by character varying(255),
    founder_year integer,
    image_url character varying(255),
    industry character varying(255),
    name character varying(255),
    overview text,
    phone character varying(255),
    updated_at timestamp(6) without time zone,
    updated_by character varying(255),
    is_featured boolean DEFAULT false,
    image character varying(255)
);


ALTER TABLE public.company OWNER TO recruitify;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_id_seq OWNER TO recruitify;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: education; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.education (
    id bigint NOT NULL,
    degree character varying(255),
    end_date date,
    field_of_study character varying(255),
    school_name character varying(255) NOT NULL,
    start_date date NOT NULL,
    user_profile_id bigint NOT NULL
);


ALTER TABLE public.education OWNER TO recruitify;

--
-- Name: education_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.education_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.education_id_seq OWNER TO recruitify;

--
-- Name: education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.education_id_seq OWNED BY public.education.id;


--
-- Name: employment_type; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.employment_type (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    created_by character varying(255),
    deleted_at timestamp(6) without time zone,
    deleted_by character varying(255),
    name character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(255)
);


ALTER TABLE public.employment_type OWNER TO recruitify;

--
-- Name: employment_type_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.employment_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employment_type_id_seq OWNER TO recruitify;

--
-- Name: employment_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.employment_type_id_seq OWNED BY public.employment_type.id;


--
-- Name: experience_level; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.experience_level (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    created_by character varying(255),
    deleted_at timestamp(6) without time zone,
    deleted_by character varying(255),
    name character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(255)
);


ALTER TABLE public.experience_level OWNER TO recruitify;

--
-- Name: experience_level_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.experience_level_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.experience_level_id_seq OWNER TO recruitify;

--
-- Name: experience_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.experience_level_id_seq OWNED BY public.experience_level.id;


--
-- Name: job; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.job (
    id bigint NOT NULL,
    benefit text,
    created_at timestamp(6) without time zone NOT NULL,
    created_by character varying(255),
    delete_at timestamp(6) without time zone,
    delete_by character varying(255),
    description text,
    is_hidden boolean,
    requirement text,
    responsibilities text,
    "minSalary" bigint,
    title character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(255),
    category_id bigint,
    company_id bigint,
    employment_type_id bigint,
    experience_level_id bigint,
    ward_code character varying(255),
    work_approach_id bigint,
    is_featured boolean DEFAULT false,
    maxsalary bigint,
    max_salary integer,
    min_salary integer
);


ALTER TABLE public.job OWNER TO recruitify;

--
-- Name: job_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.job_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_id_seq OWNER TO recruitify;

--
-- Name: job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.job_id_seq OWNED BY public.job.id;


--
-- Name: job_skill; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.job_skill (
    job_id bigint NOT NULL,
    skill_id bigint NOT NULL
);


ALTER TABLE public.job_skill OWNER TO recruitify;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.profiles (
    account_id bigint NOT NULL,
    about text,
    address character varying(255),
    avatar_url character varying(255),
    dob date,
    full_name character varying(255),
    gender boolean,
    personal_link character varying(255),
    phone_number integer,
    province_code character varying(255),
    title character varying(255)
);


ALTER TABLE public.profiles OWNER TO recruitify;

--
-- Name: provinces; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.provinces (
    code character varying(255) NOT NULL,
    code_name character varying(255),
    full_name character varying(255) NOT NULL,
    full_name_en character varying(255),
    name character varying(255),
    name_en character varying(255),
    name_with_type character varying(255),
    slug character varying(255),
    type character varying(255),
    administrative_unit_id integer
);


ALTER TABLE public.provinces OWNER TO recruitify;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.refresh_tokens (
    id bigint NOT NULL,
    created_at timestamp(6) with time zone,
    expiry_date timestamp(6) with time zone NOT NULL,
    is_revoked boolean NOT NULL,
    is_used boolean NOT NULL,
    reason_revoked character varying(255),
    replaced_by_token character varying(255),
    token character varying(255) NOT NULL,
    updated_at timestamp(6) with time zone,
    user_id bigint
);


ALTER TABLE public.refresh_tokens OWNER TO recruitify;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO recruitify;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    created_by character varying(100),
    name character varying(50) NOT NULL,
    updated_at timestamp without time zone,
    updated_by character varying(100)
);


ALTER TABLE public.roles OWNER TO recruitify;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO recruitify;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: skills; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.skills (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    created_by character varying(255),
    deleted_at timestamp(6) without time zone,
    deleted_by character varying(255),
    name character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(255)
);


ALTER TABLE public.skills OWNER TO recruitify;

--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_id_seq OWNER TO recruitify;

--
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- Name: wards; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.wards (
    code character varying(255) NOT NULL,
    code_name character varying(255),
    full_name character varying(255),
    full_name_en character varying(255),
    name character varying(255),
    name_en character varying(255),
    administrative_unit_id integer,
    province_code character varying(255)
);


ALTER TABLE public.wards OWNER TO recruitify;

--
-- Name: work_approach; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.work_approach (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    created_by character varying(255),
    deleted_at timestamp(6) without time zone,
    deleted_by character varying(255),
    name character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone,
    updated_by character varying(255)
);


ALTER TABLE public.work_approach OWNER TO recruitify;

--
-- Name: work_approach_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.work_approach_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.work_approach_id_seq OWNER TO recruitify;

--
-- Name: work_approach_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.work_approach_id_seq OWNED BY public.work_approach.id;


--
-- Name: work_experiences; Type: TABLE; Schema: public; Owner: recruitify
--

CREATE TABLE public.work_experiences (
    id bigint NOT NULL,
    company_name character varying(255) NOT NULL,
    description text,
    end_date date,
    job_title character varying(255) NOT NULL,
    location character varying(255),
    start_date date NOT NULL,
    user_profile_id bigint NOT NULL
);


ALTER TABLE public.work_experiences OWNER TO recruitify;

--
-- Name: work_experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: recruitify
--

CREATE SEQUENCE public.work_experiences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.work_experiences_id_seq OWNER TO recruitify;

--
-- Name: work_experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: recruitify
--

ALTER SEQUENCE public.work_experiences_id_seq OWNED BY public.work_experiences.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- Name: education id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.education ALTER COLUMN id SET DEFAULT nextval('public.education_id_seq'::regclass);


--
-- Name: employment_type id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.employment_type ALTER COLUMN id SET DEFAULT nextval('public.employment_type_id_seq'::regclass);


--
-- Name: experience_level id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.experience_level ALTER COLUMN id SET DEFAULT nextval('public.experience_level_id_seq'::regclass);


--
-- Name: job id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.job_id_seq'::regclass);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- Name: work_approach id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.work_approach ALTER COLUMN id SET DEFAULT nextval('public.work_approach_id_seq'::regclass);


--
-- Name: work_experiences id; Type: DEFAULT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.work_experiences ALTER COLUMN id SET DEFAULT nextval('public.work_experiences_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.account (id, created_at, created_by, email, is_active, locked_until, password_hash, updated_at, updated_by, username, role_id) FROM stdin;
1	2026-03-02 01:41:14.6854	\N	super_user@gmail.com	t	\N	$2a$10$igal71n11v9F0xXhYZGXS.6VBIq8BTklDKlqOXpDwyE6mg02YR.t2	2026-03-02 01:41:14.685401	\N	testUser	2
\.


--
-- Data for Name: administrative_units; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.administrative_units (id, code_name, code_name_en, full_name, full_name_en, short_name, short_name_en) FROM stdin;
1	thanh_pho_truc_thuoc_trung_uong	municipality	Thành phố trực thuộc trung ương	Municipality	Thành phố	City
2	tinh	province	Tỉnh	Province	Tỉnh	Province
3	phuong	ward	Phường	Ward	Phường	Ward
4	xa	commune	Xã	Commune	Xã	Commune
5	dac_khu	special_administrative_region	Đặc khu tại hải đảo	Special administrative region	Đặc khu	Special administrative region
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.category (id, created_at, created_by, deleted_at, deleted_by, name, updated_at, updated_by) FROM stdin;
1	2026-03-02 10:26:59.722071	system	\N	\N	Information Technology	2026-03-02 10:26:59.722071	system
2	2026-03-02 10:26:59.722071	system	\N	\N	Marketing	2026-03-02 10:26:59.722071	system
3	2026-03-02 10:26:59.722071	system	\N	\N	Human Resources	2026-03-02 10:26:59.722071	system
4	2026-03-02 10:26:59.722071	system	\N	\N	Finance & Accounting	2026-03-02 10:26:59.722071	system
5	2026-03-02 10:26:59.722071	system	\N	\N	Sales	2026-03-02 10:26:59.722071	system
6	2026-03-02 10:26:59.722071	system	\N	\N	Customer Service	2026-03-02 10:26:59.722071	system
7	2026-03-02 10:26:59.722071	system	\N	\N	Design	2026-03-02 10:26:59.722071	system
8	2026-03-02 10:26:59.722071	system	\N	\N	Business Development	2026-03-02 10:26:59.722071	system
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.company (id, company_size, company_type, created_at, created_by, delete_at, delete_by, founder_year, image_url, industry, name, overview, phone, updated_at, updated_by, is_featured, image) FROM stdin;
1	1-10	Startup	2026-03-03 19:13:35.404038	admin	\N	\N	2022	https://example.com/img/startup1.png	Information Technology	NextGen Software	A startup specializing in web and AI solutions.	0905000001	2026-03-03 19:13:35.404038	admin	t	\N
2	10-50	Outsourcing	2026-03-03 19:13:35.404038	admin	\N	\N	2020	https://example.com/img/outsourcing1.png	Software Development	CodeBridge Solutions	Provides outsourcing services for global clients.	0905000002	2026-03-03 19:13:35.404038	admin	t	\N
3	50-100	Product	2026-03-03 19:13:35.404038	admin	\N	\N	2018	https://example.com/img/product1.png	Fintech	FinCore Tech	Builds digital banking and fintech platforms.	0905000003	2026-03-03 19:13:35.404038	admin	t	\N
4	100-200	Enterprise	2026-03-03 19:13:35.404038	admin	\N	\N	2015	https://example.com/img/enterprise1.png	E-commerce	ShopSphere	Large-scale e-commerce ecosystem provider.	0905000004	2026-03-03 19:13:35.404038	admin	t	\N
5	200-500	Enterprise	2026-03-03 19:13:35.404038	admin	\N	\N	2010	https://example.com/img/enterprise2.png	Healthcare Technology	MediTech Global	Develops healthcare management systems.	0905000005	2026-03-03 19:13:35.404038	admin	t	\N
6	10-50	Product	2026-03-03 19:13:35.404038	admin	\N	\N	2019	https://example.com/img/product2.png	Education Technology	EduSmart	Online learning and LMS platform provider.	0905000006	2026-03-03 19:13:35.404038	admin	t	\N
7	50-100	Outsourcing	2026-03-03 19:13:35.404038	admin	\N	\N	2017	https://example.com/img/outsourcing2.png	Blockchain	ChainWorks	Blockchain and Web3 development company.	0905000007	2026-03-03 19:13:35.404038	admin	t	\N
8	500+	Corporation	2026-03-03 19:13:35.404038	admin	\N	\N	2005	https://example.com/img/corp1.png	Telecommunications	VietConnect Telecom	Provides nationwide telecom infrastructure and services.	0905000008	2026-03-03 19:13:35.404038	admin	t	\N
\.


--
-- Data for Name: education; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.education (id, degree, end_date, field_of_study, school_name, start_date, user_profile_id) FROM stdin;
\.


--
-- Data for Name: employment_type; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.employment_type (id, created_at, created_by, deleted_at, deleted_by, name, updated_at, updated_by) FROM stdin;
1	2026-03-03 19:15:36.698045	admin	\N	\N	Full-time	2026-03-03 19:15:36.698045	admin
2	2026-03-03 19:15:36.698045	admin	\N	\N	Part-time	2026-03-03 19:15:36.698045	admin
3	2026-03-03 19:15:36.698045	admin	\N	\N	Internship	2026-03-03 19:15:36.698045	admin
4	2026-03-03 19:15:36.698045	admin	\N	\N	Contract	2026-03-03 19:15:36.698045	admin
5	2026-03-03 19:15:36.698045	admin	\N	\N	Freelance	2026-03-03 19:15:36.698045	admin
6	2026-03-03 19:15:36.698045	admin	\N	\N	Temporary	2026-03-03 19:15:36.698045	admin
7	2026-03-03 19:15:36.698045	admin	\N	\N	Remote	2026-03-03 19:15:36.698045	admin
8	2026-03-03 19:15:36.698045	admin	\N	\N	Hybrid	2026-03-03 19:15:36.698045	admin
\.


--
-- Data for Name: experience_level; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.experience_level (id, created_at, created_by, deleted_at, deleted_by, name, updated_at, updated_by) FROM stdin;
1	2026-03-03 19:16:05.463799	admin	\N	\N	Fresher	2026-03-03 19:16:05.463799	admin
2	2026-03-03 19:16:05.463799	admin	\N	\N	Junior	2026-03-03 19:16:05.463799	admin
3	2026-03-03 19:16:05.463799	admin	\N	\N	Middle	2026-03-03 19:16:05.463799	admin
4	2026-03-03 19:16:05.463799	admin	\N	\N	Senior	2026-03-03 19:16:05.463799	admin
5	2026-03-03 19:16:05.463799	admin	\N	\N	Lead	2026-03-03 19:16:05.463799	admin
6	2026-03-03 19:16:05.463799	admin	\N	\N	Principal	2026-03-03 19:16:05.463799	admin
7	2026-03-03 19:16:05.463799	admin	\N	\N	Manager	2026-03-03 19:16:05.463799	admin
8	2026-03-03 19:16:05.463799	admin	\N	\N	Director	2026-03-03 19:16:05.463799	admin
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.job (id, benefit, created_at, created_by, delete_at, delete_by, description, is_hidden, requirement, responsibilities, "minSalary", title, updated_at, updated_by, category_id, company_id, employment_type_id, experience_level_id, ward_code, work_approach_id, is_featured, maxsalary, max_salary, min_salary) FROM stdin;
101	13th month salary, Health insurance	2026-03-03 19:37:31.960606	admin	\N	\N	Develop backend services using Spring Boot.	f	1+ year Java experience.	Build APIs and optimize database queries.	1200	Backend Developer	2026-03-03 19:37:31.960606	admin	1	1	1	2	00004	1	t	5000	\N	\N
102	Remote support, Performance bonus	2026-03-03 19:37:31.960606	admin	\N	\N	Build UI with React.	f	Good React knowledge.	Develop reusable components.	1100	Frontend Developer	2026-03-03 19:37:31.960606	admin	1	1	1	2	00166	2	t	5000	\N	\N
103	Flexible hours	2026-03-03 19:37:31.960606	admin	\N	\N	Work on fullstack systems.	f	NodeJS and React.	Implement new features.	1500	Fullstack Developer	2026-03-03 19:37:31.960606	admin	1	1	1	3	00376	2	t	5000	\N	\N
104	Stock option	2026-03-03 19:37:31.960606	admin	\N	\N	Manage CI/CD pipeline.	f	Docker experience.	Maintain deployment system.	2000	DevOps Engineer	2026-03-03 19:37:31.960606	admin	2	1	1	4	09556	1	t	5000	\N	\N
\.


--
-- Data for Name: job_skill; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.job_skill (job_id, skill_id) FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.profiles (account_id, about, address, avatar_url, dob, full_name, gender, personal_link, phone_number, province_code, title) FROM stdin;
1	Passionate frontend developer with strong React and Next.js skills.	123 Nguyen Van Linh, Hai Chau District	https://example.com/avatar1.jpg	2001-05-12	Nguyen Minh Test	t	https://github.com/minhanh	905111111	48	Frontend Developer
\.


--
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.provinces (code, code_name, full_name, full_name_en, name, name_en, name_with_type, slug, type, administrative_unit_id) FROM stdin;
01	ha_noi	Thành phố Hà Nội	Ha Noi City	Hà Nội	Ha Noi	\N	\N	\N	1
04	cao_bang	Tỉnh Cao Bằng	Cao Bang Province	Cao Bằng	Cao Bang	\N	\N	\N	2
08	tuyen_quang	Tỉnh Tuyên Quang	Tuyen Quang Province	Tuyên Quang	Tuyen Quang	\N	\N	\N	2
11	dien_bien	Tỉnh Điện Biên	Dien Bien Province	Điện Biên	Dien Bien	\N	\N	\N	2
12	lai_chau	Tỉnh Lai Châu	Lai Chau Province	Lai Châu	Lai Chau	\N	\N	\N	2
14	son_la	Tỉnh Sơn La	Son La Province	Sơn La	Son La	\N	\N	\N	2
15	lao_cai	Tỉnh Lào Cai	Lao Cai Province	Lào Cai	Lao Cai	\N	\N	\N	2
19	thai_nguyen	Tỉnh Thái Nguyên	Thai Nguyen Province	Thái Nguyên	Thai Nguyen	\N	\N	\N	2
20	lang_son	Tỉnh Lạng Sơn	Lang Son Province	Lạng Sơn	Lang Son	\N	\N	\N	2
22	quang_ninh	Tỉnh Quảng Ninh	Quang Ninh Province	Quảng Ninh	Quang Ninh	\N	\N	\N	2
24	bac_ninh	Tỉnh Bắc Ninh	Bac Ninh Province	Bắc Ninh	Bac Ninh	\N	\N	\N	2
25	phu_tho	Tỉnh Phú Thọ	Phu Tho Province	Phú Thọ	Phu Tho	\N	\N	\N	2
31	hai_phong	Thành phố Hải Phòng	Hai Phong City	Hải Phòng	Hai Phong	\N	\N	\N	1
33	hung_yen	Tỉnh Hưng Yên	Hung Yen Province	Hưng Yên	Hung Yen	\N	\N	\N	2
37	ninh_binh	Tỉnh Ninh Bình	Ninh Binh Province	Ninh Bình	Ninh Binh	\N	\N	\N	2
38	thanh_hoa	Tỉnh Thanh Hóa	Thanh Hoa Province	Thanh Hóa	Thanh Hoa	\N	\N	\N	2
40	nghe_an	Tỉnh Nghệ An	Nghe An Province	Nghệ An	Nghe An	\N	\N	\N	2
42	ha_tinh	Tỉnh Hà Tĩnh	Ha Tinh Province	Hà Tĩnh	Ha Tinh	\N	\N	\N	2
44	quang_tri	Tỉnh Quảng Trị	Quang Tri Province	Quảng Trị	Quang Tri	\N	\N	\N	2
46	hue	Thành phố Huế	Hue City	Huế	Hue	\N	\N	\N	1
48	da_nang	Thành phố Đà Nẵng	Da Nang City	Đà Nẵng	Da Nang	\N	\N	\N	1
51	quang_ngai	Tỉnh Quảng Ngãi	Quang Ngai Province	Quảng Ngãi	Quang Ngai	\N	\N	\N	2
52	gia_lai	Tỉnh Gia Lai	Gia Lai Province	Gia Lai	Gia Lai	\N	\N	\N	2
56	khanh_hoa	Tỉnh Khánh Hòa	Khanh Hoa Province	Khánh Hòa	Khanh Hoa	\N	\N	\N	2
66	dak_lak	Tỉnh Đắk Lắk	Dak Lak Province	Đắk Lắk	Dak Lak	\N	\N	\N	2
68	lam_dong	Tỉnh Lâm Đồng	Lam Dong Province	Lâm Đồng	Lam Dong	\N	\N	\N	2
75	dong_nai	Tỉnh Đồng Nai	Dong Nai Province	Đồng Nai	Dong Nai	\N	\N	\N	2
79	ho_chi_minh	Thành phố Hồ Chí Minh	Ho Chi Minh City	Hồ Chí Minh	Ho Chi Minh	\N	\N	\N	1
80	tay_ninh	Tỉnh Tây Ninh	Tay Ninh Province	Tây Ninh	Tay Ninh	\N	\N	\N	2
82	dong_thap	Tỉnh Đồng Tháp	Dong Thap Province	Đồng Tháp	Dong Thap	\N	\N	\N	2
86	vinh_long	Tỉnh Vĩnh Long	Vinh Long Province	Vĩnh Long	Vinh Long	\N	\N	\N	2
91	an_giang	Tỉnh An Giang	An Giang Province	An Giang	An Giang	\N	\N	\N	2
92	can_tho	Thành phố Cần Thơ	Can Tho City	Cần Thơ	Can Tho	\N	\N	\N	1
96	ca_mau	Tỉnh Cà Mau	Ca Mau Province	Cà Mau	Ca Mau	\N	\N	\N	2
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.refresh_tokens (id, created_at, expiry_date, is_revoked, is_used, reason_revoked, replaced_by_token, token, updated_at, user_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.roles (id, created_at, created_by, name, updated_at, updated_by) FROM stdin;
2	2026-03-02 08:41:08.66522	\N	ROLE_JOBSEEKER	\N	\N
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.skills (id, created_at, created_by, deleted_at, deleted_by, name, updated_at, updated_by) FROM stdin;
1	2026-03-03 19:20:02.46004	admin	\N	\N	Java	2026-03-03 19:20:02.46004	admin
2	2026-03-03 19:20:02.46004	admin	\N	\N	Spring Boot	2026-03-03 19:20:02.46004	admin
3	2026-03-03 19:20:02.46004	admin	\N	\N	ReactJS	2026-03-03 19:20:02.46004	admin
4	2026-03-03 19:20:02.46004	admin	\N	\N	NextJS	2026-03-03 19:20:02.46004	admin
5	2026-03-03 19:20:02.46004	admin	\N	\N	PostgreSQL	2026-03-03 19:20:02.46004	admin
6	2026-03-03 19:20:02.46004	admin	\N	\N	Docker	2026-03-03 19:20:02.46004	admin
7	2026-03-03 19:20:02.46004	admin	\N	\N	Kubernetes	2026-03-03 19:20:02.46004	admin
8	2026-03-03 19:20:02.46004	admin	\N	\N	CI/CD	2026-03-03 19:20:02.46004	admin
\.


--
-- Data for Name: wards; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.wards (code, code_name, full_name, full_name_en, name, name_en, administrative_unit_id, province_code) FROM stdin;
00004	ba_dinh	Phường Ba Đình	Ba Dinh Ward	Ba Đình	Ba Dinh	3	01
00008	ngoc_ha	Phường Ngọc Hà	Ngoc Ha Ward	Ngọc Hà	Ngoc Ha	3	01
00025	giang_vo	Phường Giảng Võ	Giang Vo Ward	Giảng Võ	Giang Vo	3	01
00070	hoan_kiem	Phường Hoàn Kiếm	Hoan Kiem Ward	Hoàn Kiếm	Hoan Kiem	3	01
00082	cua_nam	Phường Cửa Nam	Cua Nam Ward	Cửa Nam	Cua Nam	3	01
00091	phu_thuong	Phường Phú Thượng	Phu Thuong Ward	Phú Thượng	Phu Thuong	3	01
00097	hong_ha	Phường Hồng Hà	Hong Ha Ward	Hồng Hà	Hong Ha	3	01
00103	tay_ho	Phường Tây Hồ	Tay Ho Ward	Tây Hồ	Tay Ho	3	01
00118	bo_de	Phường Bồ Đề	Bo De Ward	Bồ Đề	Bo De	3	01
00127	viet_hung	Phường Việt Hưng	Viet Hung Ward	Việt Hưng	Viet Hung	3	01
00136	phuc_loi	Phường Phúc Lợi	Phuc Loi Ward	Phúc Lợi	Phuc Loi	3	01
00145	long_bien	Phường Long Biên	Long Bien Ward	Long Biên	Long Bien	3	01
00160	nghia_do	Phường Nghĩa Đô	Nghia Do Ward	Nghĩa Đô	Nghia Do	3	01
00166	cau_giay	Phường Cầu Giấy	Cau Giay Ward	Cầu Giấy	Cau Giay	3	01
00175	yen_hoa	Phường Yên Hòa	Yen Hoa Ward	Yên Hòa	Yen Hoa	3	01
00190	o_cho_dua	Phường Ô Chợ Dừa	O Cho Dua Ward	Ô Chợ Dừa	O Cho Dua	3	01
00199	lang	Phường Láng	Lang Ward	Láng	Lang	3	01
00226	van_mieu_quoc_tu_giam	Phường Văn Miếu - Quốc Tử Giám	Van Mieu - Quoc Tu Giam Ward	Văn Miếu - Quốc Tử Giám	Van Mieu - Quoc Tu Giam	3	01
00229	kim_lien	Phường Kim Liên	Kim Lien Ward	Kim Liên	Kim Lien	3	01
00235	dong_da	Phường Đống Đa	Dong Da Ward	Đống Đa	Dong Da	3	01
00256	hai_ba_trung	Phường Hai Bà Trưng	Hai Ba Trung Ward	Hai Bà Trưng	Hai Ba Trung	3	01
00283	vinh_tuy	Phường Vĩnh Tuy	Vinh Tuy Ward	Vĩnh Tuy	Vinh Tuy	3	01
00292	bach_mai	Phường Bạch Mai	Bach Mai Ward	Bạch Mai	Bach Mai	3	01
00301	vinh_hung	Phường Vĩnh Hưng	Vinh Hung Ward	Vĩnh Hưng	Vinh Hung	3	01
00316	dinh_cong	Phường Định Công	Dinh Cong Ward	Định Công	Dinh Cong	3	01
00322	tuong_mai	Phường Tương Mai	Tuong Mai Ward	Tương Mai	Tuong Mai	3	01
00328	linh_nam	Phường Lĩnh Nam	Linh Nam Ward	Lĩnh Nam	Linh Nam	3	01
00331	hoang_mai	Phường Hoàng Mai	Hoang Mai Ward	Hoàng Mai	Hoang Mai	3	01
00337	hoang_liet	Phường Hoàng Liệt	Hoang Liet Ward	Hoàng Liệt	Hoang Liet	3	01
00340	yen_so	Phường Yên Sở	Yen So Ward	Yên Sở	Yen So	3	01
00352	phuong_liet	Phường Phương Liệt	Phuong Liet Ward	Phương Liệt	Phuong Liet	3	01
00364	khuong_dinh	Phường Khương Đình	Khuong Dinh Ward	Khương Đình	Khuong Dinh	3	01
00367	thanh_xuan	Phường Thanh Xuân	Thanh Xuan Ward	Thanh Xuân	Thanh Xuan	3	01
00592	tu_liem	Phường Từ Liêm	Tu Liem Ward	Từ Liêm	Tu Liem	3	01
00598	thuong_cat	Phường Thượng Cát	Thuong Cat Ward	Thượng Cát	Thuong Cat	3	01
00602	dong_ngac	Phường Đông Ngạc	Dong Ngac Ward	Đông Ngạc	Dong Ngac	3	01
00611	xuan_dinh	Phường Xuân Đỉnh	Xuan Dinh Ward	Xuân Đỉnh	Xuan Dinh	3	01
00613	tay_tuu	Phường Tây Tựu	Tay Tuu Ward	Tây Tựu	Tay Tuu	3	01
00619	phu_dien	Phường Phú Diễn	Phu Dien Ward	Phú Diễn	Phu Dien	3	01
00622	xuan_phuong	Phường Xuân Phương	Xuan Phuong Ward	Xuân Phương	Xuan Phuong	3	01
00634	tay_mo	Phường Tây Mỗ	Tay Mo Ward	Tây Mỗ	Tay Mo	3	01
00637	dai_mo	Phường Đại Mỗ	Dai Mo Ward	Đại Mỗ	Dai Mo	3	01
00643	thanh_liet	Phường Thanh Liệt	Thanh Liet Ward	Thanh Liệt	Thanh Liet	3	01
09552	kien_hung	Phường Kiến Hưng	Kien Hung Ward	Kiến Hưng	Kien Hung	3	01
09556	ha_dong	Phường Hà Đông	Ha Dong Ward	Hà Đông	Ha Dong	3	01
09562	yen_nghia	Phường Yên Nghĩa	Yen Nghia Ward	Yên Nghĩa	Yen Nghia	3	01
09568	phu_luong	Phường Phú Lương	Phu Luong Ward	Phú Lương	Phu Luong	3	01
09574	son_tay	Phường Sơn Tây	Son Tay Ward	Sơn Tây	Son Tay	3	01
09604	tung_thien	Phường Tùng Thiện	Tung Thien Ward	Tùng Thiện	Tung Thien	3	01
09886	duong_noi	Phường Dương Nội	Duong Noi Ward	Dương Nội	Duong Noi	3	01
10015	chuong_my	Phường Chương Mỹ	Chuong My Ward	Chương Mỹ	Chuong My	3	01
00376	soc_son	Xã Sóc Sơn	Soc Son Commune	Sóc Sơn	Soc Son	4	01
00382	kim_anh	Xã Kim Anh	Kim Anh Commune	Kim Anh	Kim Anh	4	01
00385	trung_gia	Xã Trung Giã	Trung Gia Commune	Trung Giã	Trung Gia	4	01
00430	da_phuc	Xã Đa Phúc	Da Phuc Commune	Đa Phúc	Da Phuc	4	01
00433	noi_bai	Xã Nội Bài	Noi Bai Commune	Nội Bài	Noi Bai	4	01
00454	dong_anh	Xã Đông Anh	Dong Anh Commune	Đông Anh	Dong Anh	4	01
00466	phuc_thinh	Xã Phúc Thịnh	Phuc Thinh Commune	Phúc Thịnh	Phuc Thinh	4	01
00475	thu_lam	Xã Thư Lâm	Thu Lam Commune	Thư Lâm	Thu Lam	4	01
00493	thien_loc	Xã Thiên Lộc	Thien Loc Commune	Thiên Lộc	Thien Loc	4	01
00508	vinh_thanh	Xã Vĩnh Thanh	Vinh Thanh Commune	Vĩnh Thanh	Vinh Thanh	4	01
00541	phu_dong	Xã Phù Đổng	Phu Dong Commune	Phù Đổng	Phu Dong	4	01
00562	thuan_an	Xã Thuận An	Thuan An Commune	Thuận An	Thuan An	4	01
00565	gia_lam	Xã Gia Lâm	Gia Lam Commune	Gia Lâm	Gia Lam	4	01
00577	bat_trang	Xã Bát Tràng	Bat Trang Commune	Bát Tràng	Bat Trang	4	01
00640	thanh_tri	Xã Thanh Trì	Thanh Tri Commune	Thanh Trì	Thanh Tri	4	01
00664	dai_thanh	Xã Đại Thanh	Dai Thanh Commune	Đại Thanh	Dai Thanh	4	01
00679	ngoc_hoi	Xã Ngọc Hồi	Ngoc Hoi Commune	Ngọc Hồi	Ngoc Hoi	4	01
00685	nam_phu	Xã Nam Phù	Nam Phu Commune	Nam Phù	Nam Phu	4	01
04930	yen_xuan	Xã Yên Xuân	Yen Xuan Commune	Yên Xuân	Yen Xuan	4	01
08974	quang_minh	Xã Quang Minh	Quang Minh Commune	Quang Minh	Quang Minh	4	01
08980	yen_lang	Xã Yên Lãng	Yen Lang Commune	Yên Lãng	Yen Lang	4	01
08995	tien_thang	Xã Tiến Thắng	Tien Thang Commune	Tiến Thắng	Tien Thang	4	01
09022	me_linh	Xã Mê Linh	Me Linh Commune	Mê Linh	Me Linh	4	01
09616	doai_phuong	Xã Đoài Phương	Doai Phuong Commune	Đoài Phương	Doai Phuong	4	01
09619	quang_oai	Xã Quảng Oai	Quang Oai Commune	Quảng Oai	Quang Oai	4	01
09634	co_do	Xã Cổ Đô	Co Do Commune	Cổ Đô	Co Do	4	01
09661	minh_chau	Xã Minh Châu	Minh Chau Commune	Minh Châu	Minh Chau	4	01
09664	vat_lai	Xã Vật Lại	Vat Lai Commune	Vật Lại	Vat Lai	4	01
09676	bat_bat	Xã Bất Bạt	Bat Bat Commune	Bất Bạt	Bat Bat	4	01
09694	suoi_hai	Xã Suối Hai	Suoi Hai Commune	Suối Hai	Suoi Hai	4	01
09700	ba_vi	Xã Ba Vì	Ba Vi Commune	Ba Vì	Ba Vi	4	01
09706	yen_bai	Xã Yên Bài	Yen Bai Commune	Yên Bài	Yen Bai	4	01
09715	phuc_tho	Xã Phúc Thọ	Phuc Tho Commune	Phúc Thọ	Phuc Tho	4	01
09739	phuc_loc	Xã Phúc Lộc	Phuc Loc Commune	Phúc Lộc	Phuc Loc	4	01
09772	hat_mon	Xã Hát Môn	Hat Mon Commune	Hát Môn	Hat Mon	4	01
09784	dan_phuong	Xã Đan Phượng	Dan Phuong Commune	Đan Phượng	Dan Phuong	4	01
09787	lien_minh	Xã Liên Minh	Lien Minh Commune	Liên Minh	Lien Minh	4	01
09817	o_dien	Xã Ô Diên	O Dien Commune	Ô Diên	O Dien	4	01
09832	hoai_duc	Xã Hoài Đức	Hoai Duc Commune	Hoài Đức	Hoai Duc	4	01
09856	duong_hoa	Xã Dương Hòa	Duong Hoa Commune	Dương Hòa	Duong Hoa	4	01
09871	son_dong	Xã Sơn Đồng	Son Dong Commune	Sơn Đồng	Son Dong	4	01
09877	an_khanh	Xã An Khánh	An Khanh Commune	An Khánh	An Khanh	4	01
09895	quoc_oai	Xã Quốc Oai	Quoc Oai Commune	Quốc Oai	Quoc Oai	4	01
09910	kieu_phu	Xã Kiều Phú	Kieu Phu Commune	Kiều Phú	Kieu Phu	4	01
09931	hung_dao	Xã Hưng Đạo	Hung Dao Commune	Hưng Đạo	Hung Dao	4	01
09952	phu_cat	Xã Phú Cát	Phu Cat Commune	Phú Cát	Phu Cat	4	01
09955	thach_that	Xã Thạch Thất	Thach That Commune	Thạch Thất	Thach That	4	01
09982	ha_bang	Xã Hạ Bằng	Ha Bang Commune	Hạ Bằng	Ha Bang	4	01
09988	hoa_lac	Xã Hòa Lạc	Hoa Lac Commune	Hòa Lạc	Hoa Lac	4	01
10003	tay_phuong	Xã Tây Phương	Tay Phuong Commune	Tây Phương	Tay Phuong	4	01
10030	phu_nghia	Xã Phú Nghĩa	Phu Nghia Commune	Phú Nghĩa	Phu Nghia	4	01
10045	xuan_mai	Xã Xuân Mai	Xuan Mai Commune	Xuân Mai	Xuan Mai	4	01
10072	quang_bi	Xã Quảng Bị	Quang Bi Commune	Quảng Bị	Quang Bi	4	01
10081	tran_phu	Xã Trần Phú	Tran Phu Commune	Trần Phú	Tran Phu	4	01
10096	hoa_phu	Xã Hòa Phú	Hoa Phu Commune	Hòa Phú	Hoa Phu	4	01
10114	thanh_oai	Xã Thanh Oai	Thanh Oai Commune	Thanh Oai	Thanh Oai	4	01
10126	binh_minh	Xã Bình Minh	Binh Minh Commune	Bình Minh	Binh Minh	4	01
10144	tam_hung	Xã Tam Hưng	Tam Hung Commune	Tam Hưng	Tam Hung	4	01
10180	dan_hoa	Xã Dân Hòa	Dan Hoa Commune	Dân Hòa	Dan Hoa	4	01
10183	thuong_tin	Xã Thường Tín	Thuong Tin Commune	Thường Tín	Thuong Tin	4	01
10210	hong_van	Xã Hồng Vân	Hong Van Commune	Hồng Vân	Hong Van	4	01
10231	thuong_phuc	Xã Thượng Phúc	Thuong Phuc Commune	Thượng Phúc	Thuong Phuc	4	01
10237	chuong_duong	Xã Chương Dương	Chuong Duong Commune	Chương Dương	Chuong Duong	4	01
10273	phu_xuyen	Xã Phú Xuyên	Phu Xuyen Commune	Phú Xuyên	Phu Xuyen	4	01
10279	phuong_duc	Xã Phượng Dực	Phuong Duc Commune	Phượng Dực	Phuong Duc	4	01
10330	chuyen_my	Xã Chuyên Mỹ	Chuyen My Commune	Chuyên Mỹ	Chuyen My	4	01
10342	dai_xuyen	Xã Đại Xuyên	Dai Xuyen Commune	Đại Xuyên	Dai Xuyen	4	01
10354	van_dinh	Xã Vân Đình	Van Dinh Commune	Vân Đình	Van Dinh	4	01
10369	ung_thien	Xã Ứng Thiên	Ung Thien Commune	Ứng Thiên	Ung Thien	4	01
10402	ung_hoa	Xã Ứng Hòa	Ung Hoa Commune	Ứng Hòa	Ung Hoa	4	01
10417	hoa_xa	Xã Hòa Xá	Hoa Xa Commune	Hòa Xá	Hoa Xa	4	01
10441	my_duc	Xã Mỹ Đức	My Duc Commune	Mỹ Đức	My Duc	4	01
10459	phuc_son	Xã Phúc Sơn	Phuc Son Commune	Phúc Sơn	Phuc Son	4	01
10465	hong_son	Xã Hồng Sơn	Hong Son Commune	Hồng Sơn	Hong Son	4	01
10489	huong_son	Xã Hương Sơn	Huong Son Commune	Hương Sơn	Huong Son	4	01
01273	thuc_phan	Phường Thục Phán	Thuc Phan Ward	Thục Phán	Thuc Phan	3	04
01279	nung_tri_cao	Phường Nùng Trí Cao	Nung Tri Cao Ward	Nùng Trí Cao	Nung Tri Cao	3	04
01288	tan_giang	Phường Tân Giang	Tan Giang Ward	Tân Giang	Tan Giang	3	04
01290	bao_lam	Xã Bảo Lâm	Bao Lam Commune	Bảo Lâm	Bao Lam	4	04
01294	ly_bon	Xã Lý Bôn	Ly Bon Commune	Lý Bôn	Ly Bon	4	04
01297	nam_quang	Xã Nam Quang	Nam Quang Commune	Nam Quang	Nam Quang	4	04
01304	quang_lam	Xã Quảng Lâm	Quang Lam Commune	Quảng Lâm	Quang Lam	4	04
01318	yen_tho	Xã Yên Thổ	Yen Tho Commune	Yên Thổ	Yen Tho	4	04
01321	bao_lac	Xã Bảo Lạc	Bao Lac Commune	Bảo Lạc	Bao Lac	4	04
01324	coc_pang	Xã Cốc Pàng	Coc Pang Commune	Cốc Pàng	Coc Pang	4	04
01327	co_ba	Xã Cô Ba	Co Ba Commune	Cô Ba	Co Ba	4	04
01336	khanh_xuan	Xã Khánh Xuân	Khanh Xuan Commune	Khánh Xuân	Khanh Xuan	4	04
01339	xuan_truong	Xã Xuân Trường	Xuan Truong Commune	Xuân Trường	Xuan Truong	4	04
01351	hung_dao	Xã Hưng Đạo	Hung Dao Commune	Hưng Đạo	Hung Dao	4	04
01354	huy_giap	Xã Huy Giáp	Huy Giap Commune	Huy Giáp	Huy Giap	4	04
01360	son_lo	Xã Sơn Lộ	Son Lo Commune	Sơn Lộ	Son Lo	4	04
01363	thong_nong	Xã Thông Nông	Thong Nong Commune	Thông Nông	Thong Nong	4	04
01366	can_yen	Xã Cần Yên	Can Yen Commune	Cần Yên	Can Yen	4	04
01387	thanh_long	Xã Thanh Long	Thanh Long Commune	Thanh Long	Thanh Long	4	04
01392	truong_ha	Xã Trường Hà	Truong Ha Commune	Trường Hà	Truong Ha	4	04
01393	lung_nam	Xã Lũng Nặm	Lung Nam Commune	Lũng Nặm	Lung Nam	4	04
01414	tong_cot	Xã Tổng Cọt	Tong Cot Commune	Tổng Cọt	Tong Cot	4	04
01438	ha_quang	Xã Hà Quảng	Ha Quang Commune	Hà Quảng	Ha Quang	4	04
01447	tra_linh	Xã Trà Lĩnh	Tra Linh Commune	Trà Lĩnh	Tra Linh	4	04
01456	quang_han	Xã Quang Hán	Quang Han Commune	Quang Hán	Quang Han	4	04
01465	quang_trung	Xã Quang Trung	Quang Trung Commune	Quang Trung	Quang Trung	4	04
01477	trung_khanh	Xã Trùng Khánh	Trung Khanh Commune	Trùng Khánh	Trung Khanh	4	04
01489	dinh_phong	Xã Đình Phong	Dinh Phong Commune	Đình Phong	Dinh Phong	4	04
01501	dam_thuy	Xã Đàm Thủy	Dam Thuy Commune	Đàm Thủy	Dam Thuy	4	04
01525	doai_duong	Xã Đoài Dương	Doai Duong Commune	Đoài Dương	Doai Duong	4	04
01537	ly_quoc	Xã Lý Quốc	Ly Quoc Commune	Lý Quốc	Ly Quoc	4	04
01552	quang_long	Xã Quang Long	Quang Long Commune	Quang Long	Quang Long	4	04
01558	ha_lang	Xã Hạ Lang	Ha Lang Commune	Hạ Lang	Ha Lang	4	04
01561	vinh_quy	Xã Vinh Quý	Vinh Quy Commune	Vinh Quý	Vinh Quy	4	04
01576	quang_uyen	Xã Quảng Uyên	Quang Uyen Commune	Quảng Uyên	Quang Uyen	4	04
01594	doc_lap	Xã Độc Lập	Doc Lap Commune	Độc Lập	Doc Lap	4	04
01618	hanh_phuc	Xã Hạnh Phúc	Hanh Phuc Commune	Hạnh Phúc	Hanh Phuc	4	04
01636	be_van_dan	Xã Bế Văn Đàn	Be Van Dan Commune	Bế Văn Đàn	Be Van Dan	4	04
01648	phuc_hoa	Xã Phục Hòa	Phuc Hoa Commune	Phục Hòa	Phuc Hoa	4	04
01654	hoa_an	Xã Hòa An	Hoa An Commune	Hòa An	Hoa An	4	04
01660	nam_tuan	Xã Nam Tuấn	Nam Tuan Commune	Nam Tuấn	Nam Tuan	4	04
01699	nguyen_hue	Xã Nguyễn Huệ	Nguyen Hue Commune	Nguyễn Huệ	Nguyen Hue	4	04
01708	bach_dang	Xã Bạch Đằng	Bach Dang Commune	Bạch Đằng	Bach Dang	4	04
01726	nguyen_binh	Xã Nguyên Bình	Nguyen Binh Commune	Nguyên Bình	Nguyen Binh	4	04
01729	tinh_tuc	Xã Tĩnh Túc	Tinh Tuc Commune	Tĩnh Túc	Tinh Tuc	4	04
01738	ca_thanh	Xã Ca Thành	Ca Thanh Commune	Ca Thành	Ca Thanh	4	04
01747	minh_tam	Xã Minh Tâm	Minh Tam Commune	Minh Tâm	Minh Tam	4	04
01768	phan_thanh	Xã Phan Thanh	Phan Thanh Commune	Phan Thanh	Phan Thanh	4	04
01774	tam_kim	Xã Tam Kim	Tam Kim Commune	Tam Kim	Tam Kim	4	04
01777	thanh_cong	Xã Thành Công	Thanh Cong Commune	Thành Công	Thanh Cong	4	04
01786	dong_khe	Xã Đông Khê	Dong Khe Commune	Đông Khê	Dong Khe	4	04
01789	canh_tan	Xã Canh Tân	Canh Tan Commune	Canh Tân	Canh Tan	4	04
01792	kim_dong	Xã Kim Đồng	Kim Dong Commune	Kim Đồng	Kim Dong	4	04
01795	minh_khai	Xã Minh Khai	Minh Khai Commune	Minh Khai	Minh Khai	4	04
01807	thach_an	Xã Thạch An	Thach An Commune	Thạch An	Thach An	4	04
01822	duc_long	Xã Đức Long	Duc Long Commune	Đức Long	Duc Long	4	04
00691	ha_giang_2	Phường Hà Giang 2	Ha Giang 2 Ward	Hà Giang 2	Ha Giang 2	3	08
00694	ha_giang_1	Phường Hà Giang 1	Ha Giang 1 Ward	Hà Giang 1	Ha Giang 1	3	08
02212	nong_tien	Phường Nông Tiến	Nong Tien Ward	Nông Tiến	Nong Tien	3	08
02215	minh_xuan	Phường Minh Xuân	Minh Xuan Ward	Minh Xuân	Minh Xuan	3	08
02509	my_lam	Phường Mỹ Lâm	My Lam Ward	Mỹ Lâm	My Lam	3	08
02512	an_tuong	Phường An Tường	An Tuong Ward	An Tường	An Tuong	3	08
02524	binh_thuan	Phường Bình Thuận	Binh Thuan Ward	Bình Thuận	Binh Thuan	3	08
00700	ngoc_duong	Xã Ngọc Đường	Ngoc Duong Commune	Ngọc Đường	Ngoc Duong	4	08
00706	phu_linh	Xã Phú Linh	Phu Linh Commune	Phú Linh	Phu Linh	4	08
00715	lung_cu	Xã Lũng Cú	Lung Cu Commune	Lũng Cú	Lung Cu	4	08
00721	dong_van	Xã Đồng Văn	Dong Van Commune	Đồng Văn	Dong Van	4	08
00733	sa_phin	Xã Sà Phìn	Sa Phin Commune	Sà Phìn	Sa Phin	4	08
00745	pho_bang	Xã Phó Bảng	Pho Bang Commune	Phó Bảng	Pho Bang	4	08
00763	lung_phin	Xã Lũng Phìn	Lung Phin Commune	Lũng Phìn	Lung Phin	4	08
00769	meo_vac	Xã Mèo Vạc	Meo Vac Commune	Mèo Vạc	Meo Vac	4	08
00778	son_vi	Xã Sơn Vĩ	Son Vi Commune	Sơn Vĩ	Son Vi	4	08
00787	sung_mang	Xã Sủng Máng	Sung Mang Commune	Sủng Máng	Sung Mang	4	08
00802	khau_vai	Xã Khâu Vai	Khau Vai Commune	Khâu Vai	Khau Vai	4	08
00808	tat_nga	Xã Tát Ngà	Tat Nga Commune	Tát Ngà	Tat Nga	4	08
00817	niem_son	Xã Niêm Sơn	Niem Son Commune	Niêm Sơn	Niem Son	4	08
00820	yen_minh	Xã Yên Minh	Yen Minh Commune	Yên Minh	Yen Minh	4	08
00829	thang_mo	Xã Thắng Mố	Thang Mo Commune	Thắng Mố	Thang Mo	4	08
00832	bach_dich	Xã Bạch Đích	Bach Dich Commune	Bạch Đích	Bach Dich	4	08
00847	mau_due	Xã Mậu Duệ	Mau Due Commune	Mậu Duệ	Mau Due	4	08
00859	ngoc_long	Xã Ngọc Long	Ngoc Long Commune	Ngọc Long	Ngoc Long	4	08
00865	duong_thuong	Xã Đường Thượng	Duong Thuong Commune	Đường Thượng	Duong Thuong	4	08
00871	du_gia	Xã Du Già	Du Gia Commune	Du Già	Du Gia	4	08
00874	quan_ba	Xã Quản Bạ	Quan Ba Commune	Quản Bạ	Quan Ba	4	08
00883	can_ty	Xã Cán Tỷ	Can Ty Commune	Cán Tỷ	Can Ty	4	08
00889	nghia_thuan	Xã Nghĩa Thuận	Nghia Thuan Commune	Nghĩa Thuận	Nghia Thuan	4	08
00892	tung_vai	Xã Tùng Vài	Tung Vai Commune	Tùng Vài	Tung Vai	4	08
00901	lung_tam	Xã Lùng Tám	Lung Tam Commune	Lùng Tám	Lung Tam	4	08
00913	vi_xuyen	Xã Vị Xuyên	Vi Xuyen Commune	Vị Xuyên	Vi Xuyen	4	08
00919	minh_tan	Xã Minh Tân	Minh Tan Commune	Minh Tân	Minh Tan	4	08
00922	thuan_hoa	Xã Thuận Hòa	Thuan Hoa Commune	Thuận Hòa	Thuan Hoa	4	08
00925	tung_ba	Xã Tùng Bá	Tung Ba Commune	Tùng Bá	Tung Ba	4	08
00928	thanh_thuy	Xã Thanh Thủy	Thanh Thuy Commune	Thanh Thủy	Thanh Thuy	4	08
00937	lao_chai	Xã Lao Chải	Lao Chai Commune	Lao Chải	Lao Chai	4	08
00952	cao_bo	Xã Cao Bồ	Cao Bo Commune	Cao Bồ	Cao Bo	4	08
00958	thuong_son	Xã Thượng Sơn	Thuong Son Commune	Thượng Sơn	Thuong Son	4	08
00967	viet_lam	Xã Việt Lâm	Viet Lam Commune	Việt Lâm	Viet Lam	4	08
00970	linh_ho	Xã Linh Hồ	Linh Ho Commune	Linh Hồ	Linh Ho	4	08
00976	bach_ngoc	Xã Bạch Ngọc	Bach Ngoc Commune	Bạch Ngọc	Bach Ngoc	4	08
00982	minh_son	Xã Minh Sơn	Minh Son Commune	Minh Sơn	Minh Son	4	08
00985	giap_trung	Xã Giáp Trung	Giap Trung Commune	Giáp Trung	Giap Trung	4	08
00991	bac_me	Xã Bắc Mê	Bac Me Commune	Bắc Mê	Bac Me	4	08
00994	minh_ngoc	Xã Minh Ngọc	Minh Ngoc Commune	Minh Ngọc	Minh Ngoc	4	08
01006	yen_cuong	Xã Yên Cường	Yen Cuong Commune	Yên Cường	Yen Cuong	4	08
01012	duong_hong	Xã Đường Hồng	Duong Hong Commune	Đường Hồng	Duong Hong	4	08
01021	hoang_su_phi	Xã Hoàng Su Phì	Hoang Su Phi Commune	Hoàng Su Phì	Hoang Su Phi	4	08
01024	ban_may	Xã Bản Máy	Ban May Commune	Bản Máy	Ban May	4	08
01033	thang_tin	Xã Thàng Tín	Thang Tin Commune	Thàng Tín	Thang Tin	4	08
01051	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	08
01057	po_ly_ngai	Xã Pờ Ly Ngài	Po Ly Ngai Commune	Pờ Ly Ngài	Po Ly Ngai	4	08
01075	nam_dich	Xã Nậm Dịch	Nam Dich Commune	Nậm Dịch	Nam Dich	4	08
01084	ho_thau	Xã Hồ Thầu	Ho Thau Commune	Hồ Thầu	Ho Thau	4	08
01090	thong_nguyen	Xã Thông Nguyên	Thong Nguyen Commune	Thông Nguyên	Thong Nguyen	4	08
01096	pa_vay_su	Xã Pà Vầy Sủ	Pa Vay Su Commune	Pà Vầy Sủ	Pa Vay Su	4	08
01108	xin_man	Xã Xín Mần	Xin Man Commune	Xín Mần	Xin Man	4	08
01117	trung_thinh	Xã Trung Thịnh	Trung Thinh Commune	Trung Thịnh	Trung Thinh	4	08
01141	nam_dan	Xã Nấm Dẩn	Nam Dan Commune	Nấm Dẩn	Nam Dan	4	08
01144	quang_nguyen	Xã Quảng Nguyên	Quang Nguyen Commune	Quảng Nguyên	Quang Nguyen	4	08
01147	khuon_lung	Xã Khuôn Lùng	Khuon Lung Commune	Khuôn Lùng	Khuon Lung	4	08
01153	bac_quang	Xã Bắc Quang	Bac Quang Commune	Bắc Quang	Bac Quang	4	08
01156	vinh_tuy	Xã Vĩnh Tuy	Vinh Tuy Commune	Vĩnh Tuy	Vinh Tuy	4	08
01165	dong_tam	Xã Đồng Tâm	Dong Tam Commune	Đồng Tâm	Dong Tam	4	08
01171	tan_quang	Xã Tân Quang	Tan Quang Commune	Tân Quang	Tan Quang	4	08
01180	bang_hanh	Xã Bằng Hành	Bang Hanh Commune	Bằng Hành	Bang Hanh	4	08
01192	lien_hiep	Xã Liên Hiệp	Lien Hiep Commune	Liên Hiệp	Lien Hiep	4	08
01201	hung_an	Xã Hùng An	Hung An Commune	Hùng An	Hung An	4	08
01216	dong_yen	Xã Đồng Yên	Dong Yen Commune	Đồng Yên	Dong Yen	4	08
01225	tien_nguyen	Xã Tiên Nguyên	Tien Nguyen Commune	Tiên Nguyên	Tien Nguyen	4	08
01234	yen_thanh	Xã Yên Thành	Yen Thanh Commune	Yên Thành	Yen Thanh	4	08
01237	quang_binh	Xã Quang Bình	Quang Binh Commune	Quang Bình	Quang Binh	4	08
01243	tan_trinh	Xã Tân Trịnh	Tan Trinh Commune	Tân Trịnh	Tan Trinh	4	08
01246	bang_lang	Xã Bằng Lang	Bang Lang Commune	Bằng Lang	Bang Lang	4	08
01255	xuan_giang	Xã Xuân Giang	Xuan Giang Commune	Xuân Giang	Xuan Giang	4	08
01261	tien_yen	Xã Tiên Yên	Tien Yen Commune	Tiên Yên	Tien Yen	4	08
02221	na_hang	Xã Nà Hang	Na Hang Commune	Nà Hang	Na Hang	4	08
02239	thuong_nong	Xã Thượng Nông	Thuong Nong Commune	Thượng Nông	Thuong Nong	4	08
02245	con_lon	Xã Côn Lôn	Con Lon Commune	Côn Lôn	Con Lon	4	08
02248	yen_hoa	Xã Yên Hoa	Yen Hoa Commune	Yên Hoa	Yen Hoa	4	08
02260	hong_thai	Xã Hồng Thái	Hong Thai Commune	Hồng Thái	Hong Thai	4	08
02266	lam_binh	Xã Lâm Bình	Lam Binh Commune	Lâm Bình	Lam Binh	4	08
02269	thuong_lam	Xã Thượng Lâm	Thuong Lam Commune	Thượng Lâm	Thuong Lam	4	08
02287	chiem_hoa	Xã Chiêm Hóa	Chiem Hoa Commune	Chiêm Hóa	Chiem Hoa	4	08
02296	binh_an	Xã Bình An	Binh An Commune	Bình An	Binh An	4	08
02302	minh_quang	Xã Minh Quang	Minh Quang Commune	Minh Quang	Minh Quang	4	08
02305	trung_ha	Xã Trung Hà	Trung Ha Commune	Trung Hà	Trung Ha	4	08
02308	tan_my	Xã Tân Mỹ	Tan My Commune	Tân Mỹ	Tan My	4	08
02317	yen_lap	Xã Yên Lập	Yen Lap Commune	Yên Lập	Yen Lap	4	08
02320	tan_an	Xã Tân An	Tan An Commune	Tân An	Tan An	4	08
02332	kien_dai	Xã Kiên Đài	Kien Dai Commune	Kiên Đài	Kien Dai	4	08
02350	kim_binh	Xã Kim Bình	Kim Binh Commune	Kim Bình	Kim Binh	4	08
02353	hoa_an	Xã Hòa An	Hoa An Commune	Hòa An	Hoa An	4	08
02359	tri_phu	Xã Tri Phú	Tri Phu Commune	Tri Phú	Tri Phu	4	08
02365	yen_nguyen	Xã Yên Nguyên	Yen Nguyen Commune	Yên Nguyên	Yen Nguyen	4	08
02374	ham_yen	Xã Hàm Yên	Ham Yen Commune	Hàm Yên	Ham Yen	4	08
02380	bach_xa	Xã Bạch Xa	Bach Xa Commune	Bạch Xa	Bach Xa	4	08
02392	phu_luu	Xã Phù Lưu	Phu Luu Commune	Phù Lưu	Phu Luu	4	08
02398	yen_phu	Xã Yên Phú	Yen Phu Commune	Yên Phú	Yen Phu	4	08
02404	binh_xa	Xã Bình Xa	Binh Xa Commune	Bình Xa	Binh Xa	4	08
02407	thai_son	Xã Thái Sơn	Thai Son Commune	Thái Sơn	Thai Son	4	08
02419	thai_hoa	Xã Thái Hòa	Thai Hoa Commune	Thái Hòa	Thai Hoa	4	08
02425	hung_duc	Xã Hùng Đức	Hung Duc Commune	Hùng Đức	Hung Duc	4	08
02434	luc_hanh	Xã Lực Hành	Luc Hanh Commune	Lực Hành	Luc Hanh	4	08
02437	kien_thiet	Xã Kiến Thiết	Kien Thiet Commune	Kiến Thiết	Kien Thiet	4	08
02449	xuan_van	Xã Xuân Vân	Xuan Van Commune	Xuân Vân	Xuan Van	4	08
02455	hung_loi	Xã Hùng Lợi	Hung Loi Commune	Hùng Lợi	Hung Loi	4	08
02458	trung_son	Xã Trung Sơn	Trung Son Commune	Trung Sơn	Trung Son	4	08
02470	tan_long	Xã Tân Long	Tan Long Commune	Tân Long	Tan Long	4	08
02473	yen_son	Xã Yên Sơn	Yen Son Commune	Yên Sơn	Yen Son	4	08
02494	thai_binh	Xã Thái Bình	Thai Binh Commune	Thái Bình	Thai Binh	4	08
02530	nhu_khe	Xã Nhữ Khê	Nhu Khe Commune	Nhữ Khê	Nhu Khe	4	08
02536	son_duong	Xã Sơn Dương	Son Duong Commune	Sơn Dương	Son Duong	4	08
02545	tan_trao	Xã Tân Trào	Tan Trao Commune	Tân Trào	Tan Trao	4	08
02548	binh_ca	Xã Bình Ca	Binh Ca Commune	Bình Ca	Binh Ca	4	08
02554	minh_thanh	Xã Minh Thanh	Minh Thanh Commune	Minh Thanh	Minh Thanh	4	08
02572	dong_tho	Xã Đông Thọ	Dong Tho Commune	Đông Thọ	Dong Tho	4	08
02578	tan_thanh	Xã Tân Thanh	Tan Thanh Commune	Tân Thanh	Tan Thanh	4	08
02608	hong_son	Xã Hồng Sơn	Hong Son Commune	Hồng Sơn	Hong Son	4	08
02611	phu_luong	Xã Phú Lương	Phu Luong Commune	Phú Lương	Phu Luong	4	08
02620	son_thuy	Xã Sơn Thủy	Son Thuy Commune	Sơn Thủy	Son Thuy	4	08
02623	truong_sinh	Xã Trường Sinh	Truong Sinh Commune	Trường Sinh	Truong Sinh	4	08
03127	dien_bien_phu	Phường Điện Biên Phủ	Dien Bien Phu Ward	Điện Biên Phủ	Dien Bien Phu	3	11
03151	muong_lay	Phường Mường Lay	Muong Lay Ward	Mường Lay	Muong Lay	3	11
03334	muong_thanh	Phường Mường Thanh	Muong Thanh Ward	Mường Thanh	Muong Thanh	3	11
03158	sin_thau	Xã Sín Thầu	Sin Thau Commune	Sín Thầu	Sin Thau	4	11
03160	muong_nhe	Xã Mường Nhé	Muong Nhe Commune	Mường Nhé	Muong Nhe	4	11
03162	nam_ke	Xã Nậm Kè	Nam Ke Commune	Nậm Kè	Nam Ke	4	11
03163	muong_toong	Xã Mường Toong	Muong Toong Commune	Mường Toong	Muong Toong	4	11
03164	quang_lam	Xã Quảng Lâm	Quang Lam Commune	Quảng Lâm	Quang Lam	4	11
03166	muong_cha	Xã Mường Chà	Muong Cha Commune	Mường Chà	Muong Cha	4	11
03169	na_hy	Xã Nà Hỳ	Na Hy Commune	Nà Hỳ	Na Hy	4	11
03172	na_sang	Xã Na Sang	Na Sang Commune	Na Sang	Na Sang	4	11
03175	cha_to	Xã Chà Tở	Cha To Commune	Chà Tở	Cha To	4	11
03176	na_bung	Xã Nà Bủng	Na Bung Commune	Nà Bủng	Na Bung	4	11
03181	muong_tung	Xã Mường Tùng	Muong Tung Commune	Mường Tùng	Muong Tung	4	11
03193	pa_ham	Xã Pa Ham	Pa Ham Commune	Pa Ham	Pa Ham	4	11
03194	nam_nen	Xã Nậm Nèn	Nam Nen Commune	Nậm Nèn	Nam Nen	4	11
03199	si_pa_phin	Xã Si Pa Phìn	Si Pa Phin Commune	Si Pa Phìn	Si Pa Phin	4	11
03202	muong_pon	Xã Mường Pồn	Muong Pon Commune	Mường Pồn	Muong Pon	4	11
03203	na_son	Xã Na Son	Na Son Commune	Na Son	Na Son	4	11
03208	xa_dung	Xã Xa Dung	Xa Dung Commune	Xa Dung	Xa Dung	4	11
03214	muong_luan	Xã Mường Luân	Muong Luan Commune	Mường Luân	Muong Luan	4	11
03217	tua_chua	Xã Tủa Chùa	Tua Chua Commune	Tủa Chùa	Tua Chua	4	11
03220	tua_thang	Xã Tủa Thàng	Tua Thang Commune	Tủa Thàng	Tua Thang	4	11
03226	sin_chai	Xã Sín Chải	Sin Chai Commune	Sín Chải	Sin Chai	4	11
03241	sinh_phinh	Xã Sính Phình	Sinh Phinh Commune	Sính Phình	Sinh Phinh	4	11
03244	sang_nhe	Xã Sáng Nhè	Sang Nhe Commune	Sáng Nhè	Sang Nhe	4	11
03253	tuan_giao	Xã Tuần Giáo	Tuan Giao Commune	Tuần Giáo	Tuan Giao	4	11
03256	muong_ang	Xã Mường Ảng	Muong Ang Commune	Mường Ảng	Muong Ang	4	11
03260	pu_nhung	Xã Pú Nhung	Pu Nhung Commune	Pú Nhung	Pu Nhung	4	11
03268	muong_mun	Xã Mường Mùn	Muong Mun Commune	Mường Mùn	Muong Mun	4	11
03283	chieng_sinh	Xã Chiềng Sinh	Chieng Sinh Commune	Chiềng Sinh	Chieng Sinh	4	11
03295	quai_to	Xã Quài Tở	Quai To Commune	Quài Tở	Quai To	4	11
03301	bung_lao	Xã Búng Lao	Bung Lao Commune	Búng Lao	Bung Lao	4	11
03313	muong_lan	Xã Mường Lạn	Muong Lan Commune	Mường Lạn	Muong Lan	4	11
03316	na_tau	Xã Nà Tấu	Na Tau Commune	Nà Tấu	Na Tau	4	11
03325	muong_phang	Xã Mường Phăng	Muong Phang Commune	Mường Phăng	Muong Phang	4	11
03328	thanh_nua	Xã Thanh Nưa	Thanh Nua Commune	Thanh Nưa	Thanh Nua	4	11
03349	thanh_yen	Xã Thanh Yên	Thanh Yen Commune	Thanh Yên	Thanh Yen	4	11
03352	thanh_an	Xã Thanh An	Thanh An Commune	Thanh An	Thanh An	4	11
03356	sam_mun	Xã Sam Mứn	Sam Mun Commune	Sam Mứn	Sam Mun	4	11
03358	nua_ngam	Xã Núa Ngam	Nua Ngam Commune	Núa Ngam	Nua Ngam	4	11
03368	muong_nha	Xã Mường Nhà	Muong Nha Commune	Mường Nhà	Muong Nha	4	11
03370	pu_nhi	Xã Pu Nhi	Pu Nhi Commune	Pu Nhi	Pu Nhi	4	11
03382	phinh_giang	Xã Phình Giàng	Phinh Giang Commune	Phình Giàng	Phinh Giang	4	11
03385	tia_dinh	Xã Tìa Dình	Tia Dinh Commune	Tìa Dình	Tia Dinh	4	11
03388	doan_ket	Phường Đoàn Kết	Doan Ket Ward	Đoàn Kết	Doan Ket	3	12
03408	tan_phong	Phường Tân Phong	Tan Phong Ward	Tân Phong	Tan Phong	3	12
03390	binh_lu	Xã Bình Lư	Binh Lu Commune	Bình Lư	Binh Lu	4	12
03394	sin_suoi_ho	Xã Sin Suối Hồ	Sin Suoi Ho Commune	Sin Suối Hồ	Sin Suoi Ho	4	12
03405	ta_leng	Xã Tả Lèng	Ta Leng Commune	Tả Lèng	Ta Leng	4	12
03424	ban_bo	Xã Bản Bo	Ban Bo Commune	Bản Bo	Ban Bo	4	12
03430	khun_ha	Xã Khun Há	Khun Ha Commune	Khun Há	Khun Ha	4	12
03433	bum_to	Xã Bum Tở	Bum To Commune	Bum Tở	Bum To	4	12
03434	nam_hang	Xã Nậm Hàng	Nam Hang Commune	Nậm Hàng	Nam Hang	4	12
03439	thu_lum	Xã Thu Lũm	Thu Lum Commune	Thu Lũm	Thu Lum	4	12
03442	pa_u	Xã Pa Ủ	Pa U Commune	Pa Ủ	Pa U	4	12
03445	muong_te	Xã Mường Tè	Muong Te Commune	Mường Tè	Muong Te	4	12
03451	mu_ca	Xã Mù Cả	Mu Ca Commune	Mù Cả	Mu Ca	4	12
03460	hua_bum	Xã Hua Bum	Hua Bum Commune	Hua Bum	Hua Bum	4	12
03463	ta_tong	Xã Tà Tổng	Ta Tong Commune	Tà Tổng	Ta Tong	4	12
03466	bum_nua	Xã Bum Nưa	Bum Nua Commune	Bum Nưa	Bum Nua	4	12
03472	muong_mo	Xã Mường Mô	Muong Mo Commune	Mường Mô	Muong Mo	4	12
03478	sin_ho	Xã Sìn Hồ	Sin Ho Commune	Sìn Hồ	Sin Ho	4	12
03487	le_loi	Xã Lê Lợi	Le Loi Commune	Lê Lợi	Le Loi	4	12
03503	pa_tan	Xã Pa Tần	Pa Tan Commune	Pa Tần	Pa Tan	4	12
03508	hong_thu	Xã Hồng Thu	Hong Thu Commune	Hồng Thu	Hong Thu	4	12
03517	nam_tam	Xã Nậm Tăm	Nam Tam Commune	Nậm Tăm	Nam Tam	4	12
03529	tua_sin_chai	Xã Tủa Sín Chải	Tua Sin Chai Commune	Tủa Sín Chải	Tua Sin Chai	4	12
03532	pu_sam_cap	Xã Pu Sam Cáp	Pu Sam Cap Commune	Pu Sam Cáp	Pu Sam Cap	4	12
03538	nam_ma	Xã Nậm Mạ	Nam Ma Commune	Nậm Mạ	Nam Ma	4	12
03544	nam_cuoi	Xã Nậm Cuổi	Nam Cuoi Commune	Nậm Cuổi	Nam Cuoi	4	12
03549	phong_tho	Xã Phong Thổ	Phong Tho Commune	Phong Thổ	Phong Tho	4	12
03562	si_lo_lau	Xã Sì Lở Lầu	Si Lo Lau Commune	Sì Lở Lầu	Si Lo Lau	4	12
03571	dao_san	Xã Dào San	Dao San Commune	Dào San	Dao San	4	12
03583	khong_lao	Xã Khổng Lào	Khong Lao Commune	Khổng Lào	Khong Lao	4	12
03595	than_uyen	Xã Than Uyên	Than Uyen Commune	Than Uyên	Than Uyen	4	12
03598	tan_uyen	Xã Tân Uyên	Tan Uyen Commune	Tân Uyên	Tan Uyen	4	12
03601	muong_khoa	Xã Mường Khoa	Muong Khoa Commune	Mường Khoa	Muong Khoa	4	12
03613	nam_so	Xã Nậm Sỏ	Nam So Commune	Nậm Sỏ	Nam So	4	12
03616	pac_ta	Xã Pắc Ta	Pac Ta Commune	Pắc Ta	Pac Ta	4	12
03618	muong_than	Xã Mường Than	Muong Than Commune	Mường Than	Muong Than	4	12
03637	muong_kim	Xã Mường Kim	Muong Kim Commune	Mường Kim	Muong Kim	4	12
03640	khoen_on	Xã Khoen On	Khoen On Commune	Khoen On	Khoen On	4	12
03646	to_hieu	Phường Tô Hiệu	To Hieu Ward	Tô Hiệu	To Hieu	3	14
03664	chieng_an	Phường Chiềng An	Chieng An Ward	Chiềng An	Chieng An	3	14
03670	chieng_coi	Phường Chiềng Cơi	Chieng Coi Ward	Chiềng Cơi	Chieng Coi	3	14
03679	chieng_sinh	Phường Chiềng Sinh	Chieng Sinh Ward	Chiềng Sinh	Chieng Sinh	3	14
03979	moc_son	Phường Mộc Sơn	Moc Son Ward	Mộc Sơn	Moc Son	3	14
03980	moc_chau	Phường Mộc Châu	Moc Chau Ward	Mộc Châu	Moc Chau	3	14
03982	thao_nguyen	Phường Thảo Nguyên	Thao Nguyen Ward	Thảo Nguyên	Thao Nguyen	3	14
04033	van_son	Phường Vân Sơn	Van Son Ward	Vân Sơn	Van Son	3	14
03688	muong_chien	Xã Mường Chiên	Muong Chien Commune	Mường Chiên	Muong Chien	4	14
03694	muong_gion	Xã Mường Giôn	Muong Gion Commune	Mường Giôn	Muong Gion	4	14
03703	quynh_nhai	Xã Quỳnh Nhai	Quynh Nhai Commune	Quỳnh Nhai	Quynh Nhai	4	14
03712	muong_sai	Xã Mường Sại	Muong Sai Commune	Mường Sại	Muong Sai	4	14
03721	thuan_chau	Xã Thuận Châu	Thuan Chau Commune	Thuận Châu	Thuan Chau	4	14
03724	binh_thuan	Xã Bình Thuận	Binh Thuan Commune	Bình Thuận	Binh Thuan	4	14
03727	muong_e	Xã Mường É	Muong E Commune	Mường É	Muong E	4	14
03754	chieng_la	Xã Chiềng La	Chieng La Commune	Chiềng La	Chieng La	4	14
03757	muong_khieng	Xã Mường Khiêng	Muong Khieng Commune	Mường Khiêng	Muong Khieng	4	14
03760	muong_bam	Xã Mường Bám	Muong Bam Commune	Mường Bám	Muong Bam	4	14
03763	long_he	Xã Long Hẹ	Long He Commune	Long Hẹ	Long He	4	14
03781	co_ma	Xã Co Mạ	Co Ma Commune	Co Mạ	Co Ma	4	14
03784	nam_lau	Xã Nậm Lầu	Nam Lau Commune	Nậm Lầu	Nam Lau	4	14
03799	muoi_noi	Xã Muổi Nọi	Muoi Noi Commune	Muổi Nọi	Muoi Noi	4	14
03808	muong_la	Xã Mường La	Muong La Commune	Mường La	Muong La	4	14
03814	chieng_lao	Xã Chiềng Lao	Chieng Lao Commune	Chiềng Lao	Chieng Lao	4	14
03820	ngoc_chien	Xã Ngọc Chiến	Ngoc Chien Commune	Ngọc Chiến	Ngoc Chien	4	14
03847	muong_bu	Xã Mường Bú	Muong Bu Commune	Mường Bú	Muong Bu	4	14
03850	chieng_hoa	Xã Chiềng Hoa	Chieng Hoa Commune	Chiềng Hoa	Chieng Hoa	4	14
03856	bac_yen	Xã Bắc Yên	Bac Yen Commune	Bắc Yên	Bac Yen	4	14
03862	xim_vang	Xã Xím Vàng	Xim Vang Commune	Xím Vàng	Xim Vang	4	14
03868	ta_xua	Xã Tà Xùa	Ta Xua Commune	Tà Xùa	Ta Xua	4	14
03871	pac_nga	Xã Pắc Ngà	Pac Nga Commune	Pắc Ngà	Pac Nga	4	14
03880	ta_khoa	Xã Tạ Khoa	Ta Khoa Commune	Tạ Khoa	Ta Khoa	4	14
03892	chieng_sai	Xã Chiềng Sại	Chieng Sai Commune	Chiềng Sại	Chieng Sai	4	14
03901	suoi_to	Xã Suối Tọ	Suoi To Commune	Suối Tọ	Suoi To	4	14
03907	muong_coi	Xã Mường Cơi	Muong Coi Commune	Mường Cơi	Muong Coi	4	14
03910	phu_yen	Xã Phù Yên	Phu Yen Commune	Phù Yên	Phu Yen	4	14
03922	gia_phu	Xã Gia Phù	Gia Phu Commune	Gia Phù	Gia Phu	4	14
03943	muong_bang	Xã Mường Bang	Muong Bang Commune	Mường Bang	Muong Bang	4	14
03958	tuong_ha	Xã Tường Hạ	Tuong Ha Commune	Tường Hạ	Tuong Ha	4	14
03961	kim_bon	Xã Kim Bon	Kim Bon Commune	Kim Bon	Kim Bon	4	14
03970	tan_phong	Xã Tân Phong	Tan Phong Commune	Tân Phong	Tan Phong	4	14
03985	chieng_son	Xã Chiềng Sơn	Chieng Son Commune	Chiềng Sơn	Chieng Son	4	14
03997	tan_yen	Xã Tân Yên	Tan Yen Commune	Tân Yên	Tan Yen	4	14
04000	doan_ket	Xã Đoàn Kết	Doan Ket Commune	Đoàn Kết	Doan Ket	4	14
04006	song_khua	Xã Song Khủa	Song Khua Commune	Song Khủa	Song Khua	4	14
04018	to_mua	Xã Tô Múa	To Mua Commune	Tô Múa	To Mua	4	14
04045	long_sap	Xã Lóng Sập	Long Sap Commune	Lóng Sập	Long Sap	4	14
04048	van_ho	Xã Vân Hồ	Van Ho Commune	Vân Hồ	Van Ho	4	14
04057	xuan_nha	Xã Xuân Nha	Xuan Nha Commune	Xuân Nha	Xuan Nha	4	14
04075	yen_chau	Xã Yên Châu	Yen Chau Commune	Yên Châu	Yen Chau	4	14
04078	chieng_hac	Xã Chiềng Hặc	Chieng Hac Commune	Chiềng Hặc	Chieng Hac	4	14
04087	yen_son	Xã Yên Sơn	Yen Son Commune	Yên Sơn	Yen Son	4	14
04096	long_phieng	Xã Lóng Phiêng	Long Phieng Commune	Lóng Phiêng	Long Phieng	4	14
04099	phieng_khoai	Xã Phiêng Khoài	Phieng Khoai Commune	Phiêng Khoài	Phieng Khoai	4	14
04105	mai_son	Xã Mai Sơn	Mai Son Commune	Mai Sơn	Mai Son	4	14
04108	chieng_sung	Xã Chiềng Sung	Chieng Sung Commune	Chiềng Sung	Chieng Sung	4	14
04117	muong_chanh	Xã Mường Chanh	Muong Chanh Commune	Mường Chanh	Muong Chanh	4	14
04123	chieng_mung	Xã Chiềng Mung	Chieng Mung Commune	Chiềng Mung	Chieng Mung	4	14
04132	chieng_mai	Xã Chiềng Mai	Chieng Mai Commune	Chiềng Mai	Chieng Mai	4	14
04136	ta_hoc	Xã Tà Hộc	Ta Hoc Commune	Tà Hộc	Ta Hoc	4	14
04144	phieng_cam	Xã Phiêng Cằm	Phieng Cam Commune	Phiêng Cằm	Phieng Cam	4	14
04159	phieng_pan	Xã Phiêng Pằn	Phieng Pan Commune	Phiêng Pằn	Phieng Pan	4	14
04168	song_ma	Xã Sông Mã	Song Ma Commune	Sông Mã	Song Ma	4	14
04171	bo_sinh	Xã Bó Sinh	Bo Sinh Commune	Bó Sinh	Bo Sinh	4	14
04183	muong_lam	Xã Mường Lầm	Muong Lam Commune	Mường Lầm	Muong Lam	4	14
04186	nam_ty	Xã Nậm Ty	Nam Ty Commune	Nậm Ty	Nam Ty	4	14
04195	chieng_so	Xã Chiềng Sơ	Chieng So Commune	Chiềng Sơ	Chieng So	4	14
04204	chieng_khoong	Xã Chiềng Khoong	Chieng Khoong Commune	Chiềng Khoong	Chieng Khoong	4	14
04210	huoi_mot	Xã Huổi Một	Huoi Mot Commune	Huổi Một	Huoi Mot	4	14
04219	muong_hung	Xã Mường Hung	Muong Hung Commune	Mường Hung	Muong Hung	4	14
04222	chieng_khuong	Xã Chiềng Khương	Chieng Khuong Commune	Chiềng Khương	Chieng Khuong	4	14
04228	pung_banh	Xã Púng Bánh	Pung Banh Commune	Púng Bánh	Pung Banh	4	14
04231	sop_cop	Xã Sốp Cộp	Sop Cop Commune	Sốp Cộp	Sop Cop	4	14
04240	muong_leo	Xã Mường Lèo	Muong Leo Commune	Mường Lèo	Muong Leo	4	14
04246	muong_lan	Xã Mường Lạn	Muong Lan Commune	Mường Lạn	Muong Lan	4	14
02647	lao_cai	Phường Lào Cai	Lao Cai Ward	Lào Cai	Lao Cai	3	15
02671	cam_duong	Phường Cam Đường	Cam Duong Ward	Cam Đường	Cam Duong	3	15
03006	sa_pa	Phường Sa Pa	Sa Pa Ward	Sa Pa	Sa Pa	3	15
04252	yen_bai	Phường Yên Bái	Yen Bai Ward	Yên Bái	Yen Bai	3	15
04273	nam_cuong	Phường Nam Cường	Nam Cuong Ward	Nam Cường	Nam Cuong	3	15
04279	van_phu	Phường Văn Phú	Van Phu Ward	Văn Phú	Van Phu	3	15
04288	nghia_lo	Phường Nghĩa Lộ	Nghia Lo Ward	Nghĩa Lộ	Nghia Lo	3	15
04543	au_lau	Phường Âu Lâu	Au Lau Ward	Âu Lâu	Au Lau	3	15
04663	trung_tam	Phường Trung Tâm	Trung Tam Ward	Trung Tâm	Trung Tam	3	15
04681	cau_thia	Phường Cầu Thia	Cau Thia Ward	Cầu Thia	Cau Thia	3	15
02680	hop_thanh	Xã Hợp Thành	Hop Thanh Commune	Hợp Thành	Hop Thanh	4	15
02683	bat_xat	Xã Bát Xát	Bat Xat Commune	Bát Xát	Bat Xat	4	15
02686	a_mu_sung	Xã A Mú Sung	A Mu Sung Commune	A Mú Sung	A Mu Sung	4	15
02695	trinh_tuong	Xã Trịnh Tường	Trinh Tuong Commune	Trịnh Tường	Trinh Tuong	4	15
02701	y_ty	Xã Y Tý	Y Ty Commune	Y Tý	Y Ty	4	15
02707	den_sang	Xã Dền Sáng	Den Sang Commune	Dền Sáng	Den Sang	4	15
02725	ban_xeo	Xã Bản Xèo	Ban Xeo Commune	Bản Xèo	Ban Xeo	4	15
02728	muong_hum	Xã Mường Hum	Muong Hum Commune	Mường Hum	Muong Hum	4	15
02746	coc_san	Xã Cốc San	Coc San Commune	Cốc San	Coc San	4	15
02752	pha_long	Xã Pha Long	Pha Long Commune	Pha Long	Pha Long	4	15
02761	muong_khuong	Xã Mường Khương	Muong Khuong Commune	Mường Khương	Muong Khuong	4	15
02782	cao_son	Xã Cao Sơn	Cao Son Commune	Cao Sơn	Cao Son	4	15
02788	ban_lau	Xã Bản Lầu	Ban Lau Commune	Bản Lầu	Ban Lau	4	15
02809	si_ma_cai	Xã Si Ma Cai	Si Ma Cai Commune	Si Ma Cai	Si Ma Cai	4	15
02824	sin_cheng	Xã Sín Chéng	Sin Cheng Commune	Sín Chéng	Sin Cheng	4	15
02839	bac_ha	Xã Bắc Hà	Bac Ha Commune	Bắc Hà	Bac Ha	4	15
02842	ta_cu_ty	Xã Tả Củ Tỷ	Ta Cu Ty Commune	Tả Củ Tỷ	Ta Cu Ty	4	15
02848	lung_phinh	Xã Lùng Phình	Lung Phinh Commune	Lùng Phình	Lung Phinh	4	15
02869	ban_lien	Xã Bản Liền	Ban Lien Commune	Bản Liền	Ban Lien	4	15
02890	bao_nhai	Xã Bảo Nhai	Bao Nhai Commune	Bảo Nhai	Bao Nhai	4	15
02896	coc_lau	Xã Cốc Lầu	Coc Lau Commune	Cốc Lầu	Coc Lau	4	15
02902	phong_hai	Xã Phong Hải	Phong Hai Commune	Phong Hải	Phong Hai	4	15
02905	bao_thang	Xã Bảo Thắng	Bao Thang Commune	Bảo Thắng	Bao Thang	4	15
02908	tang_loong	Xã Tằng Loỏng	Tang Loong Commune	Tằng Loỏng	Tang Loong	4	15
02923	gia_phu	Xã Gia Phú	Gia Phu Commune	Gia Phú	Gia Phu	4	15
02926	xuan_quang	Xã Xuân Quang	Xuan Quang Commune	Xuân Quang	Xuan Quang	4	15
02947	bao_yen	Xã Bảo Yên	Bao Yen Commune	Bảo Yên	Bao Yen	4	15
02953	nghia_do	Xã Nghĩa Đô	Nghia Do Commune	Nghĩa Đô	Nghia Do	4	15
02962	xuan_hoa	Xã Xuân Hòa	Xuan Hoa Commune	Xuân Hòa	Xuan Hoa	4	15
02968	thuong_ha	Xã Thượng Hà	Thuong Ha Commune	Thượng Hà	Thuong Ha	4	15
02989	bao_ha	Xã Bảo Hà	Bao Ha Commune	Bảo Hà	Bao Ha	4	15
02998	phuc_khanh	Xã Phúc Khánh	Phuc Khanh Commune	Phúc Khánh	Phuc Khanh	4	15
03004	ngu_chi_son	Xã Ngũ Chỉ Sơn	Ngu Chi Son Commune	Ngũ Chỉ Sơn	Ngu Chi Son	4	15
03013	ta_phin	Xã Tả Phìn	Ta Phin Commune	Tả Phìn	Ta Phin	4	15
03037	ta_van	Xã Tả Van	Ta Van Commune	Tả Van	Ta Van	4	15
03043	muong_bo	Xã Mường Bo	Muong Bo Commune	Mường Bo	Muong Bo	4	15
03046	ban_ho	Xã Bản Hồ	Ban Ho Commune	Bản Hồ	Ban Ho	4	15
03061	vo_lao	Xã Võ Lao	Vo Lao Commune	Võ Lao	Vo Lao	4	15
03076	nam_chay	Xã Nậm Chày	Nam Chay Commune	Nậm Chày	Nam Chay	4	15
03082	van_ban	Xã Văn Bàn	Van Ban Commune	Văn Bàn	Van Ban	4	15
03085	nam_xe	Xã Nậm Xé	Nam Xe Commune	Nậm Xé	Nam Xe	4	15
03091	chieng_ken	Xã Chiềng Ken	Chieng Ken Commune	Chiềng Ken	Chieng Ken	4	15
03103	khanh_yen	Xã Khánh Yên	Khanh Yen Commune	Khánh Yên	Khanh Yen	4	15
03106	duong_quy	Xã Dương Quỳ	Duong Quy Commune	Dương Quỳ	Duong Quy	4	15
03121	minh_luong	Xã Minh Lương	Minh Luong Commune	Minh Lương	Minh Luong	4	15
04303	luc_yen	Xã Lục Yên	Luc Yen Commune	Lục Yên	Luc Yen	4	15
04309	lam_thuong	Xã Lâm Thượng	Lam Thuong Commune	Lâm Thượng	Lam Thuong	4	15
04336	tan_linh	Xã Tân Lĩnh	Tan Linh Commune	Tân Lĩnh	Tan Linh	4	15
04342	khanh_hoa	Xã Khánh Hòa	Khanh Hoa Commune	Khánh Hòa	Khanh Hoa	4	15
04345	muong_lai	Xã Mường Lai	Muong Lai Commune	Mường Lai	Muong Lai	4	15
04363	phuc_loi	Xã Phúc Lợi	Phuc Loi Commune	Phúc Lợi	Phuc Loi	4	15
04375	mau_a	Xã Mậu A	Mau A Commune	Mậu A	Mau A	4	15
04381	lam_giang	Xã Lâm Giang	Lam Giang Commune	Lâm Giang	Lam Giang	4	15
04387	chau_que	Xã Châu Quế	Chau Que Commune	Châu Quế	Chau Que	4	15
04399	dong_cuong	Xã Đông Cuông	Dong Cuong Commune	Đông Cuông	Dong Cuong	4	15
04402	phong_du_ha	Xã Phong Dụ Hạ	Phong Du Ha Commune	Phong Dụ Hạ	Phong Du Ha	4	15
04423	phong_du_thuong	Xã Phong Dụ Thượng	Phong Du Thuong Commune	Phong Dụ Thượng	Phong Du Thuong	4	15
04429	tan_hop	Xã Tân Hợp	Tan Hop Commune	Tân Hợp	Tan Hop	4	15
04441	xuan_ai	Xã Xuân Ái	Xuan Ai Commune	Xuân Ái	Xuan Ai	4	15
04450	mo_vang	Xã Mỏ Vàng	Mo Vang Commune	Mỏ Vàng	Mo Vang	4	15
04456	mu_cang_chai	Xã Mù Cang Chải	Mu Cang Chai Commune	Mù Cang Chải	Mu Cang Chai	4	15
04462	nam_co	Xã Nậm Có	Nam Co Commune	Nậm Có	Nam Co	4	15
04465	khao_mang	Xã Khao Mang	Khao Mang Commune	Khao Mang	Khao Mang	4	15
04474	lao_chai	Xã Lao Chải	Lao Chai Commune	Lao Chải	Lao Chai	4	15
04489	che_tao	Xã Chế Tạo	Che Tao Commune	Chế Tạo	Che Tao	4	15
04492	pung_luong	Xã Púng Luông	Pung Luong Commune	Púng Luông	Pung Luong	4	15
04498	tran_yen	Xã Trấn Yên	Tran Yen Commune	Trấn Yên	Tran Yen	4	15
04531	quy_mong	Xã Quy Mông	Quy Mong Commune	Quy Mông	Quy Mong	4	15
04537	luong_thinh	Xã Lương Thịnh	Luong Thinh Commune	Lương Thịnh	Luong Thinh	4	15
04564	viet_hong	Xã Việt Hồng	Viet Hong Commune	Việt Hồng	Viet Hong	4	15
04576	hung_khanh	Xã Hưng Khánh	Hung Khanh Commune	Hưng Khánh	Hung Khanh	4	15
04585	hanh_phuc	Xã Hạnh Phúc	Hanh Phuc Commune	Hạnh Phúc	Hanh Phuc	4	15
04603	ta_xi_lang	Xã Tà Xi Láng	Ta Xi Lang Commune	Tà Xi Láng	Ta Xi Lang	4	15
04606	tram_tau	Xã Trạm Tấu	Tram Tau Commune	Trạm Tấu	Tram Tau	4	15
04609	phinh_ho	Xã Phình Hồ	Phinh Ho Commune	Phình Hồ	Phinh Ho	4	15
04630	tu_le	Xã Tú Lệ	Tu Le Commune	Tú Lệ	Tu Le	4	15
04636	gia_hoi	Xã Gia Hội	Gia Hoi Commune	Gia Hội	Gia Hoi	4	15
04651	son_luong	Xã Sơn Lương	Son Luong Commune	Sơn Lương	Son Luong	4	15
04660	lien_son	Xã Liên Sơn	Lien Son Commune	Liên Sơn	Lien Son	4	15
04672	van_chan	Xã Văn Chấn	Van Chan Commune	Văn Chấn	Van Chan	4	15
04693	cat_thinh	Xã Cát Thịnh	Cat Thinh Commune	Cát Thịnh	Cat Thinh	4	15
04699	chan_thinh	Xã Chấn Thịnh	Chan Thinh Commune	Chấn Thịnh	Chan Thinh	4	15
04705	thuong_bang_la	Xã Thượng Bằng La	Thuong Bang La Commune	Thượng Bằng La	Thuong Bang La	4	15
04711	nghia_tam	Xã Nghĩa Tâm	Nghia Tam Commune	Nghĩa Tâm	Nghia Tam	4	15
04714	yen_binh	Xã Yên Bình	Yen Binh Commune	Yên Bình	Yen Binh	4	15
04717	thac_ba	Xã Thác Bà	Thac Ba Commune	Thác Bà	Thac Ba	4	15
04726	cam_nhan	Xã Cảm Nhân	Cam Nhan Commune	Cảm Nhân	Cam Nhan	4	15
04744	yen_thanh	Xã Yên Thành	Yen Thanh Commune	Yên Thành	Yen Thanh	4	15
04750	bao_ai	Xã Bảo Ái	Bao Ai Commune	Bảo Ái	Bao Ai	4	15
01840	duc_xuan	Phường Đức Xuân	Duc Xuan Ward	Đức Xuân	Duc Xuan	3	19
01843	bac_kan	Phường Bắc Kạn	Bac Kan Ward	Bắc Kạn	Bac Kan	3	19
05443	phan_dinh_phung	Phường Phan Đình Phùng	Phan Dinh Phung Ward	Phan Đình Phùng	Phan Dinh Phung	3	19
05455	quyet_thang	Phường Quyết Thắng	Quyet Thang Ward	Quyết Thắng	Quyet Thang	3	19
05467	gia_sang	Phường Gia Sàng	Gia Sang Ward	Gia Sàng	Gia Sang	3	19
05482	quan_trieu	Phường Quan Triều	Quan Trieu Ward	Quan Triều	Quan Trieu	3	19
05500	tich_luong	Phường Tích Lương	Tich Luong Ward	Tích Lương	Tich Luong	3	19
05518	song_cong	Phường Sông Công	Song Cong Ward	Sông Công	Song Cong	3	19
05528	bach_quang	Phường Bách Quang	Bach Quang Ward	Bách Quang	Bach Quang	3	19
05533	ba_xuyen	Phường Bá Xuyên	Ba Xuyen Ward	Bá Xuyên	Ba Xuyen	3	19
05710	linh_son	Phường Linh Sơn	Linh Son Ward	Linh Sơn	Linh Son	3	19
05857	phuc_thuan	Phường Phúc Thuận	Phuc Thuan Ward	Phúc Thuận	Phuc Thuan	3	19
05860	pho_yen	Phường Phổ Yên	Pho Yen Ward	Phổ Yên	Pho Yen	3	19
05890	van_xuan	Phường Vạn Xuân	Van Xuan Ward	Vạn Xuân	Van Xuan	3	19
05899	trung_thanh	Phường Trung Thành	Trung Thanh Ward	Trung Thành	Trung Thanh	3	19
01849	phong_quang	Xã Phong Quang	Phong Quang Commune	Phong Quang	Phong Quang	4	19
01864	bang_thanh	Xã Bằng Thành	Bang Thanh Commune	Bằng Thành	Bang Thanh	4	19
01879	cao_minh	Xã Cao Minh	Cao Minh Commune	Cao Minh	Cao Minh	4	19
01882	nghien_loan	Xã Nghiên Loan	Nghien Loan Commune	Nghiên Loan	Nghien Loan	4	19
01894	phuc_loc	Xã Phúc Lộc	Phuc Loc Commune	Phúc Lộc	Phuc Loc	4	19
01906	ba_be	Xã Ba Bể	Ba Be Commune	Ba Bể	Ba Be	4	19
01912	cho_ra	Xã Chợ Rã	Cho Ra Commune	Chợ Rã	Cho Ra	4	19
01921	thuong_minh	Xã Thượng Minh	Thuong Minh Commune	Thượng Minh	Thuong Minh	4	19
01933	dong_phuc	Xã Đồng Phúc	Dong Phuc Commune	Đồng Phúc	Dong Phuc	4	19
01936	na_phac	Xã Nà Phặc	Na Phac Commune	Nà Phặc	Na Phac	4	19
01942	bang_van	Xã Bằng Vân	Bang Van Commune	Bằng Vân	Bang Van	4	19
01954	ngan_son	Xã Ngân Sơn	Ngan Son Commune	Ngân Sơn	Ngan Son	4	19
01957	thuong_quan	Xã Thượng Quan	Thuong Quan Commune	Thượng Quan	Thuong Quan	4	19
01960	hiep_luc	Xã Hiệp Lực	Hiep Luc Commune	Hiệp Lực	Hiep Luc	4	19
01969	phu_thong	Xã Phủ Thông	Phu Thong Commune	Phủ Thông	Phu Thong	4	19
01981	vinh_thong	Xã Vĩnh Thông	Vinh Thong Commune	Vĩnh Thông	Vinh Thong	4	19
02008	cam_giang	Xã Cẩm Giàng	Cam Giang Commune	Cẩm Giàng	Cam Giang	4	19
07420	my_thai	Xã Mỹ Thái	My Thai Commune	Mỹ Thái	My Thai	4	24
02014	bach_thong	Xã Bạch Thông	Bach Thong Commune	Bạch Thông	Bach Thong	4	19
02020	cho_don	Xã Chợ Đồn	Cho Don Commune	Chợ Đồn	Cho Don	4	19
02026	nam_cuong	Xã Nam Cường	Nam Cuong Commune	Nam Cường	Nam Cuong	4	19
02038	quang_bach	Xã Quảng Bạch	Quang Bach Commune	Quảng Bạch	Quang Bach	4	19
02044	yen_thinh	Xã Yên Thịnh	Yen Thinh Commune	Yên Thịnh	Yen Thinh	4	19
02071	nghia_ta	Xã Nghĩa Tá	Nghia Ta Commune	Nghĩa Tá	Nghia Ta	4	19
02083	yen_phong	Xã Yên Phong	Yen Phong Commune	Yên Phong	Yen Phong	4	19
02086	cho_moi	Xã Chợ Mới	Cho Moi Commune	Chợ Mới	Cho Moi	4	19
02101	thanh_mai	Xã Thanh Mai	Thanh Mai Commune	Thanh Mai	Thanh Mai	4	19
02104	tan_ky	Xã Tân Kỳ	Tan Ky Commune	Tân Kỳ	Tan Ky	4	19
02107	thanh_thinh	Xã Thanh Thịnh	Thanh Thinh Commune	Thanh Thịnh	Thanh Thinh	4	19
02116	yen_binh	Xã Yên Bình	Yen Binh Commune	Yên Bình	Yen Binh	4	19
02143	van_lang	Xã Văn Lang	Van Lang Commune	Văn Lang	Van Lang	4	19
02152	cuong_loi	Xã Cường Lợi	Cuong Loi Commune	Cường Lợi	Cuong Loi	4	19
02155	na_ri	Xã Na Rì	Na Ri Commune	Na Rì	Na Ri	4	19
02176	tran_phu	Xã Trần Phú	Tran Phu Commune	Trần Phú	Tran Phu	4	19
02185	con_minh	Xã Côn Minh	Con Minh Commune	Côn Minh	Con Minh	4	19
02191	xuan_duong	Xã Xuân Dương	Xuan Duong Commune	Xuân Dương	Xuan Duong	4	19
05488	dai_phuc	Xã Đại Phúc	Dai Phuc Commune	Đại Phúc	Dai Phuc	4	19
05503	tan_cuong	Xã Tân Cương	Tan Cuong Commune	Tân Cương	Tan Cuong	4	19
05542	lam_vy	Xã Lam Vỹ	Lam Vy Commune	Lam Vỹ	Lam Vy	4	19
05551	kim_phuong	Xã Kim Phượng	Kim Phuong Commune	Kim Phượng	Kim Phuong	4	19
05563	phuong_tien	Xã Phượng Tiến	Phuong Tien Commune	Phượng Tiến	Phuong Tien	4	19
05569	dinh_hoa	Xã Định Hóa	Dinh Hoa Commune	Định Hóa	Dinh Hoa	4	19
05581	trung_hoi	Xã Trung Hội	Trung Hoi Commune	Trung Hội	Trung Hoi	4	19
05587	binh_yen	Xã Bình Yên	Binh Yen Commune	Bình Yên	Binh Yen	4	19
05602	phu_dinh	Xã Phú Đình	Phu Dinh Commune	Phú Đình	Phu Dinh	4	19
05605	binh_thanh	Xã Bình Thành	Binh Thanh Commune	Bình Thành	Binh Thanh	4	19
05611	phu_luong	Xã Phú Lương	Phu Luong Commune	Phú Lương	Phu Luong	4	19
05620	yen_trach	Xã Yên Trạch	Yen Trach Commune	Yên Trạch	Yen Trach	4	19
05632	hop_thanh	Xã Hợp Thành	Hop Thanh Commune	Hợp Thành	Hop Thanh	4	19
05641	vo_tranh	Xã Vô Tranh	Vo Tranh Commune	Vô Tranh	Vo Tranh	4	19
05662	trai_cau	Xã Trại Cau	Trai Cau Commune	Trại Cau	Trai Cau	4	19
05665	van_lang	Xã Văn Lăng	Van Lang Commune	Văn Lăng	Van Lang	4	19
05674	quang_son	Xã Quang Sơn	Quang Son Commune	Quang Sơn	Quang Son	4	19
05680	van_han	Xã Văn Hán	Van Han Commune	Văn Hán	Van Han	4	19
05692	dong_hy	Xã Đồng Hỷ	Dong Hy Commune	Đồng Hỷ	Dong Hy	4	19
05707	nam_hoa	Xã Nam Hòa	Nam Hoa Commune	Nam Hòa	Nam Hoa	4	19
05716	vo_nhai	Xã Võ Nhai	Vo Nhai Commune	Võ Nhai	Vo Nhai	4	19
05719	sang_moc	Xã Sảng Mộc	Sang Moc Commune	Sảng Mộc	Sang Moc	4	19
05722	nghinh_tuong	Xã Nghinh Tường	Nghinh Tuong Commune	Nghinh Tường	Nghinh Tuong	4	19
05725	than_sa	Xã Thần Sa	Than Sa Commune	Thần Sa	Than Sa	4	19
05740	la_hien	Xã La Hiên	La Hien Commune	La Hiên	La Hien	4	19
05746	trang_xa	Xã Tràng Xá	Trang Xa Commune	Tràng Xá	Trang Xa	4	19
05755	dan_tien	Xã Dân Tiến	Dan Tien Commune	Dân Tiến	Dan Tien	4	19
05773	phu_xuyen	Xã Phú Xuyên	Phu Xuyen Commune	Phú Xuyên	Phu Xuyen	4	19
05776	duc_luong	Xã Đức Lương	Duc Luong Commune	Đức Lương	Duc Luong	4	19
05788	phu_lac	Xã Phú Lạc	Phu Lac Commune	Phú Lạc	Phu Lac	4	19
05800	phu_thinh	Xã Phú Thịnh	Phu Thinh Commune	Phú Thịnh	Phu Thinh	4	19
05809	an_khanh	Xã An Khánh	An Khanh Commune	An Khánh	An Khanh	4	19
05818	la_bang	Xã La Bằng	La Bang Commune	La Bằng	La Bang	4	19
05830	dai_tu	Xã Đại Từ	Dai Tu Commune	Đại Từ	Dai Tu	4	19
05845	van_phu	Xã Vạn Phú	Van Phu Commune	Vạn Phú	Van Phu	4	19
05851	quan_chu	Xã Quân Chu	Quan Chu Commune	Quân Chu	Quan Chu	4	19
05881	thanh_cong	Xã Thành Công	Thanh Cong Commune	Thành Công	Thanh Cong	4	19
05908	phu_binh	Xã Phú Bình	Phu Binh Commune	Phú Bình	Phu Binh	4	19
05917	tan_khanh	Xã Tân Khánh	Tan Khanh Commune	Tân Khánh	Tan Khanh	4	19
05923	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	19
05941	diem_thuy	Xã Điềm Thụy	Diem Thuy Commune	Điềm Thụy	Diem Thuy	4	19
05953	kha_son	Xã Kha Sơn	Kha Son Commune	Kha Sơn	Kha Son	4	19
05977	dong_kinh	Phường Đông Kinh	Dong Kinh Ward	Đông Kinh	Dong Kinh	3	20
05983	luong_van_tri	Phường Lương Văn Tri	Luong Van Tri Ward	Lương Văn Tri	Luong Van Tri	3	20
05986	tam_thanh	Phường Tam Thanh	Tam Thanh Ward	Tam Thanh	Tam Thanh	3	20
06187	ky_lua	Phường Kỳ Lừa	Ky Lua Ward	Kỳ Lừa	Ky Lua	3	20
06001	doan_ket	Xã Đoàn Kết	Doan Ket Commune	Đoàn Kết	Doan Ket	4	20
06004	quoc_khanh	Xã Quốc Khánh	Quoc Khanh Commune	Quốc Khánh	Quoc Khanh	4	20
06019	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	20
06037	khang_chien	Xã Kháng Chiến	Khang Chien Commune	Kháng Chiến	Khang Chien	4	20
06040	that_khe	Xã Thất Khê	That Khe Commune	Thất Khê	That Khe	4	20
06046	trang_dinh	Xã Tràng Định	Trang Dinh Commune	Tràng Định	Trang Dinh	4	20
06058	quoc_viet	Xã Quốc Việt	Quoc Viet Commune	Quốc Việt	Quoc Viet	4	20
06073	hoa_tham	Xã Hoa Thám	Hoa Tham Commune	Hoa Thám	Hoa Tham	4	20
06076	quy_hoa	Xã Quý Hòa	Quy Hoa Commune	Quý Hòa	Quy Hoa	4	20
06079	hong_phong	Xã Hồng Phong	Hong Phong Commune	Hồng Phong	Hong Phong	4	20
04978	kim_boi	Xã Kim Bôi	Kim Boi Commune	Kim Bôi	Kim Boi	4	25
06085	thien_hoa	Xã Thiện Hòa	Thien Hoa Commune	Thiện Hòa	Thien Hoa	4	20
06091	thien_thuat	Xã Thiện Thuật	Thien Thuat Commune	Thiện Thuật	Thien Thuat	4	20
06103	thien_long	Xã Thiện Long	Thien Long Commune	Thiện Long	Thien Long	4	20
06112	binh_gia	Xã Bình Gia	Binh Gia Commune	Bình Gia	Binh Gia	4	20
06115	tan_van	Xã Tân Văn	Tan Van Commune	Tân Văn	Tan Van	4	20
06124	na_sam	Xã Na Sầm	Na Sam Commune	Na Sầm	Na Sam	4	20
06148	thuy_hung	Xã Thụy Hùng	Thuy Hung Commune	Thụy Hùng	Thuy Hung	4	20
06151	hoi_hoan	Xã Hội Hoan	Hoi Hoan Commune	Hội Hoan	Hoi Hoan	4	20
06154	van_lang	Xã Văn Lãng	Van Lang Commune	Văn Lãng	Van Lang	4	20
06172	hoang_van_thu	Xã Hoàng Văn Thụ	Hoang Van Thu Commune	Hoàng Văn Thụ	Hoang Van Thu	4	20
06184	dong_dang	Xã Đồng Đăng	Dong Dang Commune	Đồng Đăng	Dong Dang	4	20
06196	ba_son	Xã Ba Sơn	Ba Son Commune	Ba Sơn	Ba Son	4	20
06211	cao_loc	Xã Cao Lộc	Cao Loc Commune	Cao Lộc	Cao Loc	4	20
06220	cong_son	Xã Công Sơn	Cong Son Commune	Công Sơn	Cong Son	4	20
06253	van_quan	Xã Văn Quan	Van Quan Commune	Văn Quan	Van Quan	4	20
06280	diem_he	Xã Điềm He	Diem He Commune	Điềm He	Diem He	4	20
06286	khanh_khe	Xã Khánh Khê	Khanh Khe Commune	Khánh Khê	Khanh Khe	4	20
06298	yen_phuc	Xã Yên Phúc	Yen Phuc Commune	Yên Phúc	Yen Phuc	4	20
06313	tri_le	Xã Tri Lễ	Tri Le Commune	Tri Lễ	Tri Le	4	20
06316	tan_doan	Xã Tân Đoàn	Tan Doan Commune	Tân Đoàn	Tan Doan	4	20
06325	bac_son	Xã Bắc Sơn	Bac Son Commune	Bắc Sơn	Bac Son	4	20
06337	tan_tri	Xã Tân Tri	Tan Tri Commune	Tân Tri	Tan Tri	4	20
06349	hung_vu	Xã Hưng Vũ	Hung Vu Commune	Hưng Vũ	Hung Vu	4	20
06364	vu_le	Xã Vũ Lễ	Vu Le Commune	Vũ Lễ	Vu Le	4	20
06367	vu_lang	Xã Vũ Lăng	Vu Lang Commune	Vũ Lăng	Vu Lang	4	20
06376	nhat_hoa	Xã Nhất Hòa	Nhat Hoa Commune	Nhất Hòa	Nhat Hoa	4	20
06385	huu_lung	Xã Hữu Lũng	Huu Lung Commune	Hữu Lũng	Huu Lung	4	20
06391	yen_binh	Xã Yên Bình	Yen Binh Commune	Yên Bình	Yen Binh	4	20
06400	huu_lien	Xã Hữu Liên	Huu Lien Commune	Hữu Liên	Huu Lien	4	20
06415	van_nham	Xã Vân Nham	Van Nham Commune	Vân Nham	Van Nham	4	20
06427	cai_kinh	Xã Cai Kinh	Cai Kinh Commune	Cai Kinh	Cai Kinh	4	20
06436	thien_tan	Xã Thiện Tân	Thien Tan Commune	Thiện Tân	Thien Tan	4	20
06445	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	20
06457	tuan_son	Xã Tuấn Sơn	Tuan Son Commune	Tuấn Sơn	Tuan Son	4	20
06463	chi_lang	Xã Chi Lăng	Chi Lang Commune	Chi Lăng	Chi Lang	4	20
06475	bang_mac	Xã Bằng Mạc	Bang Mac Commune	Bằng Mạc	Bang Mac	4	20
06481	chien_thang	Xã Chiến Thắng	Chien Thang Commune	Chiến Thắng	Chien Thang	4	20
06496	nhan_ly	Xã Nhân Lý	Nhan Ly Commune	Nhân Lý	Nhan Ly	4	20
06505	van_linh	Xã Vạn Linh	Van Linh Commune	Vạn Linh	Van Linh	4	20
06517	quan_son	Xã Quan Sơn	Quan Son Commune	Quan Sơn	Quan Son	4	20
06526	na_duong	Xã Na Dương	Na Duong Commune	Na Dương	Na Duong	4	20
06529	loc_binh	Xã Lộc Bình	Loc Binh Commune	Lộc Bình	Loc Binh	4	20
06541	mau_son	Xã Mẫu Sơn	Mau Son Commune	Mẫu Sơn	Mau Son	4	20
06565	khuat_xa	Xã Khuất Xá	Khuat Xa Commune	Khuất Xá	Khuat Xa	4	20
06577	thong_nhat	Xã Thống Nhất	Thong Nhat Commune	Thống Nhất	Thong Nhat	4	20
06601	loi_bac	Xã Lợi Bác	Loi Bac Commune	Lợi Bác	Loi Bac	4	20
06607	xuan_duong	Xã Xuân Dương	Xuan Duong Commune	Xuân Dương	Xuan Duong	4	20
06613	dinh_lap	Xã Đình Lập	Dinh Lap Commune	Đình Lập	Dinh Lap	4	20
06616	thai_binh	Xã Thái Bình	Thai Binh Commune	Thái Bình	Thai Binh	4	20
06625	kien_moc	Xã Kiên Mộc	Kien Moc Commune	Kiên Mộc	Kien Moc	4	20
06637	chau_son	Xã Châu Sơn	Chau Son Commune	Châu Sơn	Chau Son	4	20
06652	ha_tu	Phường Hà Tu	Ha Tu Ward	Hà Tu	Ha Tu	3	22
06658	cao_xanh	Phường Cao Xanh	Cao Xanh Ward	Cao Xanh	Cao Xanh	3	22
06661	viet_hung	Phường Việt Hưng	Viet Hung Ward	Việt Hưng	Viet Hung	3	22
06673	bai_chay	Phường Bãi Cháy	Bai Chay Ward	Bãi Cháy	Bai Chay	3	22
06676	ha_lam	Phường Hà Lầm	Ha Lam Ward	Hà Lầm	Ha Lam	3	22
06685	hong_gai	Phường Hồng Gai	Hong Gai Ward	Hồng Gai	Hong Gai	3	22
06688	ha_long	Phường Hạ Long	Ha Long Ward	Hạ Long	Ha Long	3	22
06706	tuan_chau	Phường Tuần Châu	Tuan Chau Ward	Tuần Châu	Tuan Chau	3	22
06709	mong_cai_2	Phường Móng Cái 2	Mong Cai 2 Ward	Móng Cái 2	Mong Cai 2	3	22
06712	mong_cai_1	Phường Móng Cái 1	Mong Cai 1 Ward	Móng Cái 1	Mong Cai 1	3	22
06736	mong_cai_3	Phường Móng Cái 3	Mong Cai 3 Ward	Móng Cái 3	Mong Cai 3	3	22
06760	mong_duong	Phường Mông Dương	Mong Duong Ward	Mông Dương	Mong Duong	3	22
06778	quang_hanh	Phường Quang Hanh	Quang Hanh Ward	Quang Hanh	Quang Hanh	3	22
06781	cua_ong	Phường Cửa Ông	Cua Ong Ward	Cửa Ông	Cua Ong	3	22
06793	cam_pha	Phường Cẩm Phả	Cam Pha Ward	Cẩm Phả	Cam Pha	3	22
06811	uong_bi	Phường Uông Bí	Uong Bi Ward	Uông Bí	Uong Bi	3	22
06820	vang_danh	Phường Vàng Danh	Vang Danh Ward	Vàng Danh	Vang Danh	3	22
06832	yen_tu	Phường Yên Tử	Yen Tu Ward	Yên Tử	Yen Tu	3	22
07030	hoanh_bo	Phường Hoành Bồ	Hoanh Bo Ward	Hoành Bồ	Hoanh Bo	3	22
07069	mao_khe	Phường Mạo Khê	Mao Khe Ward	Mạo Khê	Mao Khe	3	22
07081	binh_khe	Phường Bình Khê	Binh Khe Ward	Bình Khê	Binh Khe	3	22
07090	an_sinh	Phường An Sinh	An Sinh Ward	An Sinh	An Sinh	3	22
07093	dong_trieu	Phường Đông Triều	Dong Trieu Ward	Đông Triều	Dong Trieu	3	22
07114	hoang_que	Phường Hoàng Quế	Hoang Que Ward	Hoàng Quế	Hoang Que	3	22
07132	quang_yen	Phường Quảng Yên	Quang Yen Ward	Quảng Yên	Quang Yen	3	22
07135	dong_mai	Phường Đông Mai	Dong Mai Ward	Đông Mai	Dong Mai	3	22
07147	hiep_hoa	Phường Hiệp Hòa	Hiep Hoa Ward	Hiệp Hòa	Hiep Hoa	3	22
07168	ha_an	Phường Hà An	Ha An Ward	Hà An	Ha An	3	22
07180	lien_hoa	Phường Liên Hòa	Lien Hoa Ward	Liên Hòa	Lien Hoa	3	22
07183	phong_coc	Phường Phong Cốc	Phong Coc Ward	Phong Cốc	Phong Coc	3	22
06724	hai_son	Xã Hải Sơn	Hai Son Commune	Hải Sơn	Hai Son	4	22
06733	hai_ninh	Xã Hải Ninh	Hai Ninh Commune	Hải Ninh	Hai Ninh	4	22
06757	vinh_thuc	Xã Vĩnh Thực	Vinh Thuc Commune	Vĩnh Thực	Vinh Thuc	4	22
06799	hai_hoa	Xã Hải Hòa	Hai Hoa Commune	Hải Hòa	Hai Hoa	4	22
06838	binh_lieu	Xã Bình Liêu	Binh Lieu Commune	Bình Liêu	Binh Lieu	4	22
06841	hoanh_mo	Xã Hoành Mô	Hoanh Mo Commune	Hoành Mô	Hoanh Mo	4	22
06856	luc_hon	Xã Lục Hồn	Luc Hon Commune	Lục Hồn	Luc Hon	4	22
06862	tien_yen	Xã Tiên Yên	Tien Yen Commune	Tiên Yên	Tien Yen	4	22
06874	dien_xa	Xã Điền Xá	Dien Xa Commune	Điền Xá	Dien Xa	4	22
06877	dong_ngu	Xã Đông Ngũ	Dong Ngu Commune	Đông Ngũ	Dong Ngu	4	22
06886	hai_lang	Xã Hải Lạng	Hai Lang Commune	Hải Lạng	Hai Lang	4	22
06895	dam_ha	Xã Đầm Hà	Dam Ha Commune	Đầm Hà	Dam Ha	4	22
06913	quang_tan	Xã Quảng Tân	Quang Tan Commune	Quảng Tân	Quang Tan	4	22
06922	quang_ha	Xã Quảng Hà	Quang Ha Commune	Quảng Hà	Quang Ha	4	22
06931	quang_duc	Xã Quảng Đức	Quang Duc Commune	Quảng Đức	Quang Duc	4	22
06946	duong_hoa	Xã Đường Hoa	Duong Hoa Commune	Đường Hoa	Duong Hoa	4	22
06967	cai_chien	Xã Cái Chiên	Cai Chien Commune	Cái Chiên	Cai Chien	4	22
06978	ba_che	Xã Ba Chẽ	Ba Che Commune	Ba Chẽ	Ba Che	4	22
06979	ky_thuong	Xã Kỳ Thượng	Ky Thuong Commune	Kỳ Thượng	Ky Thuong	4	22
06985	luong_minh	Xã Lương Minh	Luong Minh Commune	Lương Minh	Luong Minh	4	22
07054	quang_la	Xã Quảng La	Quang La Commune	Quảng La	Quang La	4	22
07060	thong_nhat	Xã Thống Nhất	Thong Nhat Commune	Thống Nhất	Thong Nhat	4	22
06994	van_don	Đặc khu Vân Đồn	Van Don Special administrative region	Vân Đồn	Van Don	5	22
07192	co_to	Đặc khu Cô Tô	Co To Special administrative region	Cô Tô	Co To	5	22
07210	bac_giang	Phường Bắc Giang	Bac Giang Ward	Bắc Giang	Bac Giang	3	24
07228	da_mai	Phường Đa Mai	Da Mai Ward	Đa Mai	Da Mai	3	24
07525	chu	Phường Chũ	Chu Ward	Chũ	Chu	3	24
07612	phuong_son	Phường Phượng Sơn	Phuong Son Ward	Phượng Sơn	Phuong Son	3	24
07681	yen_dung	Phường Yên Dũng	Yen Dung Ward	Yên Dũng	Yen Dung	3	24
07682	tan_an	Phường Tân An	Tan An Ward	Tân An	Tan An	3	24
07696	tien_phong	Phường Tiền Phong	Tien Phong Ward	Tiền Phong	Tien Phong	3	24
07699	tan_tien	Phường Tân Tiến	Tan Tien Ward	Tân Tiến	Tan Tien	3	24
07738	canh_thuy	Phường Cảnh Thụy	Canh Thuy Ward	Cảnh Thụy	Canh Thuy	3	24
07774	tu_lan	Phường Tự Lạn	Tu Lan Ward	Tự Lạn	Tu Lan	3	24
07777	viet_yen	Phường Việt Yên	Viet Yen Ward	Việt Yên	Viet Yen	3	24
07795	nenh	Phường Nếnh	Nenh Ward	Nếnh	Nenh	3	24
07798	van_ha	Phường Vân Hà	Van Ha Ward	Vân Hà	Van Ha	3	24
09169	vu_ninh	Phường Vũ Ninh	Vu Ninh Ward	Vũ Ninh	Vu Ninh	3	24
09187	kinh_bac	Phường Kinh Bắc	Kinh Bac Ward	Kinh Bắc	Kinh Bac	3	24
09190	vo_cuong	Phường Võ Cường	Vo Cuong Ward	Võ Cường	Vo Cuong	3	24
09247	que_vo	Phường Quế Võ	Que Vo Ward	Quế Võ	Que Vo	3	24
09253	nhan_hoa	Phường Nhân Hòa	Nhan Hoa Ward	Nhân Hòa	Nhan Hoa	3	24
09265	phuong_lieu	Phường Phương Liễu	Phuong Lieu Ward	Phương Liễu	Phuong Lieu	3	24
09286	nam_son	Phường Nam Sơn	Nam Son Ward	Nam Sơn	Nam Son	3	24
09295	bong_lai	Phường Bồng Lai	Bong Lai Ward	Bồng Lai	Bong Lai	3	24
09301	dao_vien	Phường Đào Viên	Dao Vien Ward	Đào Viên	Dao Vien	3	24
09325	hap_linh	Phường Hạp Lĩnh	Hap Linh Ward	Hạp Lĩnh	Hap Linh	3	24
09367	tu_son	Phường Từ Sơn	Tu Son Ward	Từ Sơn	Tu Son	3	24
09370	tam_son	Phường Tam Sơn	Tam Son Ward	Tam Sơn	Tam Son	3	24
09379	phu_khe	Phường Phù Khê	Phu Khe Ward	Phù Khê	Phu Khe	3	24
09385	dong_nguyen	Phường Đồng Nguyên	Dong Nguyen Ward	Đồng Nguyên	Dong Nguyen	3	24
09400	thuan_thanh	Phường Thuận Thành	Thuan Thanh Ward	Thuận Thành	Thuan Thanh	3	24
09409	mao_dien	Phường Mão Điền	Mao Dien Ward	Mão Điền	Mao Dien	3	24
09427	tri_qua	Phường Trí Quả	Tri Qua Ward	Trí Quả	Tri Qua	3	24
09430	tram_lo	Phường Trạm Lộ	Tram Lo Ward	Trạm Lộ	Tram Lo	3	24
09433	song_lieu	Phường Song Liễu	Song Lieu Ward	Song Liễu	Song Lieu	3	24
09445	ninh_xa	Phường Ninh Xá	Ninh Xa Ward	Ninh Xá	Ninh Xa	3	24
07246	xuan_luong	Xã Xuân Lương	Xuan Luong Commune	Xuân Lương	Xuan Luong	4	24
07264	tam_tien	Xã Tam Tiến	Tam Tien Commune	Tam Tiến	Tam Tien	4	24
07282	dong_ky	Xã Đồng Kỳ	Dong Ky Commune	Đồng Kỳ	Dong Ky	4	24
07288	yen_the	Xã Yên Thế	Yen The Commune	Yên Thế	Yen The	4	24
07294	bo_ha	Xã Bố Hạ	Bo Ha Commune	Bố Hạ	Bo Ha	4	24
07306	nha_nam	Xã Nhã Nam	Nha Nam Commune	Nhã Nam	Nha Nam	4	24
07330	phuc_hoa	Xã Phúc Hòa	Phuc Hoa Commune	Phúc Hòa	Phuc Hoa	4	24
07333	quang_trung	Xã Quang Trung	Quang Trung Commune	Quang Trung	Quang Trung	4	24
07339	tan_yen	Xã Tân Yên	Tan Yen Commune	Tân Yên	Tan Yen	4	24
07351	ngoc_thien	Xã Ngọc Thiện	Ngoc Thien Commune	Ngọc Thiện	Ngoc Thien	4	24
07375	lang_giang	Xã Lạng Giang	Lang Giang Commune	Lạng Giang	Lang Giang	4	24
07381	tien_luc	Xã Tiên Lục	Tien Luc Commune	Tiên Lục	Tien Luc	4	24
07399	kep	Xã Kép	Kep Commune	Kép	Kep	4	24
07432	tan_dinh	Xã Tân Dĩnh	Tan Dinh Commune	Tân Dĩnh	Tan Dinh	4	24
07444	luc_nam	Xã Lục Nam	Luc Nam Commune	Lục Nam	Luc Nam	4	24
07450	dong_phu	Xã Đông Phú	Dong Phu Commune	Đông Phú	Dong Phu	4	24
07462	bao_dai	Xã Bảo Đài	Bao Dai Commune	Bảo Đài	Bao Dai	4	24
07486	nghia_phuong	Xã Nghĩa Phương	Nghia Phuong Commune	Nghĩa Phương	Nghia Phuong	4	24
07489	truong_son	Xã Trường Sơn	Truong Son Commune	Trường Sơn	Truong Son	4	24
07492	luc_son	Xã Lục Sơn	Luc Son Commune	Lục Sơn	Luc Son	4	24
07498	bac_lung	Xã Bắc Lũng	Bac Lung Commune	Bắc Lũng	Bac Lung	4	24
07519	cam_ly	Xã Cẩm Lý	Cam Ly Commune	Cẩm Lý	Cam Ly	4	24
07531	tan_son	Xã Tân Sơn	Tan Son Commune	Tân Sơn	Tan Son	4	24
07534	sa_ly	Xã Sa Lý	Sa Ly Commune	Sa Lý	Sa Ly	4	24
07537	bien_son	Xã Biên Sơn	Bien Son Commune	Biên Sơn	Bien Son	4	24
07543	son_hai	Xã Sơn Hải	Son Hai Commune	Sơn Hải	Son Hai	4	24
07552	kien_lao	Xã Kiên Lao	Kien Lao Commune	Kiên Lao	Kien Lao	4	24
07573	bien_dong	Xã Biển Động	Bien Dong Commune	Biển Động	Bien Dong	4	24
07582	luc_ngan	Xã Lục Ngạn	Luc Ngan Commune	Lục Ngạn	Luc Ngan	4	24
07594	deo_gia	Xã Đèo Gia	Deo Gia Commune	Đèo Gia	Deo Gia	4	24
07603	nam_duong	Xã Nam Dương	Nam Duong Commune	Nam Dương	Nam Duong	4	24
07615	son_dong	Xã Sơn Động	Son Dong Commune	Sơn Động	Son Dong	4	24
07616	tay_yen_tu	Xã Tây Yên Tử	Tay Yen Tu Commune	Tây Yên Tử	Tay Yen Tu	4	24
07621	van_son	Xã Vân Sơn	Van Son Commune	Vân Sơn	Van Son	4	24
07627	dai_son	Xã Đại Sơn	Dai Son Commune	Đại Sơn	Dai Son	4	24
07642	yen_dinh	Xã Yên Định	Yen Dinh Commune	Yên Định	Yen Dinh	4	24
07654	an_lac	Xã An Lạc	An Lac Commune	An Lạc	An Lac	4	24
07663	tuan_dao	Xã Tuấn Đạo	Tuan Dao Commune	Tuấn Đạo	Tuan Dao	4	24
07672	duong_huu	Xã Dương Hưu	Duong Huu Commune	Dương Hưu	Duong Huu	4	24
07735	dong_viet	Xã Đồng Việt	Dong Viet Commune	Đồng Việt	Dong Viet	4	24
07822	hoang_van	Xã Hoàng Vân	Hoang Van Commune	Hoàng Vân	Hoang Van	4	24
07840	hiep_hoa	Xã Hiệp Hòa	Hiep Hoa Commune	Hiệp Hòa	Hiep Hoa	4	24
07864	hop_thinh	Xã Hợp Thịnh	Hop Thinh Commune	Hợp Thịnh	Hop Thinh	4	24
07870	xuan_cam	Xã Xuân Cẩm	Xuan Cam Commune	Xuân Cẩm	Xuan Cam	4	24
09193	yen_phong	Xã Yên Phong	Yen Phong Commune	Yên Phong	Yen Phong	4	24
09202	tam_giang	Xã Tam Giang	Tam Giang Commune	Tam Giang	Tam Giang	4	24
09205	yen_trung	Xã Yên Trung	Yen Trung Commune	Yên Trung	Yen Trung	4	24
09208	tam_da	Xã Tam Đa	Tam Da Commune	Tam Đa	Tam Da	4	24
09238	van_mon	Xã Văn Môn	Van Mon Commune	Văn Môn	Van Mon	4	24
09292	phu_lang	Xã Phù Lãng	Phu Lang Commune	Phù Lãng	Phu Lang	4	24
09313	chi_lang	Xã Chi Lăng	Chi Lang Commune	Chi Lăng	Chi Lang	4	24
09319	tien_du	Xã Tiên Du	Tien Du Commune	Tiên Du	Tien Du	4	24
09334	lien_bao	Xã Liên Bão	Lien Bao Commune	Liên Bão	Lien Bao	4	24
09340	dai_dong	Xã Đại Đồng	Dai Dong Commune	Đại Đồng	Dai Dong	4	24
09343	tan_chi	Xã Tân Chi	Tan Chi Commune	Tân Chi	Tan Chi	4	24
09349	phat_tich	Xã Phật Tích	Phat Tich Commune	Phật Tích	Phat Tich	4	24
09454	gia_binh	Xã Gia Bình	Gia Binh Commune	Gia Bình	Gia Binh	4	24
09466	cao_duc	Xã Cao Đức	Cao Duc Commune	Cao Đức	Cao Duc	4	24
09469	dai_lai	Xã Đại Lai	Dai Lai Commune	Đại Lai	Dai Lai	4	24
09475	nhan_thang	Xã Nhân Thắng	Nhan Thang Commune	Nhân Thắng	Nhan Thang	4	24
09487	dong_cuu	Xã Đông Cứu	Dong Cuu Commune	Đông Cứu	Dong Cuu	4	24
09496	luong_tai	Xã Lương Tài	Luong Tai Commune	Lương Tài	Luong Tai	4	24
09499	trung_kenh	Xã Trung Kênh	Trung Kenh Commune	Trung Kênh	Trung Kenh	4	24
09523	trung_chinh	Xã Trung Chính	Trung Chinh Commune	Trung Chính	Trung Chinh	4	24
09529	lam_thao	Xã Lâm Thao	Lam Thao Commune	Lâm Thao	Lam Thao	4	24
04792	tan_hoa	Phường Tân Hòa	Tan Hoa Ward	Tân Hòa	Tan Hoa	3	25
04795	hoa_binh	Phường Hòa Bình	Hoa Binh Ward	Hòa Bình	Hoa Binh	3	25
04828	thong_nhat	Phường Thống Nhất	Thong Nhat Ward	Thống Nhất	Thong Nhat	3	25
04894	ky_son	Phường Kỳ Sơn	Ky Son Ward	Kỳ Sơn	Ky Son	3	25
07894	nong_trang	Phường Nông Trang	Nong Trang Ward	Nông Trang	Nong Trang	3	25
07900	viet_tri	Phường Việt Trì	Viet Tri Ward	Việt Trì	Viet Tri	3	25
07909	thanh_mieu	Phường Thanh Miếu	Thanh Mieu Ward	Thanh Miếu	Thanh Mieu	3	25
07918	van_phu	Phường Vân Phú	Van Phu Ward	Vân Phú	Van Phu	3	25
07942	phu_tho	Phường Phú Thọ	Phu Tho Ward	Phú Thọ	Phu Tho	3	25
07948	au_co	Phường Âu Cơ	Au Co Ward	Âu Cơ	Au Co	3	25
07954	phong_chau	Phường Phong Châu	Phong Chau Ward	Phong Châu	Phong Chau	3	25
08707	vinh_yen	Phường Vĩnh Yên	Vinh Yen Ward	Vĩnh Yên	Vinh Yen	3	25
08716	vinh_phuc	Phường Vĩnh Phúc	Vinh Phuc Ward	Vĩnh Phúc	Vinh Phuc	3	25
08740	phuc_yen	Phường Phúc Yên	Phuc Yen Ward	Phúc Yên	Phuc Yen	3	25
08746	xuan_hoa	Phường Xuân Hòa	Xuan Hoa Ward	Xuân Hòa	Xuan Hoa	3	25
04831	da_bac	Xã Đà Bắc	Da Bac Commune	Đà Bắc	Da Bac	4	25
04846	duc_nhan	Xã Đức Nhàn	Duc Nhan Commune	Đức Nhàn	Duc Nhan	4	25
04849	tan_pheo	Xã Tân Pheo	Tan Pheo Commune	Tân Pheo	Tan Pheo	4	25
04873	quy_duc	Xã Quy Đức	Quy Duc Commune	Quy Đức	Quy Duc	4	25
04876	cao_son	Xã Cao Sơn	Cao Son Commune	Cao Sơn	Cao Son	4	25
04891	tien_phong	Xã Tiền Phong	Tien Phong Commune	Tiền Phong	Tien Phong	4	25
04897	thinh_minh	Xã Thịnh Minh	Thinh Minh Commune	Thịnh Minh	Thinh Minh	4	25
04924	luong_son	Xã Lương Sơn	Luong Son Commune	Lương Sơn	Luong Son	4	25
04960	lien_son	Xã Liên Sơn	Lien Son Commune	Liên Sơn	Lien Son	4	25
04990	nat_son	Xã Nật Sơn	Nat Son Commune	Nật Sơn	Nat Son	4	25
05014	muong_dong	Xã Mường Động	Muong Dong Commune	Mường Động	Muong Dong	4	25
05047	cao_duong	Xã Cao Dương	Cao Duong Commune	Cao Dương	Cao Duong	4	25
05068	hop_kim	Xã Hợp Kim	Hop Kim Commune	Hợp Kim	Hop Kim	4	25
05086	dung_tien	Xã Dũng Tiến	Dung Tien Commune	Dũng Tiến	Dung Tien	4	25
05089	cao_phong	Xã Cao Phong	Cao Phong Commune	Cao Phong	Cao Phong	4	25
05092	thung_nai	Xã Thung Nai	Thung Nai Commune	Thung Nai	Thung Nai	4	25
05116	muong_thang	Xã Mường Thàng	Muong Thang Commune	Mường Thàng	Muong Thang	4	25
05128	tan_lac	Xã Tân Lạc	Tan Lac Commune	Tân Lạc	Tan Lac	4	25
05134	muong_hoa	Xã Mường Hoa	Muong Hoa Commune	Mường Hoa	Muong Hoa	4	25
05152	van_son	Xã Vân Sơn	Van Son Commune	Vân Sơn	Van Son	4	25
05158	muong_bi	Xã Mường Bi	Muong Bi Commune	Mường Bi	Muong Bi	4	25
05191	toan_thang	Xã Toàn Thắng	Toan Thang Commune	Toàn Thắng	Toan Thang	4	25
05200	mai_chau	Xã Mai Châu	Mai Chau Commune	Mai Châu	Mai Chau	4	25
05206	tan_mai	Xã Tân Mai	Tan Mai Commune	Tân Mai	Tan Mai	4	25
05212	pa_co	Xã Pà Cò	Pa Co Commune	Pà Cò	Pa Co	4	25
05245	bao_la	Xã Bao La	Bao La Commune	Bao La	Bao La	4	25
05251	mai_ha	Xã Mai Hạ	Mai Ha Commune	Mai Hạ	Mai Ha	4	25
05266	lac_son	Xã Lạc Sơn	Lac Son Commune	Lạc Sơn	Lac Son	4	25
05287	muong_vang	Xã Mường Vang	Muong Vang Commune	Mường Vang	Muong Vang	4	25
05290	nhan_nghia	Xã Nhân Nghĩa	Nhan Nghia Commune	Nhân Nghĩa	Nhan Nghia	4	25
05293	thuong_coc	Xã Thượng Cốc	Thuong Coc Commune	Thượng Cốc	Thuong Coc	4	25
05305	yen_phu	Xã Yên Phú	Yen Phu Commune	Yên Phú	Yen Phu	4	25
05323	quyet_thang	Xã Quyết Thắng	Quyet Thang Commune	Quyết Thắng	Quyet Thang	4	25
05329	ngoc_son	Xã Ngọc Sơn	Ngoc Son Commune	Ngọc Sơn	Ngoc Son	4	25
05347	dai_dong	Xã Đại Đồng	Dai Dong Commune	Đại Đồng	Dai Dong	4	25
05353	yen_thuy	Xã Yên Thủy	Yen Thuy Commune	Yên Thủy	Yen Thuy	4	25
05362	lac_luong	Xã Lạc Lương	Lac Luong Commune	Lạc Lương	Lac Luong	4	25
05386	yen_tri	Xã Yên Trị	Yen Tri Commune	Yên Trị	Yen Tri	4	25
05392	lac_thuy	Xã Lạc Thủy	Lac Thuy Commune	Lạc Thủy	Lac Thuy	4	25
05395	an_nghia	Xã An Nghĩa	An Nghia Commune	An Nghĩa	An Nghia	4	25
05425	an_binh	Xã An Bình	An Binh Commune	An Bình	An Binh	4	25
07969	doan_hung	Xã Đoan Hùng	Doan Hung Commune	Đoan Hùng	Doan Hung	4	25
07996	bang_luan	Xã Bằng Luân	Bang Luan Commune	Bằng Luân	Bang Luan	4	25
07999	chi_dam	Xã Chí Đám	Chi Dam Commune	Chí Đám	Chi Dam	4	25
08023	tay_coc	Xã Tây Cốc	Tay Coc Commune	Tây Cốc	Tay Coc	4	25
08038	chan_mong	Xã Chân Mộng	Chan Mong Commune	Chân Mộng	Chan Mong	4	25
08053	ha_hoa	Xã Hạ Hòa	Ha Hoa Commune	Hạ Hòa	Ha Hoa	4	25
08071	dan_thuong	Xã Đan Thượng	Dan Thuong Commune	Đan Thượng	Dan Thuong	4	25
08110	hien_luong	Xã Hiền Lương	Hien Luong Commune	Hiền Lương	Hien Luong	4	25
08113	yen_ky	Xã Yên Kỳ	Yen Ky Commune	Yên Kỳ	Yen Ky	4	25
08134	van_lang	Xã Văn Lang	Van Lang Commune	Văn Lang	Van Lang	4	25
08143	vinh_chan	Xã Vĩnh Chân	Vinh Chan Commune	Vĩnh Chân	Vinh Chan	4	25
08152	thanh_ba	Xã Thanh Ba	Thanh Ba Commune	Thanh Ba	Thanh Ba	4	25
08173	quang_yen	Xã Quảng Yên	Quang Yen Commune	Quảng Yên	Quang Yen	4	25
08203	hoang_cuong	Xã Hoàng Cương	Hoang Cuong Commune	Hoàng Cương	Hoang Cuong	4	25
08209	dong_thanh	Xã Đông Thành	Dong Thanh Commune	Đông Thành	Dong Thanh	4	25
08218	chi_tien	Xã Chí Tiên	Chi Tien Commune	Chí Tiên	Chi Tien	4	25
08227	lien_minh	Xã Liên Minh	Lien Minh Commune	Liên Minh	Lien Minh	4	25
08230	phu_ninh	Xã Phù Ninh	Phu Ninh Commune	Phù Ninh	Phu Ninh	4	25
08236	phu_my	Xã Phú Mỹ	Phu My Commune	Phú Mỹ	Phu My	4	25
08245	tram_than	Xã Trạm Thản	Tram Than Commune	Trạm Thản	Tram Than	4	25
08254	dan_chu	Xã Dân Chủ	Dan Chu Commune	Dân Chủ	Dan Chu	4	25
08275	binh_phu	Xã Bình Phú	Binh Phu Commune	Bình Phú	Binh Phu	4	25
08290	yen_lap	Xã Yên Lập	Yen Lap Commune	Yên Lập	Yen Lap	4	25
08296	son_luong	Xã Sơn Lương	Son Luong Commune	Sơn Lương	Son Luong	4	25
08305	xuan_vien	Xã Xuân Viên	Xuan Vien Commune	Xuân Viên	Xuan Vien	4	25
08311	trung_son	Xã Trung Sơn	Trung Son Commune	Trung Sơn	Trung Son	4	25
08323	thuong_long	Xã Thượng Long	Thuong Long Commune	Thượng Long	Thuong Long	4	25
08338	minh_hoa	Xã Minh Hòa	Minh Hoa Commune	Minh Hòa	Minh Hoa	4	25
08341	cam_khe	Xã Cẩm Khê	Cam Khe Commune	Cẩm Khê	Cam Khe	4	25
08344	tien_luong	Xã Tiên Lương	Tien Luong Commune	Tiên Lương	Tien Luong	4	25
08377	van_ban	Xã Vân Bán	Van Ban Commune	Vân Bán	Van Ban	4	25
08398	phu_khe	Xã Phú Khê	Phu Khe Commune	Phú Khê	Phu Khe	4	25
08416	hung_viet	Xã Hùng Việt	Hung Viet Commune	Hùng Việt	Hung Viet	4	25
08431	dong_luong	Xã Đồng Lương	Dong Luong Commune	Đồng Lương	Dong Luong	4	25
08434	tam_nong	Xã Tam Nông	Tam Nong Commune	Tam Nông	Tam Nong	4	25
08443	hien_quan	Xã Hiền Quan	Hien Quan Commune	Hiền Quan	Hien Quan	4	25
08467	van_xuan	Xã Vạn Xuân	Van Xuan Commune	Vạn Xuân	Van Xuan	4	25
08479	tho_van	Xã Thọ Văn	Tho Van Commune	Thọ Văn	Tho Van	4	25
08494	lam_thao	Xã Lâm Thao	Lam Thao Commune	Lâm Thao	Lam Thao	4	25
08500	xuan_lung	Xã Xuân Lũng	Xuan Lung Commune	Xuân Lũng	Xuan Lung	4	25
08515	hy_cuong	Xã Hy Cương	Hy Cuong Commune	Hy Cương	Hy Cuong	4	25
08521	phung_nguyen	Xã Phùng Nguyên	Phung Nguyen Commune	Phùng Nguyên	Phung Nguyen	4	25
08527	ban_nguyen	Xã Bản Nguyên	Ban Nguyen Commune	Bản Nguyên	Ban Nguyen	4	25
08542	thanh_son	Xã Thanh Sơn	Thanh Son Commune	Thanh Sơn	Thanh Son	4	25
08545	thu_cuc	Xã Thu Cúc	Thu Cuc Commune	Thu Cúc	Thu Cuc	4	25
08560	lai_dong	Xã Lai Đồng	Lai Dong Commune	Lai Đồng	Lai Dong	4	25
08566	tan_son	Xã Tân Sơn	Tan Son Commune	Tân Sơn	Tan Son	4	25
08584	vo_mieu	Xã Võ Miếu	Vo Mieu Commune	Võ Miếu	Vo Mieu	4	25
08590	xuan_dai	Xã Xuân Đài	Xuan Dai Commune	Xuân Đài	Xuan Dai	4	25
08593	minh_dai	Xã Minh Đài	Minh Dai Commune	Minh Đài	Minh Dai	4	25
08611	van_mieu	Xã Văn Miếu	Van Mieu Commune	Văn Miếu	Van Mieu	4	25
08614	cu_dong	Xã Cự Đồng	Cu Dong Commune	Cự Đồng	Cu Dong	4	25
08620	long_coc	Xã Long Cốc	Long Coc Commune	Long Cốc	Long Coc	4	25
08632	huong_can	Xã Hương Cần	Huong Can Commune	Hương Cần	Huong Can	4	25
08635	kha_cuu	Xã Khả Cửu	Kha Cuu Commune	Khả Cửu	Kha Cuu	4	25
08656	yen_son	Xã Yên Sơn	Yen Son Commune	Yên Sơn	Yen Son	4	25
08662	dao_xa	Xã Đào Xá	Dao Xa Commune	Đào Xá	Dao Xa	4	25
08674	thanh_thuy	Xã Thanh Thủy	Thanh Thuy Commune	Thanh Thủy	Thanh Thuy	4	25
08686	tu_vu	Xã Tu Vũ	Tu Vu Commune	Tu Vũ	Tu Vu	4	25
08761	lap_thach	Xã Lập Thạch	Lap Thach Commune	Lập Thạch	Lap Thach	4	25
08770	hop_ly	Xã Hợp Lý	Hop Ly Commune	Hợp Lý	Hop Ly	4	25
08773	yen_lang	Xã Yên Lãng	Yen Lang Commune	Yên Lãng	Yen Lang	4	25
08782	hai_luu	Xã Hải Lựu	Hai Luu Commune	Hải Lựu	Hai Luu	4	25
08788	thai_hoa	Xã Thái Hòa	Thai Hoa Commune	Thái Hòa	Thai Hoa	4	25
08812	lien_hoa	Xã Liên Hòa	Lien Hoa Commune	Liên Hòa	Lien Hoa	4	25
08824	tam_son	Xã Tam Sơn	Tam Son Commune	Tam Sơn	Tam Son	4	25
08842	tien_lu	Xã Tiên Lữ	Tien Lu Commune	Tiên Lữ	Tien Lu	4	25
08848	song_lo	Xã Sông Lô	Song Lo Commune	Sông Lô	Song Lo	4	25
08866	son_dong	Xã Sơn Đông	Son Dong Commune	Sơn Đông	Son Dong	4	25
08869	tam_duong	Xã Tam Dương	Tam Duong Commune	Tam Dương	Tam Duong	4	25
08872	tam_duong_bac	Xã Tam Dương Bắc	Tam Duong Bac Commune	Tam Dương Bắc	Tam Duong Bac	4	25
08896	hoang_an	Xã Hoàng An	Hoang An Commune	Hoàng An	Hoang An	4	25
08905	hoi_thinh	Xã Hội Thịnh	Hoi Thinh Commune	Hội Thịnh	Hoi Thinh	4	25
08911	tam_dao	Xã Tam Đảo	Tam Dao Commune	Tam Đảo	Tam Dao	4	25
08914	dao_tru	Xã Đạo Trù	Dao Tru Commune	Đạo Trù	Dao Tru	4	25
08923	dai_dinh	Xã Đại Đình	Dai Dinh Commune	Đại Đình	Dai Dinh	4	25
08935	binh_nguyen	Xã Bình Nguyên	Binh Nguyen Commune	Bình Nguyên	Binh Nguyen	4	25
08944	binh_tuyen	Xã Bình Tuyền	Binh Tuyen Commune	Bình Tuyền	Binh Tuyen	4	25
08950	binh_xuyen	Xã Bình Xuyên	Binh Xuyen Commune	Bình Xuyên	Binh Xuyen	4	25
08971	xuan_lang	Xã Xuân Lãng	Xuan Lang Commune	Xuân Lãng	Xuan Lang	4	25
09025	yen_lac	Xã Yên Lạc	Yen Lac Commune	Yên Lạc	Yen Lac	4	25
09040	te_lo	Xã Tề Lỗ	Te Lo Commune	Tề Lỗ	Te Lo	4	25
09043	tam_hong	Xã Tam Hồng	Tam Hong Commune	Tam Hồng	Tam Hong	4	25
09052	nguyet_duc	Xã Nguyệt Đức	Nguyet Duc Commune	Nguyệt Đức	Nguyet Duc	4	25
09064	lien_chau	Xã Liên Châu	Lien Chau Commune	Liên Châu	Lien Chau	4	25
09076	vinh_tuong	Xã Vĩnh Tường	Vinh Tuong Commune	Vĩnh Tường	Vinh Tuong	4	25
09079	vinh_an	Xã Vĩnh An	Vinh An Commune	Vĩnh An	Vinh An	4	25
09100	vinh_hung	Xã Vĩnh Hưng	Vinh Hung Commune	Vĩnh Hưng	Vinh Hung	4	25
09106	vinh_thanh	Xã Vĩnh Thành	Vinh Thanh Commune	Vĩnh Thành	Vinh Thanh	4	25
09112	tho_tang	Xã Thổ Tang	Tho Tang Commune	Thổ Tang	Tho Tang	4	25
09154	vinh_phu	Xã Vĩnh Phú	Vinh Phu Commune	Vĩnh Phú	Vinh Phu	4	25
10507	thanh_dong	Phường Thành Đông	Thanh Dong Ward	Thành Đông	Thanh Dong	3	31
10525	hai_duong	Phường Hải Dương	Hai Duong Ward	Hải Dương	Hai Duong	3	31
10532	le_thanh_nghi	Phường Lê Thanh Nghị	Le Thanh Nghi Ward	Lê Thanh Nghị	Le Thanh Nghi	3	31
10537	tan_hung	Phường Tân Hưng	Tan Hung Ward	Tân Hưng	Tan Hung	3	31
10543	viet_hoa	Phường Việt Hòa	Viet Hoa Ward	Việt Hòa	Viet Hoa	3	31
10546	chi_linh	Phường Chí Linh	Chi Linh Ward	Chí Linh	Chi Linh	3	31
10549	chu_van_an	Phường Chu Văn An	Chu Van An Ward	Chu Văn An	Chu Van An	3	31
10552	nguyen_trai	Phường Nguyễn Trãi	Nguyen Trai Ward	Nguyễn Trãi	Nguyen Trai	3	31
10570	tran_hung_dao	Phường Trần Hưng Đạo	Tran Hung Dao Ward	Trần Hưng Đạo	Tran Hung Dao	3	31
10573	tran_nhan_tong	Phường Trần Nhân Tông	Tran Nhan Tong Ward	Trần Nhân Tông	Tran Nhan Tong	3	31
10603	le_dai_hanh	Phường Lê Đại Hành	Le Dai Hanh Ward	Lê Đại Hành	Le Dai Hanh	3	31
10660	ai_quoc	Phường Ái Quốc	Ai Quoc Ward	Ái Quốc	Ai Quoc	3	31
10675	kinh_mon	Phường Kinh Môn	Kinh Mon Ward	Kinh Môn	Kinh Mon	3	31
10678	bac_an_phu	Phường Bắc An Phụ	Bac An Phu Ward	Bắc An Phụ	Bac An Phu	3	31
10714	nhi_chieu	Phường Nhị Chiểu	Nhi Chieu Ward	Nhị Chiểu	Nhi Chieu	3	31
10726	pham_su_manh	Phường Phạm Sư Mạnh	Pham Su Manh Ward	Phạm Sư Mạnh	Pham Su Manh	3	31
10729	tran_lieu	Phường Trần Liễu	Tran Lieu Ward	Trần Liễu	Tran Lieu	3	31
10744	nguyen_dai_nang	Phường Nguyễn Đại Năng	Nguyen Dai Nang Ward	Nguyễn Đại Năng	Nguyen Dai Nang	3	31
10837	nam_dong	Phường Nam Đồng	Nam Dong Ward	Nam Đồng	Nam Dong	3	31
10891	tu_minh	Phường Tứ Minh	Tu Minh Ward	Tứ Minh	Tu Minh	3	31
11002	thach_khoi	Phường Thạch Khôi	Thach Khoi Ward	Thạch Khôi	Thach Khoi	3	31
11311	hong_bang	Phường Hồng Bàng	Hong Bang Ward	Hồng Bàng	Hong Bang	3	31
11329	ngo_quyen	Phường Ngô Quyền	Ngo Quyen Ward	Ngô Quyền	Ngo Quyen	3	31
11359	gia_vien	Phường Gia Viên	Gia Vien Ward	Gia Viên	Gia Vien	3	31
11383	le_chan	Phường Lê Chân	Le Chan Ward	Lê Chân	Le Chan	3	31
11407	an_bien	Phường An Biên	An Bien Ward	An Biên	An Bien	3	31
11411	dong_hai	Phường Đông Hải	Dong Hai Ward	Đông Hải	Dong Hai	3	31
11413	hai_an	Phường Hải An	Hai An Ward	Hải An	Hai An	3	31
11443	kien_an	Phường Kiến An	Kien An Ward	Kiến An	Kien An	3	31
11446	phu_lien	Phường Phù Liễn	Phu Lien Ward	Phù Liễn	Phu Lien	3	31
11455	do_son	Phường Đồ Sơn	Do Son Ward	Đồ Sơn	Do Son	3	31
11473	bach_dang	Phường Bạch Đằng	Bach Dang Ward	Bạch Đằng	Bach Dang	3	31
11488	luu_kiem	Phường Lưu Kiếm	Luu Kiem Ward	Lưu Kiếm	Luu Kiem	3	31
11506	le_ich_moc	Phường Lê Ích Mộc	Le Ich Moc Ward	Lê Ích Mộc	Le Ich Moc	3	31
11533	hoa_binh	Phường Hòa Bình	Hoa Binh Ward	Hòa Bình	Hoa Binh	3	31
11542	nam_trieu	Phường Nam Triệu	Nam Trieu Ward	Nam Triệu	Nam Trieu	3	31
11557	thien_huong	Phường Thiên Hương	Thien Huong Ward	Thiên Hương	Thien Huong	3	31
11560	thuy_nguyen	Phường Thủy Nguyên	Thuy Nguyen Ward	Thủy Nguyên	Thuy Nguyen	3	31
11581	an_duong	Phường An Dương	An Duong Ward	An Dương	An Duong	3	31
11593	an_phong	Phường An Phong	An Phong Ward	An Phong	An Phong	3	31
11602	hong_an	Phường Hồng An	Hong An Ward	Hồng An	Hong An	3	31
11617	an_hai	Phường An Hải	An Hai Ward	An Hải	An Hai	3	31
11689	hung_dao	Phường Hưng Đạo	Hung Dao Ward	Hưng Đạo	Hung Dao	3	31
11692	duong_kinh	Phường Dương Kinh	Duong Kinh Ward	Dương Kinh	Duong Kinh	3	31
11737	nam_do_son	Phường Nam Đồ Sơn	Nam Do Son Ward	Nam Đồ Sơn	Nam Do Son	3	31
10606	nam_sach	Xã Nam Sách	Nam Sach Commune	Nam Sách	Nam Sach	4	31
10615	hop_tien	Xã Hợp Tiến	Hop Tien Commune	Hợp Tiến	Hop Tien	4	31
10633	tran_phu	Xã Trần Phú	Tran Phu Commune	Trần Phú	Tran Phu	4	31
10642	thai_tan	Xã Thái Tân	Thai Tan Commune	Thái Tân	Thai Tan	4	31
10645	an_phu	Xã An Phú	An Phu Commune	An Phú	An Phu	4	31
10705	nam_an_phu	Xã Nam An Phụ	Nam An Phu Commune	Nam An Phụ	Nam An Phu	4	31
10750	phu_thai	Xã Phú Thái	Phu Thai Commune	Phú Thái	Phu Thai	4	31
10756	lai_khe	Xã Lai Khê	Lai Khe Commune	Lai Khê	Lai Khe	4	31
10792	an_thanh	Xã An Thành	An Thanh Commune	An Thành	An Thanh	4	31
10804	kim_thanh	Xã Kim Thành	Kim Thanh Commune	Kim Thành	Kim Thanh	4	31
10813	thanh_ha	Xã Thanh Hà	Thanh Ha Commune	Thanh Hà	Thanh Ha	4	31
10816	ha_bac	Xã Hà Bắc	Ha Bac Commune	Hà Bắc	Ha Bac	4	31
10843	ha_nam	Xã Hà Nam	Ha Nam Commune	Hà Nam	Ha Nam	4	31
10846	ha_tay	Xã Hà Tây	Ha Tay Commune	Hà Tây	Ha Tay	4	31
10882	ha_dong	Xã Hà Đông	Ha Dong Commune	Hà Đông	Ha Dong	4	31
10888	cam_giang	Xã Cẩm Giang	Cam Giang Commune	Cẩm Giang	Cam Giang	4	31
10903	cam_giang	Xã Cẩm Giàng	Cam Giang Commune	Cẩm Giàng	Cam Giang	4	31
10909	tue_tinh	Xã Tuệ Tĩnh	Tue Tinh Commune	Tuệ Tĩnh	Tue Tinh	4	31
10930	mao_dien	Xã Mao Điền	Mao Dien Commune	Mao Điền	Mao Dien	4	31
10945	ke_sat	Xã Kẻ Sặt	Ke Sat Commune	Kẻ Sặt	Ke Sat	4	31
10966	binh_giang	Xã Bình Giang	Binh Giang Commune	Bình Giang	Binh Giang	4	31
10972	duong_an	Xã Đường An	Duong An Commune	Đường An	Duong An	4	31
10993	thuong_hong	Xã Thượng Hồng	Thuong Hong Commune	Thượng Hồng	Thuong Hong	4	31
10999	gia_loc	Xã Gia Lộc	Gia Loc Commune	Gia Lộc	Gia Loc	4	31
11020	yet_kieu	Xã Yết Kiêu	Yet Kieu Commune	Yết Kiêu	Yet Kieu	4	31
11050	gia_phuc	Xã Gia Phúc	Gia Phuc Commune	Gia Phúc	Gia Phuc	4	31
11065	truong_tan	Xã Trường Tân	Truong Tan Commune	Trường Tân	Truong Tan	4	31
11074	tu_ky	Xã Tứ Kỳ	Tu Ky Commune	Tứ Kỳ	Tu Ky	4	31
11086	dai_son	Xã Đại Sơn	Dai Son Commune	Đại Sơn	Dai Son	4	31
11113	tan_ky	Xã Tân Kỳ	Tan Ky Commune	Tân Kỳ	Tan Ky	4	31
11131	chi_minh	Xã Chí Minh	Chi Minh Commune	Chí Minh	Chi Minh	4	31
11140	lac_phuong	Xã Lạc Phượng	Lac Phuong Commune	Lạc Phượng	Lac Phuong	4	31
11146	nguyen_giap	Xã Nguyên Giáp	Nguyen Giap Commune	Nguyên Giáp	Nguyen Giap	4	31
11164	vinh_lai	Xã Vĩnh Lại	Vinh Lai Commune	Vĩnh Lại	Vinh Lai	4	31
11167	tan_an	Xã Tân An	Tan An Commune	Tân An	Tan An	4	31
11203	ninh_giang	Xã Ninh Giang	Ninh Giang Commune	Ninh Giang	Ninh Giang	4	31
11218	hong_chau	Xã Hồng Châu	Hong Chau Commune	Hồng Châu	Hong Chau	4	31
11224	khuc_thua_du	Xã Khúc Thừa Dụ	Khuc Thua Du Commune	Khúc Thừa Dụ	Khuc Thua Du	4	31
11239	thanh_mien	Xã Thanh Miện	Thanh Mien Commune	Thanh Miện	Thanh Mien	4	31
11242	nguyen_luong_bang	Xã Nguyễn Lương Bằng	Nguyen Luong Bang Commune	Nguyễn Lương Bằng	Nguyen Luong Bang	4	31
11254	bac_thanh_mien	Xã Bắc Thanh Miện	Bac Thanh Mien Commune	Bắc Thanh Miện	Bac Thanh Mien	4	31
11257	hai_hung	Xã Hải Hưng	Hai Hung Commune	Hải Hưng	Hai Hung	4	31
11284	nam_thanh_mien	Xã Nam Thanh Miện	Nam Thanh Mien Commune	Nam Thanh Miện	Nam Thanh Mien	4	31
11503	viet_khe	Xã Việt Khê	Viet Khe Commune	Việt Khê	Viet Khe	4	31
11629	an_lao	Xã An Lão	An Lao Commune	An Lão	An Lao	4	31
11635	an_truong	Xã An Trường	An Truong Commune	An Trường	An Truong	4	31
11647	an_quang	Xã An Quang	An Quang Commune	An Quang	An Quang	4	31
11668	an_khanh	Xã An Khánh	An Khanh Commune	An Khánh	An Khanh	4	31
11674	an_hung	Xã An Hưng	An Hung Commune	An Hưng	An Hung	4	31
11680	kien_thuy	Xã Kiến Thụy	Kien Thuy Commune	Kiến Thụy	Kien Thuy	4	31
11713	nghi_duong	Xã Nghi Dương	Nghi Duong Commune	Nghi Dương	Nghi Duong	4	31
11725	kien_minh	Xã Kiến Minh	Kien Minh Commune	Kiến Minh	Kien Minh	4	31
11728	kien_hung	Xã Kiến Hưng	Kien Hung Commune	Kiến Hưng	Kien Hung	4	31
11749	kien_hai	Xã Kiến Hải	Kien Hai Commune	Kiến Hải	Kien Hai	4	31
11755	tien_lang	Xã Tiên Lãng	Tien Lang Commune	Tiên Lãng	Tien Lang	4	31
11761	quyet_thang	Xã Quyết Thắng	Quyet Thang Commune	Quyết Thắng	Quyet Thang	4	31
11779	tan_minh	Xã Tân Minh	Tan Minh Commune	Tân Minh	Tan Minh	4	31
11791	tien_minh	Xã Tiên Minh	Tien Minh Commune	Tiên Minh	Tien Minh	4	31
11806	chan_hung	Xã Chấn Hưng	Chan Hung Commune	Chấn Hưng	Chan Hung	4	31
11809	hung_thang	Xã Hùng Thắng	Hung Thang Commune	Hùng Thắng	Hung Thang	4	31
11824	vinh_bao	Xã Vĩnh Bảo	Vinh Bao Commune	Vĩnh Bảo	Vinh Bao	4	31
11836	vinh_thinh	Xã Vĩnh Thịnh	Vinh Thinh Commune	Vĩnh Thịnh	Vinh Thinh	4	31
11842	vinh_thuan	Xã Vĩnh Thuận	Vinh Thuan Commune	Vĩnh Thuận	Vinh Thuan	4	31
11848	vinh_hoa	Xã Vĩnh Hòa	Vinh Hoa Commune	Vĩnh Hòa	Vinh Hoa	4	31
11875	vinh_hai	Xã Vĩnh Hải	Vinh Hai Commune	Vĩnh Hải	Vinh Hai	4	31
11887	vinh_am	Xã Vĩnh Am	Vinh Am Commune	Vĩnh Am	Vinh Am	4	31
11911	nguyen_binh_khiem	Xã Nguyễn Bỉnh Khiêm	Nguyen Binh Khiem Commune	Nguyễn Bỉnh Khiêm	Nguyen Binh Khiem	4	31
11914	cat_hai	Đặc khu Cát Hải	Cat Hai Special administrative region	Cát Hải	Cat Hai	5	31
11948	bach_long_vi	Đặc khu Bạch Long Vĩ	Bach Long Vi Special administrative region	Bạch Long Vĩ	Bach Long Vi	5	31
11953	pho_hien	Phường Phố Hiến	Pho Hien Ward	Phố Hiến	Pho Hien	3	33
11980	hong_chau	Phường Hồng Châu	Hong Chau Ward	Hồng Châu	Hong Chau	3	33
11983	son_nam	Phường Sơn Nam	Son Nam Ward	Sơn Nam	Son Nam	3	33
12103	my_hao	Phường Mỹ Hào	My Hao Ward	Mỹ Hào	My Hao	3	33
12127	thuong_hong	Phường Thượng Hồng	Thuong Hong Ward	Thượng Hồng	Thuong Hong	3	33
12133	duong_hao	Phường Đường Hào	Duong Hao Ward	Đường Hào	Duong Hao	3	33
12452	tran_hung_dao	Phường Trần Hưng Đạo	Tran Hung Dao Ward	Trần Hưng Đạo	Tran Hung Dao	3	33
12454	tran_lam	Phường Trần Lãm	Tran Lam Ward	Trần Lãm	Tran Lam	3	33
12466	vu_phuc	Phường Vũ Phúc	Vu Phuc Ward	Vũ Phúc	Vu Phuc	3	33
12817	tra_ly	Phường Trà Lý	Tra Ly Ward	Trà Lý	Tra Ly	3	33
13225	thai_binh	Phường Thái Bình	Thai Binh Ward	Thái Bình	Thai Binh	3	33
11977	tan_hung	Xã Tân Hưng	Tan Hung Commune	Tân Hưng	Tan Hung	4	33
11992	lac_dao	Xã Lạc Đạo	Lac Dao Commune	Lạc Đạo	Lac Dao	4	33
11995	dai_dong	Xã Đại Đồng	Dai Dong Commune	Đại Đồng	Dai Dong	4	33
12004	nhu_quynh	Xã Như Quỳnh	Nhu Quynh Commune	Như Quỳnh	Nhu Quynh	4	33
12019	van_giang	Xã Văn Giang	Van Giang Commune	Văn Giang	Van Giang	4	33
12025	phung_cong	Xã Phụng Công	Phung Cong Commune	Phụng Công	Phung Cong	4	33
12031	nghia_tru	Xã Nghĩa Trụ	Nghia Tru Commune	Nghĩa Trụ	Nghia Tru	4	33
12049	me_so	Xã Mễ Sở	Me So Commune	Mễ Sở	Me So	4	33
12064	nguyen_van_linh	Xã Nguyễn Văn Linh	Nguyen Van Linh Commune	Nguyễn Văn Linh	Nguyen Van Linh	4	33
12070	hoan_long	Xã Hoàn Long	Hoan Long Commune	Hoàn Long	Hoan Long	4	33
12073	yen_my	Xã Yên Mỹ	Yen My Commune	Yên Mỹ	Yen My	4	33
12091	viet_yen	Xã Việt Yên	Viet Yen Commune	Việt Yên	Viet Yen	4	33
12142	an_thi	Xã Ân Thi	An Thi Commune	Ân Thi	An Thi	4	33
12148	pham_ngu_lao	Xã Phạm Ngũ Lão	Pham Ngu Lao Commune	Phạm Ngũ Lão	Pham Ngu Lao	4	33
12166	xuan_truc	Xã Xuân Trúc	Xuan Truc Commune	Xuân Trúc	Xuan Truc	4	33
12184	nguyen_trai	Xã Nguyễn Trãi	Nguyen Trai Commune	Nguyễn Trãi	Nguyen Trai	4	33
12196	hong_quang	Xã Hồng Quang	Hong Quang Commune	Hồng Quang	Hong Quang	4	33
12205	khoai_chau	Xã Khoái Châu	Khoai Chau Commune	Khoái Châu	Khoai Chau	4	33
12223	trieu_viet_vuong	Xã Triệu Việt Vương	Trieu Viet Vuong Commune	Triệu Việt Vương	Trieu Viet Vuong	4	33
12238	viet_tien	Xã Việt Tiến	Viet Tien Commune	Việt Tiến	Viet Tien	4	33
12247	chau_ninh	Xã Châu Ninh	Chau Ninh Commune	Châu Ninh	Chau Ninh	4	33
12271	chi_minh	Xã Chí Minh	Chi Minh Commune	Chí Minh	Chi Minh	4	33
12280	luong_bang	Xã Lương Bằng	Luong Bang Commune	Lương Bằng	Luong Bang	4	33
12286	nghia_dan	Xã Nghĩa Dân	Nghia Dan Commune	Nghĩa Dân	Nghia Dan	4	33
12313	duc_hop	Xã Đức Hợp	Duc Hop Commune	Đức Hợp	Duc Hop	4	33
12322	hiep_cuong	Xã Hiệp Cường	Hiep Cuong Commune	Hiệp Cường	Hiep Cuong	4	33
12337	hoang_hoa_tham	Xã Hoàng Hoa Thám	Hoang Hoa Tham Commune	Hoàng Hoa Thám	Hoang Hoa Tham	4	33
12361	tien_hoa	Xã Tiên Hoa	Tien Hoa Commune	Tiên Hoa	Tien Hoa	4	33
12364	tien_lu	Xã Tiên Lữ	Tien Lu Commune	Tiên Lữ	Tien Lu	4	33
12391	quang_hung	Xã Quang Hưng	Quang Hung Commune	Quang Hưng	Quang Hung	4	33
12406	doan_dao	Xã Đoàn Đào	Doan Dao Commune	Đoàn Đào	Doan Dao	4	33
12424	tien_tien	Xã Tiên Tiến	Tien Tien Commune	Tiên Tiến	Tien Tien	4	33
12427	tong_tran	Xã Tống Trân	Tong Tran Commune	Tống Trân	Tong Tran	4	33
12472	quynh_phu	Xã Quỳnh Phụ	Quynh Phu Commune	Quỳnh Phụ	Quynh Phu	4	33
12499	a_sao	Xã A Sào	A Sao Commune	A Sào	A Sao	4	33
12511	minh_tho	Xã Minh Thọ	Minh Tho Commune	Minh Thọ	Minh Tho	4	33
12517	ngoc_lam	Xã Ngọc Lâm	Ngoc Lam Commune	Ngọc Lâm	Ngoc Lam	4	33
12523	phu_duc	Xã Phụ Dực	Phu Duc Commune	Phụ Dực	Phu Duc	4	33
12526	dong_bang	Xã Đồng Bằng	Dong Bang Commune	Đồng Bằng	Dong Bang	4	33
12532	nguyen_du	Xã Nguyễn Du	Nguyen Du Commune	Nguyễn Du	Nguyen Du	4	33
12577	quynh_an	Xã Quỳnh An	Quynh An Commune	Quỳnh An	Quynh An	4	33
12583	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	33
12586	hung_ha	Xã Hưng Hà	Hung Ha Commune	Hưng Hà	Hung Ha	4	33
12595	ngu_thien	Xã Ngự Thiên	Ngu Thien Commune	Ngự Thiên	Ngu Thien	4	33
12613	long_hung	Xã Long Hưng	Long Hung Commune	Long Hưng	Long Hung	4	33
12619	dien_ha	Xã Diên Hà	Dien Ha Commune	Diên Hà	Dien Ha	4	33
12631	than_khe	Xã Thần Khê	Than Khe Commune	Thần Khê	Than Khe	4	33
12634	tien_la	Xã Tiên La	Tien La Commune	Tiên La	Tien La	4	33
12676	le_quy_don	Xã Lê Quý Đôn	Le Quy Don Commune	Lê Quý Đôn	Le Quy Don	4	33
12685	hong_minh	Xã Hồng Minh	Hong Minh Commune	Hồng Minh	Hong Minh	4	33
12688	dong_hung	Xã Đông Hưng	Dong Hung Commune	Đông Hưng	Dong Hung	4	33
12694	bac_dong_hung	Xã Bắc Đông Hưng	Bac Dong Hung Commune	Bắc Đông Hưng	Bac Dong Hung	4	33
12700	bac_tien_hung	Xã Bắc Tiên Hưng	Bac Tien Hung Commune	Bắc Tiên Hưng	Bac Tien Hung	4	33
12736	dong_tien_hung	Xã Đông Tiên Hưng	Dong Tien Hung Commune	Đông Tiên Hưng	Dong Tien Hung	4	33
12745	bac_dong_quan	Xã Bắc Đông Quan	Bac Dong Quan Commune	Bắc Đông Quan	Bac Dong Quan	4	33
12754	tien_hung	Xã Tiên Hưng	Tien Hung Commune	Tiên Hưng	Tien Hung	4	33
12763	nam_tien_hung	Xã Nam Tiên Hưng	Nam Tien Hung Commune	Nam Tiên Hưng	Nam Tien Hung	4	33
12775	nam_dong_hung	Xã Nam Đông Hưng	Nam Dong Hung Commune	Nam Đông Hưng	Nam Dong Hung	4	33
12793	dong_quan	Xã Đông Quan	Dong Quan Commune	Đông Quan	Dong Quan	4	33
12826	thai_thuy	Xã Thái Thụy	Thai Thuy Commune	Thái Thụy	Thai Thuy	4	33
12850	tay_thuy_anh	Xã Tây Thụy Anh	Tay Thuy Anh Commune	Tây Thụy Anh	Tay Thuy Anh	4	33
12859	bac_thuy_anh	Xã Bắc Thụy Anh	Bac Thuy Anh Commune	Bắc Thụy Anh	Bac Thuy Anh	4	33
12862	dong_thuy_anh	Xã Đông Thụy Anh	Dong Thuy Anh Commune	Đông Thụy Anh	Dong Thuy Anh	4	33
12865	thuy_anh	Xã Thụy Anh	Thuy Anh Commune	Thụy Anh	Thuy Anh	4	33
12904	nam_thuy_anh	Xã Nam Thụy Anh	Nam Thuy Anh Commune	Nam Thụy Anh	Nam Thuy Anh	4	33
12916	bac_thai_ninh	Xã Bắc Thái Ninh	Bac Thai Ninh Commune	Bắc Thái Ninh	Bac Thai Ninh	4	33
12919	tay_thai_ninh	Xã Tây Thái Ninh	Tay Thai Ninh Commune	Tây Thái Ninh	Tay Thai Ninh	4	33
12922	thai_ninh	Xã Thái Ninh	Thai Ninh Commune	Thái Ninh	Thai Ninh	4	33
12943	dong_thai_ninh	Xã Đông Thái Ninh	Dong Thai Ninh Commune	Đông Thái Ninh	Dong Thai Ninh	4	33
12961	nam_thai_ninh	Xã Nam Thái Ninh	Nam Thai Ninh Commune	Nam Thái Ninh	Nam Thai Ninh	4	33
12970	tien_hai	Xã Tiền Hải	Tien Hai Commune	Tiền Hải	Tien Hai	4	33
12988	dong_tien_hai	Xã Đông Tiền Hải	Dong Tien Hai Commune	Đông Tiền Hải	Dong Tien Hai	4	33
13003	dong_chau	Xã Đồng Châu	Dong Chau Commune	Đồng Châu	Dong Chau	4	33
13021	ai_quoc	Xã Ái Quốc	Ai Quoc Commune	Ái Quốc	Ai Quoc	4	33
13039	tay_tien_hai	Xã Tây Tiền Hải	Tay Tien Hai Commune	Tây Tiền Hải	Tay Tien Hai	4	33
13057	nam_cuong	Xã Nam Cường	Nam Cuong Commune	Nam Cường	Nam Cuong	4	33
13063	nam_tien_hai	Xã Nam Tiền Hải	Nam Tien Hai Commune	Nam Tiền Hải	Nam Tien Hai	4	33
13066	hung_phu	Xã Hưng Phú	Hung Phu Commune	Hưng Phú	Hung Phu	4	33
13075	kien_xuong	Xã Kiến Xương	Kien Xuong Commune	Kiến Xương	Kien Xuong	4	33
13093	tra_giang	Xã Trà Giang	Tra Giang Commune	Trà Giang	Tra Giang	4	33
13096	binh_nguyen	Xã Bình Nguyên	Binh Nguyen Commune	Bình Nguyên	Binh Nguyen	4	33
13120	le_loi	Xã Lê Lợi	Le Loi Commune	Lê Lợi	Le Loi	4	33
13132	quang_lich	Xã Quang Lịch	Quang Lich Commune	Quang Lịch	Quang Lich	4	33
13141	vu_quy	Xã Vũ Quý	Vu Quy Commune	Vũ Quý	Vu Quy	4	33
13159	hong_vu	Xã Hồng Vũ	Hong Vu Commune	Hồng Vũ	Hong Vu	4	33
13183	binh_thanh	Xã Bình Thanh	Binh Thanh Commune	Bình Thanh	Binh Thanh	4	33
13186	binh_dinh	Xã Bình Định	Binh Dinh Commune	Bình Định	Binh Dinh	4	33
13192	vu_thu	Xã Vũ Thư	Vu Thu Commune	Vũ Thư	Vu Thu	4	33
13219	van_xuan	Xã Vạn Xuân	Van Xuan Commune	Vạn Xuân	Van Xuan	4	33
13222	thu_tri	Xã Thư Trì	Thu Tri Commune	Thư Trì	Thu Tri	4	33
13246	tan_thuan	Xã Tân Thuận	Tan Thuan Commune	Tân Thuận	Tan Thuan	4	33
13264	thu_vu	Xã Thư Vũ	Thu Vu Commune	Thư Vũ	Thu Vu	4	33
13279	vu_tien	Xã Vũ Tiên	Vu Tien Commune	Vũ Tiên	Vu Tien	4	33
13285	phu_ly	Phường Phủ Lý	Phu Ly Ward	Phủ Lý	Phu Ly	3	37
13291	phu_van	Phường Phù Vân	Phu Van Ward	Phù Vân	Phu Van	3	37
13318	chau_son	Phường Châu Sơn	Chau Son Ward	Châu Sơn	Chau Son	3	37
13324	duy_tien	Phường Duy Tiên	Duy Tien Ward	Duy Tiên	Duy Tien	3	37
13330	duy_tan	Phường Duy Tân	Duy Tan Ward	Duy Tân	Duy Tan	3	37
13336	duy_ha	Phường Duy Hà	Duy Ha Ward	Duy Hà	Duy Ha	3	37
13348	dong_van	Phường Đồng Văn	Dong Van Ward	Đồng Văn	Dong Van	3	37
13363	tien_son	Phường Tiên Sơn	Tien Son Ward	Tiên Sơn	Tien Son	3	37
13366	ha_nam	Phường Hà Nam	Ha Nam Ward	Hà Nam	Ha Nam	3	37
13384	kim_bang	Phường Kim Bảng	Kim Bang Ward	Kim Bảng	Kim Bang	3	37
13393	le_ho	Phường Lê Hồ	Le Ho Ward	Lê Hồ	Le Ho	3	37
13396	nguyen_uy	Phường Nguyễn Úy	Nguyen Uy Ward	Nguyễn Úy	Nguyen Uy	3	37
13402	kim_thanh	Phường Kim Thanh	Kim Thanh Ward	Kim Thanh	Kim Thanh	3	37
13420	tam_chuc	Phường Tam Chúc	Tam Chuc Ward	Tam Chúc	Tam Chuc	3	37
13435	ly_thuong_kiet	Phường Lý Thường Kiệt	Ly Thuong Kiet Ward	Lý Thường Kiệt	Ly Thuong Kiet	3	37
13444	liem_tuyen	Phường Liêm Tuyền	Liem Tuyen Ward	Liêm Tuyền	Liem Tuyen	3	37
13669	nam_dinh	Phường Nam Định	Nam Dinh Ward	Nam Định	Nam Dinh	3	37
13684	thien_truong	Phường Thiên Trường	Thien Truong Ward	Thiên Trường	Thien Truong	3	37
13693	dong_a	Phường Đông A	Dong A Ward	Đông A	Dong A	3	37
13699	thanh_nam	Phường Thành Nam	Thanh Nam Ward	Thành Nam	Thanh Nam	3	37
13708	my_loc	Phường Mỹ Lộc	My Loc Ward	Mỹ Lộc	My Loc	3	37
13777	truong_thi	Phường Trường Thi	Truong Thi Ward	Trường Thi	Truong Thi	3	37
13972	vi_khe	Phường Vị Khê	Vi Khe Ward	Vị Khê	Vi Khe	3	37
13984	hong_quang	Phường Hồng Quang	Hong Quang Ward	Hồng Quang	Hong Quang	3	37
14329	hoa_lu	Phường Hoa Lư	Hoa Lu Ward	Hoa Lư	Hoa Lu	3	37
14359	nam_hoa_lu	Phường Nam Hoa Lư	Nam Hoa Lu Ward	Nam Hoa Lư	Nam Hoa Lu	3	37
14362	tam_diep	Phường Tam Điệp	Tam Diep Ward	Tam Điệp	Tam Diep	3	37
14365	trung_son	Phường Trung Sơn	Trung Son Ward	Trung Sơn	Trung Son	3	37
14371	yen_son	Phường Yên Sơn	Yen Son Ward	Yên Sơn	Yen Son	3	37
14533	tay_hoa_lu	Phường Tây Hoa Lư	Tay Hoa Lu Ward	Tây Hoa Lư	Tay Hoa Lu	3	37
14566	dong_hoa_lu	Phường Đông Hoa Lư	Dong Hoa Lu Ward	Đông Hoa Lư	Dong Hoa Lu	3	37
14725	yen_thang	Phường Yên Thắng	Yen Thang Ward	Yên Thắng	Yen Thang	3	37
13456	liem_ha	Xã Liêm Hà	Liem Ha Commune	Liêm Hà	Liem Ha	4	37
13474	tan_thanh	Xã Tân Thanh	Tan Thanh Commune	Tân Thanh	Tan Thanh	4	37
13483	thanh_binh	Xã Thanh Bình	Thanh Binh Commune	Thanh Bình	Thanh Binh	4	37
13489	thanh_lam	Xã Thanh Lâm	Thanh Lam Commune	Thanh Lâm	Thanh Lam	4	37
13495	thanh_liem	Xã Thanh Liêm	Thanh Liem Commune	Thanh Liêm	Thanh Liem	4	37
13501	binh_my	Xã Bình Mỹ	Binh My Commune	Bình Mỹ	Binh My	4	37
13504	binh_luc	Xã Bình Lục	Binh Luc Commune	Bình Lục	Binh Luc	4	37
13531	binh_giang	Xã Bình Giang	Binh Giang Commune	Bình Giang	Binh Giang	4	37
13540	binh_an	Xã Bình An	Binh An Commune	Bình An	Binh An	4	37
13558	binh_son	Xã Bình Sơn	Binh Son Commune	Bình Sơn	Binh Son	4	37
13573	ly_nhan	Xã Lý Nhân	Ly Nhan Commune	Lý Nhân	Ly Nhan	4	37
13579	bac_ly	Xã Bắc Lý	Bac Ly Commune	Bắc Lý	Bac Ly	4	37
13591	nam_xang	Xã Nam Xang	Nam Xang Commune	Nam Xang	Nam Xang	4	37
13594	tran_thuong	Xã Trần Thương	Tran Thuong Commune	Trần Thương	Tran Thuong	4	37
13597	vinh_tru	Xã Vĩnh Trụ	Vinh Tru Commune	Vĩnh Trụ	Vinh Tru	4	37
13609	nhan_ha	Xã Nhân Hà	Nhan Ha Commune	Nhân Hà	Nhan Ha	4	37
13627	nam_ly	Xã Nam Lý	Nam Ly Commune	Nam Lý	Nam Ly	4	37
13741	vu_ban	Xã Vụ Bản	Vu Ban Commune	Vụ Bản	Vu Ban	4	37
13750	minh_tan	Xã Minh Tân	Minh Tan Commune	Minh Tân	Minh Tan	4	37
13753	hien_khanh	Xã Hiển Khánh	Hien Khanh Commune	Hiển Khánh	Hien Khanh	4	37
13786	lien_minh	Xã Liên Minh	Lien Minh Commune	Liên Minh	Lien Minh	4	37
13795	y_yen	Xã Ý Yên	Y Yen Commune	Ý Yên	Y Yen	4	37
13807	tan_minh	Xã Tân Minh	Tan Minh Commune	Tân Minh	Tan Minh	4	37
13822	phong_doanh	Xã Phong Doanh	Phong Doanh Commune	Phong Doanh	Phong Doanh	4	37
13834	vu_duong	Xã Vũ Dương	Vu Duong Commune	Vũ Dương	Vu Duong	4	37
13864	van_thang	Xã Vạn Thắng	Van Thang Commune	Vạn Thắng	Van Thang	4	37
13870	yen_cuong	Xã Yên Cường	Yen Cuong Commune	Yên Cường	Yen Cuong	4	37
13879	yen_dong	Xã Yên Đồng	Yen Dong Commune	Yên Đồng	Yen Dong	4	37
13891	nghia_hung	Xã Nghĩa Hưng	Nghia Hung Commune	Nghĩa Hưng	Nghia Hung	4	37
13894	rang_dong	Xã Rạng Đông	Rang Dong Commune	Rạng Đông	Rang Dong	4	37
13900	dong_thinh	Xã Đồng Thịnh	Dong Thinh Commune	Đồng Thịnh	Dong Thinh	4	37
13918	nghia_son	Xã Nghĩa Sơn	Nghia Son Commune	Nghĩa Sơn	Nghia Son	4	37
13927	hong_phong	Xã Hồng Phong	Hong Phong Commune	Hồng Phong	Hong Phong	4	37
13939	quy_nhat	Xã Quỹ Nhất	Quy Nhat Commune	Quỹ Nhất	Quy Nhat	4	37
13957	nghia_lam	Xã Nghĩa Lâm	Nghia Lam Commune	Nghĩa Lâm	Nghia Lam	4	37
13966	nam_truc	Xã Nam Trực	Nam Truc Commune	Nam Trực	Nam Truc	4	37
13987	nam_hong	Xã Nam Hồng	Nam Hong Commune	Nam Hồng	Nam Hong	4	37
14005	nam_ninh	Xã Nam Ninh	Nam Ninh Commune	Nam Ninh	Nam Ninh	4	37
14011	nam_minh	Xã Nam Minh	Nam Minh Commune	Nam Minh	Nam Minh	4	37
14014	nam_dong	Xã Nam Đồng	Nam Dong Commune	Nam Đồng	Nam Dong	4	37
14026	co_le	Xã Cổ Lễ	Co Le Commune	Cổ Lễ	Co Le	4	37
14038	ninh_giang	Xã Ninh Giang	Ninh Giang Commune	Ninh Giang	Ninh Giang	4	37
14053	truc_ninh	Xã Trực Ninh	Truc Ninh Commune	Trực Ninh	Truc Ninh	4	37
14056	cat_thanh	Xã Cát Thành	Cat Thanh Commune	Cát Thành	Cat Thanh	4	37
14062	quang_hung	Xã Quang Hưng	Quang Hung Commune	Quang Hưng	Quang Hung	4	37
14071	minh_thai	Xã Minh Thái	Minh Thai Commune	Minh Thái	Minh Thai	4	37
14077	ninh_cuong	Xã Ninh Cường	Ninh Cuong Commune	Ninh Cường	Ninh Cuong	4	37
14089	xuan_truong	Xã Xuân Trường	Xuan Truong Commune	Xuân Trường	Xuan Truong	4	37
14095	xuan_hong	Xã Xuân Hồng	Xuan Hong Commune	Xuân Hồng	Xuan Hong	4	37
14104	xuan_giang	Xã Xuân Giang	Xuan Giang Commune	Xuân Giang	Xuan Giang	4	37
14122	xuan_hung	Xã Xuân Hưng	Xuan Hung Commune	Xuân Hưng	Xuan Hung	4	37
14161	giao_minh	Xã Giao Minh	Giao Minh Commune	Giao Minh	Giao Minh	4	37
14167	giao_thuy	Xã Giao Thủy	Giao Thuy Commune	Giao Thủy	Giao Thuy	4	37
14179	giao_hung	Xã Giao Hưng	Giao Hung Commune	Giao Hưng	Giao Hung	4	37
14182	giao_hoa	Xã Giao Hòa	Giao Hoa Commune	Giao Hòa	Giao Hoa	4	37
14194	giao_binh	Xã Giao Bình	Giao Binh Commune	Giao Bình	Giao Binh	4	37
14203	giao_phuc	Xã Giao Phúc	Giao Phuc Commune	Giao Phúc	Giao Phuc	4	37
14212	giao_ninh	Xã Giao Ninh	Giao Ninh Commune	Giao Ninh	Giao Ninh	4	37
14215	hai_hau	Xã Hải Hậu	Hai Hau Commune	Hải Hậu	Hai Hau	4	37
14218	hai_tien	Xã Hải Tiến	Hai Tien Commune	Hải Tiến	Hai Tien	4	37
14221	hai_thinh	Xã Hải Thịnh	Hai Thinh Commune	Hải Thịnh	Hai Thinh	4	37
14236	hai_anh	Xã Hải Anh	Hai Anh Commune	Hải Anh	Hai Anh	4	37
14248	hai_hung	Xã Hải Hưng	Hai Hung Commune	Hải Hưng	Hai Hung	4	37
14281	hai_an	Xã Hải An	Hai An Commune	Hải An	Hai An	4	37
14287	hai_quang	Xã Hải Quang	Hai Quang Commune	Hải Quang	Hai Quang	4	37
14308	hai_xuan	Xã Hải Xuân	Hai Xuan Commune	Hải Xuân	Hai Xuan	4	37
14389	gia_lam	Xã Gia Lâm	Gia Lam Commune	Gia Lâm	Gia Lam	4	37
14401	gia_tuong	Xã Gia Tường	Gia Tuong Commune	Gia Tường	Gia Tuong	4	37
14404	cuc_phuong	Xã Cúc Phương	Cuc Phuong Commune	Cúc Phương	Cuc Phuong	4	37
14407	phu_son	Xã Phú Sơn	Phu Son Commune	Phú Sơn	Phu Son	4	37
14428	nho_quan	Xã Nho Quan	Nho Quan Commune	Nho Quan	Nho Quan	4	37
14434	thanh_son	Xã Thanh Sơn	Thanh Son Commune	Thanh Sơn	Thanh Son	4	37
14452	quynh_luu	Xã Quỳnh Lưu	Quynh Luu Commune	Quỳnh Lưu	Quynh Luu	4	37
14458	phu_long	Xã Phú Long	Phu Long Commune	Phú Long	Phu Long	4	37
14464	gia_vien	Xã Gia Viễn	Gia Vien Commune	Gia Viễn	Gia Vien	4	37
14482	gia_hung	Xã Gia Hưng	Gia Hung Commune	Gia Hưng	Gia Hung	4	37
14488	gia_van	Xã Gia Vân	Gia Van Commune	Gia Vân	Gia Van	4	37
14494	gia_tran	Xã Gia Trấn	Gia Tran Commune	Gia Trấn	Gia Tran	4	37
14500	dai_hoang	Xã Đại Hoàng	Dai Hoang Commune	Đại Hoàng	Dai Hoang	4	37
14524	gia_phong	Xã Gia Phong	Gia Phong Commune	Gia Phong	Gia Phong	4	37
14560	yen_khanh	Xã Yên Khánh	Yen Khanh Commune	Yên Khánh	Yen Khanh	4	37
14563	khanh_thien	Xã Khánh Thiện	Khanh Thien Commune	Khánh Thiện	Khanh Thien	4	37
14608	khanh_trung	Xã Khánh Trung	Khanh Trung Commune	Khánh Trung	Khanh Trung	4	37
14611	khanh_nhac	Xã Khánh Nhạc	Khanh Nhac Commune	Khánh Nhạc	Khanh Nhac	4	37
14614	khanh_hoi	Xã Khánh Hội	Khanh Hoi Commune	Khánh Hội	Khanh Hoi	4	37
14620	phat_diem	Xã Phát Diệm	Phat Diem Commune	Phát Diệm	Phat Diem	4	37
14623	binh_minh	Xã Bình Minh	Binh Minh Commune	Bình Minh	Binh Minh	4	37
14638	kim_son	Xã Kim Sơn	Kim Son Commune	Kim Sơn	Kim Son	4	37
14647	quang_thien	Xã Quang Thiện	Quang Thien Commune	Quang Thiện	Quang Thien	4	37
14653	chat_binh	Xã Chất Bình	Chat Binh Commune	Chất Bình	Chat Binh	4	37
14674	lai_thanh	Xã Lai Thành	Lai Thanh Commune	Lai Thành	Lai Thanh	4	37
14677	dinh_hoa	Xã Định Hóa	Dinh Hoa Commune	Định Hóa	Dinh Hoa	4	37
14698	kim_dong	Xã Kim Đông	Kim Dong Commune	Kim Đông	Kim Dong	4	37
14701	yen_mo	Xã Yên Mô	Yen Mo Commune	Yên Mô	Yen Mo	4	37
14728	yen_tu	Xã Yên Từ	Yen Tu Commune	Yên Từ	Yen Tu	4	37
14743	yen_mac	Xã Yên Mạc	Yen Mac Commune	Yên Mạc	Yen Mac	4	37
14746	dong_thai	Xã Đồng Thái	Dong Thai Commune	Đồng Thái	Dong Thai	4	37
14758	ham_rong	Phường Hàm Rồng	Ham Rong Ward	Hàm Rồng	Ham Rong	3	38
14797	hac_thanh	Phường Hạc Thành	Hac Thanh Ward	Hạc Thành	Hac Thanh	3	38
14812	bim_son	Phường Bỉm Sơn	Bim Son Ward	Bỉm Sơn	Bim Son	3	38
14818	quang_trung	Phường Quang Trung	Quang Trung Ward	Quang Trung	Quang Trung	3	38
15853	dong_tien	Phường Đông Tiến	Dong Tien Ward	Đông Tiến	Dong Tien	3	38
15925	nguyet_vien	Phường Nguyệt Viên	Nguyet Vien Ward	Nguyệt Viên	Nguyet Vien	3	38
16378	dong_son	Phường Đông Sơn	Dong Son Ward	Đông Sơn	Dong Son	3	38
16417	dong_quang	Phường Đông Quang	Dong Quang Ward	Đông Quang	Dong Quang	3	38
16516	nam_sam_son	Phường Nam Sầm Sơn	Nam Sam Son Ward	Nam Sầm Sơn	Nam Sam Son	3	38
16522	quang_phu	Phường Quảng Phú	Quang Phu Ward	Quảng Phú	Quang Phu	3	38
16531	sam_son	Phường Sầm Sơn	Sam Son Ward	Sầm Sơn	Sam Son	3	38
16561	tinh_gia	Phường Tĩnh Gia	Tinh Gia Ward	Tĩnh Gia	Tinh Gia	3	38
16576	ngoc_son	Phường Ngọc Sơn	Ngoc Son Ward	Ngọc Sơn	Ngoc Son	3	38
16594	tan_dan	Phường Tân Dân	Tan Dan Ward	Tân Dân	Tan Dan	3	38
16597	hai_linh	Phường Hải Lĩnh	Hai Linh Ward	Hải Lĩnh	Hai Linh	3	38
16609	dao_duy_tu	Phường Đào Duy Từ	Dao Duy Tu Ward	Đào Duy Từ	Dao Duy Tu	3	38
16624	truc_lam	Phường Trúc Lâm	Truc Lam Ward	Trúc Lâm	Truc Lam	3	38
16645	hai_binh	Phường Hải Bình	Hai Binh Ward	Hải Bình	Hai Binh	3	38
16654	nghi_son	Phường Nghi Sơn	Nghi Son Ward	Nghi Sơn	Nghi Son	3	38
14845	muong_lat	Xã Mường Lát	Muong Lat Commune	Mường Lát	Muong Lat	4	38
14848	tam_chung	Xã Tam Chung	Tam Chung Commune	Tam Chung	Tam Chung	4	38
14854	muong_ly	Xã Mường Lý	Muong Ly Commune	Mường Lý	Muong Ly	4	38
14857	trung_ly	Xã Trung Lý	Trung Ly Commune	Trung Lý	Trung Ly	4	38
14860	quang_chieu	Xã Quang Chiểu	Quang Chieu Commune	Quang Chiểu	Quang Chieu	4	38
14863	pu_nhi	Xã Pù Nhi	Pu Nhi Commune	Pù Nhi	Pu Nhi	4	38
14864	nhi_son	Xã Nhi Sơn	Nhi Son Commune	Nhi Sơn	Nhi Son	4	38
14866	muong_chanh	Xã Mường Chanh	Muong Chanh Commune	Mường Chanh	Muong Chanh	4	38
14869	hoi_xuan	Xã Hồi Xuân	Hoi Xuan Commune	Hồi Xuân	Hoi Xuan	4	38
14872	trung_thanh	Xã Trung Thành	Trung Thanh Commune	Trung Thành	Trung Thanh	4	38
14875	trung_son	Xã Trung Sơn	Trung Son Commune	Trung Sơn	Trung Son	4	38
14878	phu_le	Xã Phú Lệ	Phu Le Commune	Phú Lệ	Phu Le	4	38
14890	phu_xuan	Xã Phú Xuân	Phu Xuan Commune	Phú Xuân	Phu Xuan	4	38
14896	hien_kiet	Xã Hiền Kiệt	Hien Kiet Commune	Hiền Kiệt	Hien Kiet	4	38
14902	nam_xuan	Xã Nam Xuân	Nam Xuan Commune	Nam Xuân	Nam Xuan	4	38
14908	thien_phu	Xã Thiên Phủ	Thien Phu Commune	Thiên Phủ	Thien Phu	4	38
14923	ba_thuoc	Xã Bá Thước	Ba Thuoc Commune	Bá Thước	Ba Thuoc	4	38
14932	dien_quang	Xã Điền Quang	Dien Quang Commune	Điền Quang	Dien Quang	4	38
14950	dien_lu	Xã Điền Lư	Dien Lu Commune	Điền Lư	Dien Lu	4	38
14953	quy_luong	Xã Quý Lương	Quy Luong Commune	Quý Lương	Quy Luong	4	38
14956	pu_luong	Xã Pù Luông	Pu Luong Commune	Pù Luông	Pu Luong	4	38
14959	co_lung	Xã Cổ Lũng	Co Lung Commune	Cổ Lũng	Co Lung	4	38
14974	van_nho	Xã Văn Nho	Van Nho Commune	Văn Nho	Van Nho	4	38
14980	thiet_ong	Xã Thiết Ống	Thiet Ong Commune	Thiết Ống	Thiet Ong	4	38
15001	trung_ha	Xã Trung Hạ	Trung Ha Commune	Trung Hạ	Trung Ha	4	38
15007	tam_thanh	Xã Tam Thanh	Tam Thanh Commune	Tam Thanh	Tam Thanh	4	38
15010	son_thuy	Xã Sơn Thủy	Son Thuy Commune	Sơn Thủy	Son Thuy	4	38
15013	na_meo	Xã Na Mèo	Na Meo Commune	Na Mèo	Na Meo	4	38
15016	quan_son	Xã Quan Sơn	Quan Son Commune	Quan Sơn	Quan Son	4	38
15019	tam_lu	Xã Tam Lư	Tam Lu Commune	Tam Lư	Tam Lu	4	38
15022	son_dien	Xã Sơn Điện	Son Dien Commune	Sơn Điện	Son Dien	4	38
15025	muong_min	Xã Mường Mìn	Muong Min Commune	Mường Mìn	Muong Min	4	38
15031	yen_khuong	Xã Yên Khương	Yen Khuong Commune	Yên Khương	Yen Khuong	4	38
15034	yen_thang	Xã Yên Thắng	Yen Thang Commune	Yên Thắng	Yen Thang	4	38
15043	giao_an	Xã Giao An	Giao An Commune	Giao An	Giao An	4	38
15049	van_phu	Xã Văn Phú	Van Phu Commune	Văn Phú	Van Phu	4	38
15055	linh_son	Xã Linh Sơn	Linh Son Commune	Linh Sơn	Linh Son	4	38
15058	dong_luong	Xã Đồng Lương	Dong Luong Commune	Đồng Lương	Dong Luong	4	38
15061	ngoc_lac	Xã Ngọc Lặc	Ngoc Lac Commune	Ngọc Lặc	Ngoc Lac	4	38
15085	thach_lap	Xã Thạch Lập	Thach Lap Commune	Thạch Lập	Thach Lap	4	38
15091	ngoc_lien	Xã Ngọc Liên	Ngoc Lien Commune	Ngọc Liên	Ngoc Lien	4	38
15106	nguyet_an	Xã Nguyệt Ấn	Nguyet An Commune	Nguyệt Ấn	Nguyet An	4	38
15112	kien_tho	Xã Kiên Thọ	Kien Tho Commune	Kiên Thọ	Kien Tho	4	38
15124	minh_son	Xã Minh Sơn	Minh Son Commune	Minh Sơn	Minh Son	4	38
15127	cam_thuy	Xã Cẩm Thủy	Cam Thuy Commune	Cẩm Thủy	Cam Thuy	4	38
15142	cam_thach	Xã Cẩm Thạch	Cam Thach Commune	Cẩm Thạch	Cam Thach	4	38
15148	cam_tu	Xã Cẩm Tú	Cam Tu Commune	Cẩm Tú	Cam Tu	4	38
15163	cam_van	Xã Cẩm Vân	Cam Van Commune	Cẩm Vân	Cam Van	4	38
15178	cam_tan	Xã Cẩm Tân	Cam Tan Commune	Cẩm Tân	Cam Tan	4	38
15187	kim_tan	Xã Kim Tân	Kim Tan Commune	Kim Tân	Kim Tan	4	38
15190	van_du	Xã Vân Du	Van Du Commune	Vân Du	Van Du	4	38
15199	thach_quang	Xã Thạch Quảng	Thach Quang Commune	Thạch Quảng	Thach Quang	4	38
15211	thach_binh	Xã Thạch Bình	Thach Binh Commune	Thạch Bình	Thach Binh	4	38
15229	thanh_vinh	Xã Thành Vinh	Thanh Vinh Commune	Thành Vinh	Thanh Vinh	4	38
15250	ngoc_trao	Xã Ngọc Trạo	Ngoc Trao Commune	Ngọc Trạo	Ngoc Trao	4	38
15271	ha_trung	Xã Hà Trung	Ha Trung Commune	Hà Trung	Ha Trung	4	38
15274	ha_long	Xã Hà Long	Ha Long Commune	Hà Long	Ha Long	4	38
15286	hoat_giang	Xã Hoạt Giang	Hoat Giang Commune	Hoạt Giang	Hoat Giang	4	38
15298	linh_toai	Xã Lĩnh Toại	Linh Toai Commune	Lĩnh Toại	Linh Toai	4	38
15316	tong_son	Xã Tống Sơn	Tong Son Commune	Tống Sơn	Tong Son	4	38
15349	vinh_loc	Xã Vĩnh Lộc	Vinh Loc Commune	Vĩnh Lộc	Vinh Loc	4	38
15361	tay_do	Xã Tây Đô	Tay Do Commune	Tây Đô	Tay Do	4	38
15382	bien_thuong	Xã Biện Thượng	Bien Thuong Commune	Biện Thượng	Bien Thuong	4	38
15409	yen_phu	Xã Yên Phú	Yen Phu Commune	Yên Phú	Yen Phu	4	38
15412	quy_loc	Xã Quý Lộc	Quy Loc Commune	Quý Lộc	Quy Loc	4	38
15421	yen_truong	Xã Yên Trường	Yen Truong Commune	Yên Trường	Yen Truong	4	38
15442	yen_ninh	Xã Yên Ninh	Yen Ninh Commune	Yên Ninh	Yen Ninh	4	38
15448	dinh_hoa	Xã Định Hòa	Dinh Hoa Commune	Định Hòa	Dinh Hoa	4	38
15457	dinh_tan	Xã Định Tân	Dinh Tan Commune	Định Tân	Dinh Tan	4	38
15469	yen_dinh	Xã Yên Định	Yen Dinh Commune	Yên Định	Yen Dinh	4	38
15499	tho_xuan	Xã Thọ Xuân	Tho Xuan Commune	Thọ Xuân	Tho Xuan	4	38
15505	tho_long	Xã Thọ Long	Tho Long Commune	Thọ Long	Tho Long	4	38
15520	xuan_hoa	Xã Xuân Hòa	Xuan Hoa Commune	Xuân Hòa	Xuan Hoa	4	38
15544	lam_son	Xã Lam Sơn	Lam Son Commune	Lam Sơn	Lam Son	4	38
15553	sao_vang	Xã Sao Vàng	Sao Vang Commune	Sao Vàng	Sao Vang	4	38
15568	tho_lap	Xã Thọ Lập	Tho Lap Commune	Thọ Lập	Tho Lap	4	38
15574	xuan_tin	Xã Xuân Tín	Xuan Tin Commune	Xuân Tín	Xuan Tin	4	38
15592	xuan_lap	Xã Xuân Lập	Xuan Lap Commune	Xuân Lập	Xuan Lap	4	38
15607	bat_mot	Xã Bát Mọt	Bat Mot Commune	Bát Mọt	Bat Mot	4	38
15610	yen_nhan	Xã Yên Nhân	Yen Nhan Commune	Yên Nhân	Yen Nhan	4	38
15622	van_xuan	Xã Vạn Xuân	Van Xuan Commune	Vạn Xuân	Van Xuan	4	38
15628	luong_son	Xã Lương Sơn	Luong Son Commune	Lương Sơn	Luong Son	4	38
15634	luan_thanh	Xã Luận Thành	Luan Thanh Commune	Luận Thành	Luan Thanh	4	38
15643	thang_loc	Xã Thắng Lộc	Thang Loc Commune	Thắng Lộc	Thang Loc	4	38
17128	tan_mai	Phường Tân Mai	Tan Mai Ward	Tân Mai	Tan Mai	3	40
15646	thuong_xuan	Xã Thường Xuân	Thuong Xuan Commune	Thường Xuân	Thuong Xuan	4	38
15658	xuan_chinh	Xã Xuân Chinh	Xuan Chinh Commune	Xuân Chinh	Xuan Chinh	4	38
15661	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	38
15664	trieu_son	Xã Triệu Sơn	Trieu Son Commune	Triệu Sơn	Trieu Son	4	38
15667	tho_binh	Xã Thọ Bình	Tho Binh Commune	Thọ Bình	Tho Binh	4	38
15682	hop_tien	Xã Hợp Tiến	Hop Tien Commune	Hợp Tiến	Hop Tien	4	38
15715	tan_ninh	Xã Tân Ninh	Tan Ninh Commune	Tân Ninh	Tan Ninh	4	38
15724	dong_tien	Xã Đồng Tiến	Dong Tien Commune	Đồng Tiến	Dong Tien	4	38
15754	tho_ngoc	Xã Thọ Ngọc	Tho Ngoc Commune	Thọ Ngọc	Tho Ngoc	4	38
15763	tho_phu	Xã Thọ Phú	Tho Phu Commune	Thọ Phú	Tho Phu	4	38
15766	an_nong	Xã An Nông	An Nong Commune	An Nông	An Nong	4	38
15772	thieu_hoa	Xã Thiệu Hóa	Thieu Hoa Commune	Thiệu Hóa	Thieu Hoa	4	38
15778	thieu_tien	Xã Thiệu Tiến	Thieu Tien Commune	Thiệu Tiến	Thieu Tien	4	38
15796	thieu_quang	Xã Thiệu Quang	Thieu Quang Commune	Thiệu Quang	Thieu Quang	4	38
15820	thieu_toan	Xã Thiệu Toán	Thieu Toan Commune	Thiệu Toán	Thieu Toan	4	38
15835	thieu_trung	Xã Thiệu Trung	Thieu Trung Commune	Thiệu Trung	Thieu Trung	4	38
15865	hoang_hoa	Xã Hoằng Hóa	Hoang Hoa Commune	Hoằng Hóa	Hoang Hoa	4	38
15880	hoang_giang	Xã Hoằng Giang	Hoang Giang Commune	Hoằng Giang	Hoang Giang	4	38
15889	hoang_phu	Xã Hoằng Phú	Hoang Phu Commune	Hoằng Phú	Hoang Phu	4	38
15910	hoang_son	Xã Hoằng Sơn	Hoang Son Commune	Hoằng Sơn	Hoang Son	4	38
15961	hoang_loc	Xã Hoằng Lộc	Hoang Loc Commune	Hoằng Lộc	Hoang Loc	4	38
15976	hoang_chau	Xã Hoằng Châu	Hoang Chau Commune	Hoằng Châu	Hoang Chau	4	38
15991	hoang_tien	Xã Hoằng Tiến	Hoang Tien Commune	Hoằng Tiến	Hoang Tien	4	38
16000	hoang_thanh	Xã Hoằng Thanh	Hoang Thanh Commune	Hoằng Thanh	Hoang Thanh	4	38
16012	hau_loc	Xã Hậu Lộc	Hau Loc Commune	Hậu Lộc	Hau Loc	4	38
16021	trieu_loc	Xã Triệu Lộc	Trieu Loc Commune	Triệu Lộc	Trieu Loc	4	38
16033	dong_thanh	Xã Đông Thành	Dong Thanh Commune	Đông Thành	Dong Thanh	4	38
16072	hoa_loc	Xã Hoa Lộc	Hoa Loc Commune	Hoa Lộc	Hoa Loc	4	38
16078	van_loc	Xã Vạn Lộc	Van Loc Commune	Vạn Lộc	Van Loc	4	38
16093	nga_son	Xã Nga Sơn	Nga Son Commune	Nga Sơn	Nga Son	4	38
16108	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	38
16114	nga_thang	Xã Nga Thắng	Nga Thang Commune	Nga Thắng	Nga Thang	4	38
16138	ho_vuong	Xã Hồ Vương	Ho Vuong Commune	Hồ Vương	Ho Vuong	4	38
16144	nga_an	Xã Nga An	Nga An Commune	Nga An	Nga An	4	38
16171	ba_dinh	Xã Ba Đình	Ba Dinh Commune	Ba Đình	Ba Dinh	4	38
16174	nhu_xuan	Xã Như Xuân	Nhu Xuan Commune	Như Xuân	Nhu Xuan	4	38
16177	xuan_binh	Xã Xuân Bình	Xuan Binh Commune	Xuân Bình	Xuan Binh	4	38
16186	hoa_quy	Xã Hóa Quỳ	Hoa Quy Commune	Hóa Quỳ	Hoa Quy	4	38
16213	thanh_phong	Xã Thanh Phong	Thanh Phong Commune	Thanh Phong	Thanh Phong	4	38
16222	thanh_quan	Xã Thanh Quân	Thanh Quan Commune	Thanh Quân	Thanh Quan	4	38
16225	thuong_ninh	Xã Thượng Ninh	Thuong Ninh Commune	Thượng Ninh	Thuong Ninh	4	38
16228	nhu_thanh	Xã Như Thanh	Nhu Thanh Commune	Như Thanh	Nhu Thanh	4	38
16234	xuan_du	Xã Xuân Du	Xuan Du Commune	Xuân Du	Xuan Du	4	38
16249	mau_lam	Xã Mậu Lâm	Mau Lam Commune	Mậu Lâm	Mau Lam	4	38
16258	xuan_thai	Xã Xuân Thái	Xuan Thai Commune	Xuân Thái	Xuan Thai	4	38
16264	yen_tho	Xã Yên Thọ	Yen Tho Commune	Yên Thọ	Yen Tho	4	38
16273	thanh_ky	Xã Thanh Kỳ	Thanh Ky Commune	Thanh Kỳ	Thanh Ky	4	38
16279	nong_cong	Xã Nông Cống	Nong Cong Commune	Nông Cống	Nong Cong	4	38
16297	trung_chinh	Xã Trung Chính	Trung Chinh Commune	Trung Chính	Trung Chinh	4	38
16309	thang_loi	Xã Thắng Lợi	Thang Loi Commune	Thắng Lợi	Thang Loi	4	38
16342	thang_binh	Xã Thăng Bình	Thang Binh Commune	Thăng Bình	Thang Binh	4	38
16348	truong_van	Xã Trường Văn	Truong Van Commune	Trường Văn	Truong Van	4	38
16363	tuong_linh	Xã Tượng Lĩnh	Tuong Linh Commune	Tượng Lĩnh	Tuong Linh	4	38
16369	cong_chinh	Xã Công Chính	Cong Chinh Commune	Công Chính	Cong Chinh	4	38
16438	luu_ve	Xã Lưu Vệ	Luu Ve Commune	Lưu Vệ	Luu Ve	4	38
16480	quang_yen	Xã Quảng Yên	Quang Yen Commune	Quảng Yên	Quang Yen	4	38
16489	quang_chinh	Xã Quảng Chính	Quang Chinh Commune	Quảng Chính	Quang Chinh	4	38
16498	quang_ngoc	Xã Quảng Ngọc	Quang Ngoc Commune	Quảng Ngọc	Quang Ngoc	4	38
16540	quang_ninh	Xã Quảng Ninh	Quang Ninh Commune	Quảng Ninh	Quang Ninh	4	38
16543	quang_binh	Xã Quảng Bình	Quang Binh Commune	Quảng Bình	Quang Binh	4	38
16549	tien_trang	Xã Tiên Trang	Tien Trang Commune	Tiên Trang	Tien Trang	4	38
16591	cac_son	Xã Các Sơn	Cac Son Commune	Các Sơn	Cac Son	4	38
16636	truong_lam	Xã Trường Lâm	Truong Lam Commune	Trường Lâm	Truong Lam	4	38
16681	thanh_vinh	Phường Thành Vinh	Thanh Vinh Ward	Thành Vinh	Thanh Vinh	3	40
16690	truong_vinh	Phường Trường Vinh	Truong Vinh Ward	Trường Vinh	Truong Vinh	3	40
16702	vinh_phu	Phường Vinh Phú	Vinh Phu Ward	Vinh Phú	Vinh Phu	3	40
16708	vinh_loc	Phường Vinh Lộc	Vinh Loc Ward	Vinh Lộc	Vinh Loc	3	40
16732	cua_lo	Phường Cửa Lò	Cua Lo Ward	Cửa Lò	Cua Lo	3	40
16939	thai_hoa	Phường Thái Hòa	Thai Hoa Ward	Thái Hòa	Thai Hoa	3	40
17011	tay_hieu	Phường Tây Hiếu	Tay Hieu Ward	Tây Hiếu	Tay Hieu	3	40
17110	hoang_mai	Phường Hoàng Mai	Hoang Mai Ward	Hoàng Mai	Hoang Mai	3	40
17125	quynh_mai	Phường Quỳnh Mai	Quynh Mai Ward	Quỳnh Mai	Quynh Mai	3	40
17920	vinh_hung	Phường Vinh Hưng	Vinh Hung Ward	Vinh Hưng	Vinh Hung	3	40
16738	que_phong	Xã Quế Phong	Que Phong Commune	Quế Phong	Que Phong	4	40
16744	thong_thu	Xã Thông Thụ	Thong Thu Commune	Thông Thụ	Thong Thu	4	40
16750	tien_phong	Xã Tiền Phong	Tien Phong Commune	Tiền Phong	Tien Phong	4	40
16756	tri_le	Xã Tri Lễ	Tri Le Commune	Tri Lễ	Tri Le	4	40
16774	muong_quang	Xã Mường Quàng	Muong Quang Commune	Mường Quàng	Muong Quang	4	40
16777	quy_chau	Xã Quỳ Châu	Quy Chau Commune	Quỳ Châu	Quy Chau	4	40
16792	chau_tien	Xã Châu Tiến	Chau Tien Commune	Châu Tiến	Chau Tien	4	40
16801	hung_chan	Xã Hùng Chân	Hung Chan Commune	Hùng Chân	Hung Chan	4	40
16804	chau_binh	Xã Châu Bình	Chau Binh Commune	Châu Bình	Chau Binh	4	40
16813	muong_xen	Xã Mường Xén	Muong Xen Commune	Mường Xén	Muong Xen	4	40
16816	my_ly	Xã Mỹ Lý	My Ly Commune	Mỹ Lý	My Ly	4	40
16819	bac_ly	Xã Bắc Lý	Bac Ly Commune	Bắc Lý	Bac Ly	4	40
16822	keng_du	Xã Keng Đu	Keng Du Commune	Keng Đu	Keng Du	4	40
16828	huoi_tu	Xã Huồi Tụ	Huoi Tu Commune	Huồi Tụ	Huoi Tu	4	40
16831	muong_long	Xã Mường Lống	Muong Long Commune	Mường Lống	Muong Long	4	40
16834	na_loi	Xã Na Loi	Na Loi Commune	Na Loi	Na Loi	4	40
16837	nam_can	Xã Nậm Cắn	Nam Can Commune	Nậm Cắn	Nam Can	4	40
16849	huu_kiem	Xã Hữu Kiệm	Huu Kiem Commune	Hữu Kiệm	Huu Kiem	4	40
16855	chieu_luu	Xã Chiêu Lưu	Chieu Luu Commune	Chiêu Lưu	Chieu Luu	4	40
16858	muong_tip	Xã Mường Típ	Muong Tip Commune	Mường Típ	Muong Tip	4	40
16870	na_ngoi	Xã Na Ngoi	Na Ngoi Commune	Na Ngoi	Na Ngoi	4	40
16876	tuong_duong	Xã Tương Dương	Tuong Duong Commune	Tương Dương	Tuong Duong	4	40
16882	nhon_mai	Xã Nhôn Mai	Nhon Mai Commune	Nhôn Mai	Nhon Mai	4	40
16885	huu_khuong	Xã Hữu Khuông	Huu Khuong Commune	Hữu Khuông	Huu Khuong	4	40
16903	nga_my	Xã Nga My	Nga My Commune	Nga My	Nga My	4	40
16906	luong_minh	Xã Lượng Minh	Luong Minh Commune	Lượng Minh	Luong Minh	4	40
16909	yen_hoa	Xã Yên Hòa	Yen Hoa Commune	Yên Hòa	Yen Hoa	4	40
16912	yen_na	Xã Yên Na	Yen Na Commune	Yên Na	Yen Na	4	40
16933	tam_quang	Xã Tam Quang	Tam Quang Commune	Tam Quang	Tam Quang	4	40
16936	tam_thai	Xã Tam Thái	Tam Thai Commune	Tam Thái	Tam Thai	4	40
16941	nghia_dan	Xã Nghĩa Đàn	Nghia Dan Commune	Nghĩa Đàn	Nghia Dan	4	40
16951	nghia_lam	Xã Nghĩa Lâm	Nghia Lam Commune	Nghĩa Lâm	Nghia Lam	4	40
16969	nghia_tho	Xã Nghĩa Thọ	Nghia Tho Commune	Nghĩa Thọ	Nghia Tho	4	40
16972	nghia_hung	Xã Nghĩa Hưng	Nghia Hung Commune	Nghĩa Hưng	Nghia Hung	4	40
16975	nghia_mai	Xã Nghĩa Mai	Nghia Mai Commune	Nghĩa Mai	Nghia Mai	4	40
17017	dong_hieu	Xã Đông Hiếu	Dong Hieu Commune	Đông Hiếu	Dong Hieu	4	40
17029	nghia_loc	Xã Nghĩa Lộc	Nghia Loc Commune	Nghĩa Lộc	Nghia Loc	4	40
17032	nghia_khanh	Xã Nghĩa Khánh	Nghia Khanh Commune	Nghĩa Khánh	Nghia Khanh	4	40
17035	quy_hop	Xã Quỳ Hợp	Quy Hop Commune	Quỳ Hợp	Quy Hop	4	40
17044	chau_hong	Xã Châu Hồng	Chau Hong Commune	Châu Hồng	Chau Hong	4	40
17056	chau_loc	Xã Châu Lộc	Chau Loc Commune	Châu Lộc	Chau Loc	4	40
17059	tam_hop	Xã Tam Hợp	Tam Hop Commune	Tam Hợp	Tam Hop	4	40
17071	minh_hop	Xã Minh Hợp	Minh Hop Commune	Minh Hợp	Minh Hop	4	40
17077	muong_ham	Xã Mường Ham	Muong Ham Commune	Mường Ham	Muong Ham	4	40
17089	muong_chong	Xã Mường Chọng	Muong Chong Commune	Mường Chọng	Muong Chong	4	40
17143	quynh_van	Xã Quỳnh Văn	Quynh Van Commune	Quỳnh Văn	Quynh Van	4	40
17149	quynh_tam	Xã Quỳnh Tam	Quynh Tam Commune	Quỳnh Tam	Quynh Tam	4	40
17170	quynh_son	Xã Quỳnh Sơn	Quynh Son Commune	Quỳnh Sơn	Quynh Son	4	40
17176	quynh_anh	Xã Quỳnh Anh	Quynh Anh Commune	Quỳnh Anh	Quynh Anh	4	40
17179	quynh_luu	Xã Quỳnh Lưu	Quynh Luu Commune	Quỳnh Lưu	Quynh Luu	4	40
17212	quynh_phu	Xã Quỳnh Phú	Quynh Phu Commune	Quỳnh Phú	Quynh Phu	4	40
17224	quynh_thang	Xã Quỳnh Thắng	Quynh Thang Commune	Quỳnh Thắng	Quynh Thang	4	40
17230	binh_chuan	Xã Bình Chuẩn	Binh Chuan Commune	Bình Chuẩn	Binh Chuan	4	40
17239	mau_thach	Xã Mậu Thạch	Mau Thach Commune	Mậu Thạch	Mau Thach	4	40
17242	cam_phuc	Xã Cam Phục	Cam Phuc Commune	Cam Phục	Cam Phuc	4	40
17248	chau_khe	Xã Châu Khê	Chau Khe Commune	Châu Khê	Chau Khe	4	40
17254	con_cuong	Xã Con Cuông	Con Cuong Commune	Con Cuông	Con Cuong	4	40
17263	mon_son	Xã Môn Sơn	Mon Son Commune	Môn Sơn	Mon Son	4	40
17266	tan_ky	Xã Tân Kỳ	Tan Ky Commune	Tân Kỳ	Tan Ky	4	40
17272	tan_phu	Xã Tân Phú	Tan Phu Commune	Tân Phú	Tan Phu	4	40
17278	giai_xuan	Xã Giai Xuân	Giai Xuan Commune	Giai Xuân	Giai Xuan	4	40
17284	nghia_dong	Xã Nghĩa Đồng	Nghia Dong Commune	Nghĩa Đồng	Nghia Dong	4	40
17287	tien_dong	Xã Tiên Đồng	Tien Dong Commune	Tiên Đồng	Tien Dong	4	40
17305	tan_an	Xã Tân An	Tan An Commune	Tân An	Tan An	4	40
17326	nghia_hanh	Xã Nghĩa Hành	Nghia Hanh Commune	Nghĩa Hành	Nghia Hanh	4	40
17329	anh_son	Xã Anh Sơn	Anh Son Commune	Anh Sơn	Anh Son	4	40
17335	thanh_binh_tho	Xã Thành Bình Thọ	Thanh Binh Tho Commune	Thành Bình Thọ	Thanh Binh Tho	4	40
17344	nhan_hoa	Xã Nhân Hòa	Nhan Hoa Commune	Nhân Hòa	Nhan Hoa	4	40
17357	vinh_tuong	Xã Vĩnh Tường	Vinh Tuong Commune	Vĩnh Tường	Vinh Tuong	4	40
17365	anh_son_dong	Xã Anh Sơn Đông	Anh Son Dong Commune	Anh Sơn Đông	Anh Son Dong	4	40
17380	yen_xuan	Xã Yên Xuân	Yen Xuan Commune	Yên Xuân	Yen Xuan	4	40
17395	hung_chau	Xã Hùng Châu	Hung Chau Commune	Hùng Châu	Hung Chau	4	40
17416	duc_chau	Xã Đức Châu	Duc Chau Commune	Đức Châu	Duc Chau	4	40
17419	hai_chau	Xã Hải Châu	Hai Chau Commune	Hải Châu	Hai Chau	4	40
17443	quang_chau	Xã Quảng Châu	Quang Chau Commune	Quảng Châu	Quang Chau	4	40
17464	dien_chau	Xã Diễn Châu	Dien Chau Commune	Diễn Châu	Dien Chau	4	40
17476	minh_chau	Xã Minh Châu	Minh Chau Commune	Minh Châu	Minh Chau	4	40
17479	an_chau	Xã An Châu	An Chau Commune	An Châu	An Chau	4	40
17488	tan_chau	Xã Tân Châu	Tan Chau Commune	Tân Châu	Tan Chau	4	40
17506	yen_thanh	Xã Yên Thành	Yen Thanh Commune	Yên Thành	Yen Thanh	4	40
17515	binh_minh	Xã Bình Minh	Binh Minh Commune	Bình Minh	Binh Minh	4	40
17521	quang_dong	Xã Quang Đồng	Quang Dong Commune	Quang Đồng	Quang Dong	4	40
17524	giai_lac	Xã Giai Lạc	Giai Lac Commune	Giai Lạc	Giai Lac	4	40
17530	dong_thanh	Xã Đông Thành	Dong Thanh Commune	Đông Thành	Dong Thanh	4	40
17560	van_du	Xã Vân Du	Van Du Commune	Vân Du	Van Du	4	40
17569	quan_thanh	Xã Quan Thành	Quan Thanh Commune	Quan Thành	Quan Thanh	4	40
17605	hop_minh	Xã Hợp Minh	Hop Minh Commune	Hợp Minh	Hop Minh	4	40
17611	van_tu	Xã Vân Tụ	Van Tu Commune	Vân Tụ	Van Tu	4	40
17623	bach_ngoc	Xã Bạch Ngọc	Bach Ngoc Commune	Bạch Ngọc	Bach Ngoc	4	40
17641	luong_son	Xã Lương Sơn	Luong Son Commune	Lương Sơn	Luong Son	4	40
17662	do_luong	Xã Đô Lương	Do Luong Commune	Đô Lương	Do Luong	4	40
17677	van_hien	Xã Văn Hiến	Van Hien Commune	Văn Hiến	Van Hien	4	40
17689	thuan_trung	Xã Thuần Trung	Thuan Trung Commune	Thuần Trung	Thuan Trung	4	40
17707	bach_ha	Xã Bạch Hà	Bach Ha Commune	Bạch Hà	Bach Ha	4	40
17713	dai_dong	Xã Đại Đồng	Dai Dong Commune	Đại Đồng	Dai Dong	4	40
17722	hanh_lam	Xã Hạnh Lâm	Hanh Lam Commune	Hạnh Lâm	Hanh Lam	4	40
17728	cat_ngan	Xã Cát Ngạn	Cat Ngan Commune	Cát Ngạn	Cat Ngan	4	40
17743	tam_dong	Xã Tam Đồng	Tam Dong Commune	Tam Đồng	Tam Dong	4	40
17759	son_lam	Xã Sơn Lâm	Son Lam Commune	Sơn Lâm	Son Lam	4	40
17770	hoa_quan	Xã Hoa Quân	Hoa Quan Commune	Hoa Quân	Hoa Quan	4	40
17779	xuan_lam	Xã Xuân Lâm	Xuan Lam Commune	Xuân Lâm	Xuan Lam	4	40
17791	kim_bang	Xã Kim Bảng	Kim Bang Commune	Kim Bảng	Kim Bang	4	40
17818	bich_hao	Xã Bích Hào	Bich Hao Commune	Bích Hào	Bich Hao	4	40
17827	nghi_loc	Xã Nghi Lộc	Nghi Loc Commune	Nghi Lộc	Nghi Loc	4	40
17833	hai_loc	Xã Hải Lộc	Hai Loc Commune	Hải Lộc	Hai Loc	4	40
17842	than_linh	Xã Thần Lĩnh	Than Linh Commune	Thần Lĩnh	Than Linh	4	40
17854	van_kieu	Xã Văn Kiều	Van Kieu Commune	Văn Kiều	Van Kieu	4	40
17857	phuc_loc	Xã Phúc Lộc	Phuc Loc Commune	Phúc Lộc	Phuc Loc	4	40
17866	trung_loc	Xã Trung Lộc	Trung Loc Commune	Trung Lộc	Trung Loc	4	40
17878	dong_loc	Xã Đông Lộc	Dong Loc Commune	Đông Lộc	Dong Loc	4	40
17935	nam_dan	Xã Nam Đàn	Nam Dan Commune	Nam Đàn	Nam Dan	4	40
17944	dai_hue	Xã Đại Huệ	Dai Hue Commune	Đại Huệ	Dai Hue	4	40
17950	van_an	Xã Vạn An	Van An Commune	Vạn An	Van An	4	40
17971	kim_lien	Xã Kim Liên	Kim Lien Commune	Kim Liên	Kim Lien	4	40
17989	thien_nhan	Xã Thiên Nhẫn	Thien Nhan Commune	Thiên Nhẫn	Thien Nhan	4	40
18001	hung_nguyen	Xã Hưng Nguyên	Hung Nguyen Commune	Hưng Nguyên	Hung Nguyen	4	40
18007	yen_trung	Xã Yên Trung	Yen Trung Commune	Yên Trung	Yen Trung	4	40
18028	hung_nguyen_nam	Xã Hưng Nguyên Nam	Hung Nguyen Nam Commune	Hưng Nguyên Nam	Hung Nguyen Nam	4	40
18040	lam_thanh	Xã Lam Thành	Lam Thanh Commune	Lam Thành	Lam Thanh	4	40
18073	thanh_sen	Phường Thành Sen	Thanh Sen Ward	Thành Sen	Thanh Sen	3	42
18100	tran_phu	Phường Trần Phú	Tran Phu Ward	Trần Phú	Tran Phu	3	42
18115	bac_hong_linh	Phường Bắc Hồng Lĩnh	Bac Hong Linh Ward	Bắc Hồng Lĩnh	Bac Hong Linh	3	42
18118	nam_hong_linh	Phường Nam Hồng Lĩnh	Nam Hong Linh Ward	Nam Hồng Lĩnh	Nam Hong Linh	3	42
18652	ha_huy_tap	Phường Hà Huy Tập	Ha Huy Tap Ward	Hà Huy Tập	Ha Huy Tap	3	42
18754	song_tri	Phường Sông Trí	Song Tri Ward	Sông Trí	Song Tri	3	42
18781	hai_ninh	Phường Hải Ninh	Hai Ninh Ward	Hải Ninh	Hai Ninh	3	42
18823	vung_ang	Phường Vũng Áng	Vung Ang Ward	Vũng Áng	Vung Ang	3	42
18832	hoanh_son	Phường Hoành Sơn	Hoanh Son Ward	Hoành Sơn	Hoanh Son	3	42
18133	huong_son	Xã Hương Sơn	Huong Son Commune	Hương Sơn	Huong Son	4	42
18160	son_hong	Xã Sơn Hồng	Son Hong Commune	Sơn Hồng	Son Hong	4	42
18163	son_tien	Xã Sơn Tiến	Son Tien Commune	Sơn Tiến	Son Tien	4	42
18172	son_tay	Xã Sơn Tây	Son Tay Commune	Sơn Tây	Son Tay	4	42
18184	son_giang	Xã Sơn Giang	Son Giang Commune	Sơn Giang	Son Giang	4	42
18196	son_kim_1	Xã Sơn Kim 1	Son Kim 1 Commune	Sơn Kim 1	Son Kim 1	4	42
18199	son_kim_2	Xã Sơn Kim 2	Son Kim 2 Commune	Sơn Kim 2	Son Kim 2	4	42
18202	tu_my	Xã Tứ Mỹ	Tu My Commune	Tứ Mỹ	Tu My	4	42
18223	kim_hoa	Xã Kim Hoa	Kim Hoa Commune	Kim Hoa	Kim Hoa	4	42
18229	duc_tho	Xã Đức Thọ	Duc Tho Commune	Đức Thọ	Duc Tho	4	42
18244	duc_minh	Xã Đức Minh	Duc Minh Commune	Đức Minh	Duc Minh	4	42
18262	duc_quang	Xã Đức Quang	Duc Quang Commune	Đức Quang	Duc Quang	4	42
18277	duc_thinh	Xã Đức Thịnh	Duc Thinh Commune	Đức Thịnh	Duc Thinh	4	42
18304	duc_dong	Xã Đức Đồng	Duc Dong Commune	Đức Đồng	Duc Dong	4	42
18313	vu_quang	Xã Vũ Quang	Vu Quang Commune	Vũ Quang	Vu Quang	4	42
18322	mai_hoa	Xã Mai Hoa	Mai Hoa Commune	Mai Hoa	Mai Hoa	4	42
18328	thuong_duc	Xã Thượng Đức	Thuong Duc Commune	Thượng Đức	Thuong Duc	4	42
23799	hra	Xã Hra	Hra Commune	Hra	Hra	4	52
18352	nghi_xuan	Xã Nghi Xuân	Nghi Xuan Commune	Nghi Xuân	Nghi Xuan	4	42
18364	dan_hai	Xã Đan Hải	Dan Hai Commune	Đan Hải	Dan Hai	4	42
18373	tien_dien	Xã Tiên Điền	Tien Dien Commune	Tiên Điền	Tien Dien	4	42
18394	co_dam	Xã Cổ Đạm	Co Dam Commune	Cổ Đạm	Co Dam	4	42
18406	can_loc	Xã Can Lộc	Can Loc Commune	Can Lộc	Can Loc	4	42
18409	hong_loc	Xã Hồng Lộc	Hong Loc Commune	Hồng Lộc	Hong Loc	4	42
18418	tung_loc	Xã Tùng Lộc	Tung Loc Commune	Tùng Lộc	Tung Loc	4	42
18436	truong_luu	Xã Trường Lưu	Truong Luu Commune	Trường Lưu	Truong Luu	4	42
18466	gia_hanh	Xã Gia Hanh	Gia Hanh Commune	Gia Hanh	Gia Hanh	4	42
18481	xuan_loc	Xã Xuân Lộc	Xuan Loc Commune	Xuân Lộc	Xuan Loc	4	42
18484	dong_loc	Xã Đồng Lộc	Dong Loc Commune	Đồng Lộc	Dong Loc	4	42
18496	huong_khe	Xã Hương Khê	Huong Khe Commune	Hương Khê	Huong Khe	4	42
18502	ha_linh	Xã Hà Linh	Ha Linh Commune	Hà Linh	Ha Linh	4	42
18523	huong_binh	Xã Hương Bình	Huong Binh Commune	Hương Bình	Huong Binh	4	42
18532	huong_pho	Xã Hương Phố	Huong Pho Commune	Hương Phố	Huong Pho	4	42
18544	huong_xuan	Xã Hương Xuân	Huong Xuan Commune	Hương Xuân	Huong Xuan	4	42
18547	phuc_trach	Xã Phúc Trạch	Phuc Trach Commune	Phúc Trạch	Phuc Trach	4	42
18550	huong_do	Xã Hương Đô	Huong Do Commune	Hương Đô	Huong Do	4	42
18562	thach_ha	Xã Thạch Hà	Thach Ha Commune	Thạch Hà	Thach Ha	4	42
18568	loc_ha	Xã Lộc Hà	Loc Ha Commune	Lộc Hà	Loc Ha	4	42
18583	mai_phu	Xã Mai Phụ	Mai Phu Commune	Mai Phụ	Mai Phu	4	42
18586	dong_kinh	Xã Đông Kinh	Dong Kinh Commune	Đông Kinh	Dong Kinh	4	42
18601	viet_xuyen	Xã Việt Xuyên	Viet Xuyen Commune	Việt Xuyên	Viet Xuyen	4	42
18604	thach_khe	Xã Thạch Khê	Thach Khe Commune	Thạch Khê	Thach Khe	4	42
18619	dong_tien	Xã Đồng Tiến	Dong Tien Commune	Đồng Tiến	Dong Tien	4	42
18628	thach_lac	Xã Thạch Lạc	Thach Lac Commune	Thạch Lạc	Thach Lac	4	42
18634	toan_luu	Xã Toàn Lưu	Toan Luu Commune	Toàn Lưu	Toan Luu	4	42
18667	thach_xuan	Xã Thạch Xuân	Thach Xuan Commune	Thạch Xuân	Thach Xuan	4	42
18673	cam_xuyen	Xã Cẩm Xuyên	Cam Xuyen Commune	Cẩm Xuyên	Cam Xuyen	4	42
18676	thien_cam	Xã Thiên Cầm	Thien Cam Commune	Thiên Cầm	Thien Cam	4	42
18682	yen_hoa	Xã Yên Hòa	Yen Hoa Commune	Yên Hòa	Yen Hoa	4	42
18685	cam_binh	Xã Cẩm Bình	Cam Binh Commune	Cẩm Bình	Cam Binh	4	42
18736	cam_hung	Xã Cẩm Hưng	Cam Hung Commune	Cẩm Hưng	Cam Hung	4	42
18739	cam_due	Xã Cẩm Duệ	Cam Due Commune	Cẩm Duệ	Cam Due	4	42
18742	cam_trung	Xã Cẩm Trung	Cam Trung Commune	Cẩm Trung	Cam Trung	4	42
18748	cam_lac	Xã Cẩm Lạc	Cam Lac Commune	Cẩm Lạc	Cam Lac	4	42
18766	ky_xuan	Xã Kỳ Xuân	Ky Xuan Commune	Kỳ Xuân	Ky Xuan	4	42
18775	ky_anh	Xã Kỳ Anh	Ky Anh Commune	Kỳ Anh	Ky Anh	4	42
18787	ky_van	Xã Kỳ Văn	Ky Van Commune	Kỳ Văn	Ky Van	4	42
18790	ky_khang	Xã Kỳ Khang	Ky Khang Commune	Kỳ Khang	Ky Khang	4	42
18814	ky_hoa	Xã Kỳ Hoa	Ky Hoa Commune	Kỳ Hoa	Ky Hoa	4	42
18838	ky_lac	Xã Kỳ Lạc	Ky Lac Commune	Kỳ Lạc	Ky Lac	4	42
18844	ky_thuong	Xã Kỳ Thượng	Ky Thuong Commune	Kỳ Thượng	Ky Thuong	4	42
18859	dong_thuan	Phường Đồng Thuận	Dong Thuan Ward	Đồng Thuận	Dong Thuan	3	44
18871	dong_son	Phường Đồng Sơn	Dong Son Ward	Đồng Sơn	Dong Son	3	44
18880	dong_hoi	Phường Đồng Hới	Dong Hoi Ward	Đồng Hới	Dong Hoi	3	44
19009	ba_don	Phường Ba Đồn	Ba Don Ward	Ba Đồn	Ba Don	3	44
19066	bac_gianh	Phường Bắc Gianh	Bac Gianh Ward	Bắc Gianh	Bac Gianh	3	44
19333	dong_ha	Phường Đông Hà	Dong Ha Ward	Đông Hà	Dong Ha	3	44
19351	nam_dong_ha	Phường Nam Đông Hà	Nam Dong Ha Ward	Nam Đông Hà	Nam Dong Ha	3	44
19360	quang_tri	Phường Quảng Trị	Quang Tri Ward	Quảng Trị	Quang Tri	3	44
18901	minh_hoa	Xã Minh Hóa	Minh Hoa Commune	Minh Hóa	Minh Hoa	4	44
18904	dan_hoa	Xã Dân Hóa	Dan Hoa Commune	Dân Hóa	Dan Hoa	4	44
18919	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	44
18922	kim_dien	Xã Kim Điền	Kim Dien Commune	Kim Điền	Kim Dien	4	44
18943	kim_phu	Xã Kim Phú	Kim Phu Commune	Kim Phú	Kim Phu	4	44
18949	dong_le	Xã Đồng Lê	Dong Le Commune	Đồng Lê	Dong Le	4	44
18952	tuyen_son	Xã Tuyên Sơn	Tuyen Son Commune	Tuyên Sơn	Tuyen Son	4	44
18958	tuyen_lam	Xã Tuyên Lâm	Tuyen Lam Commune	Tuyên Lâm	Tuyen Lam	4	44
18985	tuyen_phu	Xã Tuyên Phú	Tuyen Phu Commune	Tuyên Phú	Tuyen Phu	4	44
18991	tuyen_binh	Xã Tuyên Bình	Tuyen Binh Commune	Tuyên Bình	Tuyen Binh	4	44
18997	tuyen_hoa	Xã Tuyên Hóa	Tuyen Hoa Commune	Tuyên Hóa	Tuyen Hoa	4	44
19021	phu_trach	Xã Phú Trạch	Phu Trach Commune	Phú Trạch	Phu Trach	4	44
19030	trung_thuan	Xã Trung Thuần	Trung Thuan Commune	Trung Thuần	Trung Thuan	4	44
19033	hoa_trach	Xã Hòa Trạch	Hoa Trach Commune	Hòa Trạch	Hoa Trach	4	44
19051	tan_gianh	Xã Tân Gianh	Tan Gianh Commune	Tân Gianh	Tan Gianh	4	44
19057	quang_trach	Xã Quảng Trạch	Quang Trach Commune	Quảng Trạch	Quang Trach	4	44
19075	nam_ba_don	Xã Nam Ba Đồn	Nam Ba Don Commune	Nam Ba Đồn	Nam Ba Don	4	44
19093	nam_gianh	Xã Nam Gianh	Nam Gianh Commune	Nam Gianh	Nam Gianh	4	44
19111	hoan_lao	Xã Hoàn Lão	Hoan Lao Commune	Hoàn Lão	Hoan Lao	4	44
19126	bac_trach	Xã Bắc Trạch	Bac Trach Commune	Bắc Trạch	Bac Trach	4	44
19138	phong_nha	Xã Phong Nha	Phong Nha Commune	Phong Nha	Phong Nha	4	44
19141	bo_trach	Xã Bố Trạch	Bo Trach Commune	Bố Trạch	Bo Trach	4	44
19147	thuong_trach	Xã Thượng Trạch	Thuong Trach Commune	Thượng Trạch	Thuong Trach	4	44
19159	dong_trach	Xã Đông Trạch	Dong Trach Commune	Đông Trạch	Dong Trach	4	44
19198	nam_trach	Xã Nam Trạch	Nam Trach Commune	Nam Trạch	Nam Trach	4	44
19204	truong_son	Xã Trường Sơn	Truong Son Commune	Trường Sơn	Truong Son	4	44
19207	quang_ninh	Xã Quảng Ninh	Quang Ninh Commune	Quảng Ninh	Quang Ninh	4	44
19225	ninh_chau	Xã Ninh Châu	Ninh Chau Commune	Ninh Châu	Ninh Chau	4	44
19237	truong_ninh	Xã Trường Ninh	Truong Ninh Commune	Trường Ninh	Truong Ninh	4	44
19246	le_ninh	Xã Lệ Ninh	Le Ninh Commune	Lệ Ninh	Le Ninh	4	44
19249	le_thuy	Xã Lệ Thủy	Le Thuy Commune	Lệ Thủy	Le Thuy	4	44
19255	cam_hong	Xã Cam Hồng	Cam Hong Commune	Cam Hồng	Cam Hong	4	44
19288	sen_ngu	Xã Sen Ngư	Sen Ngu Commune	Sen Ngư	Sen Ngu	4	44
19291	tan_my	Xã Tân Mỹ	Tan My Commune	Tân Mỹ	Tan My	4	44
19309	truong_phu	Xã Trường Phú	Truong Phu Commune	Trường Phú	Truong Phu	4	44
19318	kim_ngan	Xã Kim Ngân	Kim Ngan Commune	Kim Ngân	Kim Ngan	4	44
19363	vinh_linh	Xã Vĩnh Linh	Vinh Linh Commune	Vĩnh Linh	Vinh Linh	4	44
19366	ben_quan	Xã Bến Quan	Ben Quan Commune	Bến Quan	Ben Quan	4	44
19372	vinh_hoang	Xã Vĩnh Hoàng	Vinh Hoang Commune	Vĩnh Hoàng	Vinh Hoang	4	44
19405	vinh_thuy	Xã Vĩnh Thủy	Vinh Thuy Commune	Vĩnh Thủy	Vinh Thuy	4	44
19414	cua_tung	Xã Cửa Tùng	Cua Tung Commune	Cửa Tùng	Cua Tung	4	44
19429	khe_sanh	Xã Khe Sanh	Khe Sanh Commune	Khe Sanh	Khe Sanh	4	44
19432	lao_bao	Xã Lao Bảo	Lao Bao Commune	Lao Bảo	Lao Bao	4	44
19435	huong_lap	Xã Hướng Lập	Huong Lap Commune	Hướng Lập	Huong Lap	4	44
19441	huong_phung	Xã Hướng Phùng	Huong Phung Commune	Hướng Phùng	Huong Phung	4	44
19462	tan_lap	Xã Tân Lập	Tan Lap Commune	Tân Lập	Tan Lap	4	44
19483	a_doi	Xã A Dơi	A Doi Commune	A Dơi	A Doi	4	44
19489	lia	Xã Lìa	Lia Commune	Lìa	Lia	4	44
19495	gio_linh	Xã Gio Linh	Gio Linh Commune	Gio Linh	Gio Linh	4	44
19496	cua_viet	Xã Cửa Việt	Cua Viet Commune	Cửa Việt	Cua Viet	4	44
19501	ben_hai	Xã Bến Hải	Ben Hai Commune	Bến Hải	Ben Hai	4	44
19537	con_tien	Xã Cồn Tiên	Con Tien Commune	Cồn Tiên	Con Tien	4	44
19555	huong_hiep	Xã Hướng Hiệp	Huong Hiep Commune	Hướng Hiệp	Huong Hiep	4	44
19564	dakrong	Xã Đakrông	Dakrong Commune	Đakrông	Dakrong	4	44
19567	ba_long	Xã Ba Lòng	Ba Long Commune	Ba Lòng	Ba Long	4	44
19588	ta_rut	Xã Tà Rụt	Ta Rut Commune	Tà Rụt	Ta Rut	4	44
19594	la_lay	Xã La Lay	La Lay Commune	La Lay	La Lay	4	44
19597	cam_lo	Xã Cam Lộ	Cam Lo Commune	Cam Lộ	Cam Lo	4	44
19603	hieu_giang	Xã Hiếu Giang	Hieu Giang Commune	Hiếu Giang	Hieu Giang	4	44
19624	trieu_phong	Xã Triệu Phong	Trieu Phong Commune	Triệu Phong	Trieu Phong	4	44
19639	nam_cua_viet	Xã Nam Cửa Việt	Nam Cua Viet Commune	Nam Cửa Việt	Nam Cua Viet	4	44
19645	trieu_binh	Xã Triệu Bình	Trieu Binh Commune	Triệu Bình	Trieu Binh	4	44
19654	trieu_co	Xã Triệu Cơ	Trieu Co Commune	Triệu Cơ	Trieu Co	4	44
19669	ai_tu	Xã Ái Tử	Ai Tu Commune	Ái Tử	Ai Tu	4	44
19681	dien_sanh	Xã Diên Sanh	Dien Sanh Commune	Diên Sanh	Dien Sanh	4	44
19699	vinh_dinh	Xã Vĩnh Định	Vinh Dinh Commune	Vĩnh Định	Vinh Dinh	4	44
19702	hai_lang	Xã Hải Lăng	Hai Lang Commune	Hải Lăng	Hai Lang	4	44
19735	nam_hai_lang	Xã Nam Hải Lăng	Nam Hai Lang Commune	Nam Hải Lăng	Nam Hai Lang	4	44
19741	my_thuy	Xã Mỹ Thủy	My Thuy Commune	Mỹ Thủy	My Thuy	4	44
19742	con_co	Đặc khu Cồn Cỏ	Con Co Special administrative region	Cồn Cỏ	Con Co	5	44
19753	phu_xuan	Phường Phú Xuân	Phu Xuan Ward	Phú Xuân	Phu Xuan	3	46
19774	kim_long	Phường Kim Long	Kim Long Ward	Kim Long	Kim Long	3	46
19777	vy_da	Phường Vỹ Dạ	Vy Da Ward	Vỹ Dạ	Vy Da	3	46
19789	thuan_hoa	Phường Thuận Hóa	Thuan Hoa Ward	Thuận Hóa	Thuan Hoa	3	46
19804	huong_an	Phường Hương An	Huong An Ward	Hương An	Huong An	3	46
19813	thuy_xuan	Phường Thủy Xuân	Thuy Xuan Ward	Thủy Xuân	Thuy Xuan	3	46
19815	an_cuu	Phường An Cựu	An Cuu Ward	An Cựu	An Cuu	3	46
19819	phong_dien	Phường Phong Điền	Phong Dien Ward	Phong Điền	Phong Dien	3	46
19828	phong_phu	Phường Phong Phú	Phong Phu Ward	Phong Phú	Phong Phu	3	46
19831	phong_dinh	Phường Phong Dinh	Phong Dinh Ward	Phong Dinh	Phong Dinh	3	46
19858	phong_thai	Phường Phong Thái	Phong Thai Ward	Phong Thái	Phong Thai	3	46
19873	phong_quang	Phường Phong Quảng	Phong Quang Ward	Phong Quảng	Phong Quang	3	46
19900	thuan_an	Phường Thuận An	Thuan An Ward	Thuận An	Thuan An	3	46
19909	duong_no	Phường Dương Nỗ	Duong No Ward	Dương Nỗ	Duong No	3	46
19930	my_thuong	Phường Mỹ Thượng	My Thuong Ward	Mỹ Thượng	My Thuong	3	46
19960	phu_bai	Phường Phú Bài	Phu Bai Ward	Phú Bài	Phu Bai	3	46
19969	thanh_thuy	Phường Thanh Thủy	Thanh Thuy Ward	Thanh Thủy	Thanh Thuy	3	46
19975	huong_thuy	Phường Hương Thủy	Huong Thuy Ward	Hương Thủy	Huong Thuy	3	46
19996	huong_tra	Phường Hương Trà	Huong Tra Ward	Hương Trà	Huong Tra	3	46
20014	hoa_chau	Phường Hóa Châu	Hoa Chau Ward	Hóa Châu	Hoa Chau	3	46
20017	kim_tra	Phường Kim Trà	Kim Tra Ward	Kim Trà	Kim Tra	3	46
19867	quang_dien	Xã Quảng Điền	Quang Dien Commune	Quảng Điền	Quang Dien	4	46
19885	dan_dien	Xã Đan Điền	Dan Dien Commune	Đan Điền	Dan Dien	4	46
19918	phu_ho	Xã Phú Hồ	Phu Ho Commune	Phú Hồ	Phu Ho	4	46
19942	phu_vang	Xã Phú Vang	Phu Vang Commune	Phú Vang	Phu Vang	4	46
19945	phu_vinh	Xã Phú Vinh	Phu Vinh Commune	Phú Vinh	Phu Vinh	4	46
23812	lo_pang	Xã Lơ Pang	Lo Pang Commune	Lơ Pang	Lo Pang	4	52
20035	binh_dien	Xã Bình Điền	Binh Dien Commune	Bình Điền	Binh Dien	4	46
20044	a_luoi_2	Xã A Lưới 2	A Luoi 2 Commune	A Lưới 2	A Luoi 2	4	46
20050	a_luoi_5	Xã A Lưới 5	A Luoi 5 Commune	A Lưới 5	A Luoi 5	4	46
20056	a_luoi_1	Xã A Lưới 1	A Luoi 1 Commune	A Lưới 1	A Luoi 1	4	46
20071	a_luoi_3	Xã A Lưới 3	A Luoi 3 Commune	A Lưới 3	A Luoi 3	4	46
20101	a_luoi_4	Xã A Lưới 4	A Luoi 4 Commune	A Lưới 4	A Luoi 4	4	46
20107	phu_loc	Xã Phú Lộc	Phu Loc Commune	Phú Lộc	Phu Loc	4	46
20122	vinh_loc	Xã Vinh Lộc	Vinh Loc Commune	Vinh Lộc	Vinh Loc	4	46
20131	hung_loc	Xã Hưng Lộc	Hung Loc Commune	Hưng Lộc	Hung Loc	4	46
20137	chan_may_lang_co	Xã Chân Mây - Lăng Cô	Chan May - Lang Co Commune	Chân Mây - Lăng Cô	Chan May - Lang Co	4	46
20140	loc_an	Xã Lộc An	Loc An Commune	Lộc An	Loc An	4	46
20161	khe_tre	Xã Khe Tre	Khe Tre Commune	Khe Tre	Khe Tre	4	46
20179	nam_dong	Xã Nam Đông	Nam Dong Commune	Nam Đông	Nam Dong	4	46
20182	long_quang	Xã Long Quảng	Long Quang Commune	Long Quảng	Long Quang	4	46
20194	hai_van	Phường Hải Vân	Hai Van Ward	Hải Vân	Hai Van	3	48
20197	lien_chieu	Phường Liên Chiểu	Lien Chieu Ward	Liên Chiểu	Lien Chieu	3	48
20200	hoa_khanh	Phường Hòa Khánh	Hoa Khanh Ward	Hòa Khánh	Hoa Khanh	3	48
20209	thanh_khe	Phường Thanh Khê	Thanh Khe Ward	Thanh Khê	Thanh Khe	3	48
20242	hai_chau	Phường Hải Châu	Hai Chau Ward	Hải Châu	Hai Chau	3	48
20257	hoa_cuong	Phường Hòa Cường	Hoa Cuong Ward	Hòa Cường	Hoa Cuong	3	48
20260	cam_le	Phường Cẩm Lệ	Cam Le Ward	Cẩm Lệ	Cam Le	3	48
20263	son_tra	Phường Sơn Trà	Son Tra Ward	Sơn Trà	Son Tra	3	48
20275	an_hai	Phường An Hải	An Hai Ward	An Hải	An Hai	3	48
20285	ngu_hanh_son	Phường Ngũ Hành Sơn	Ngu Hanh Son Ward	Ngũ Hành Sơn	Ngu Hanh Son	3	48
20305	an_khe	Phường An Khê	An Khe Ward	An Khê	An Khe	3	48
20314	hoa_xuan	Phường Hòa Xuân	Hoa Xuan Ward	Hòa Xuân	Hoa Xuan	3	48
20335	ban_thach	Phường Bàn Thạch	Ban Thach Ward	Bàn Thạch	Ban Thach	3	48
20341	tam_ky	Phường Tam Kỳ	Tam Ky Ward	Tam Kỳ	Tam Ky	3	48
20350	huong_tra	Phường Hương Trà	Huong Tra Ward	Hương Trà	Huong Tra	3	48
20356	quang_phu	Phường Quảng Phú	Quang Phu Ward	Quảng Phú	Quang Phu	3	48
20401	hoi_an_tay	Phường Hội An Tây	Hoi An Tay Ward	Hội An Tây	Hoi An Tay	3	48
20410	hoi_an	Phường Hội An	Hoi An Ward	Hội An	Hoi An	3	48
20413	hoi_an_dong	Phường Hội An Đông	Hoi An Dong Ward	Hội An Đông	Hoi An Dong	3	48
20551	dien_ban	Phường Điện Bàn	Dien Ban Ward	Điện Bàn	Dien Ban	3	48
20557	dien_ban_bac	Phường Điện Bàn Bắc	Dien Ban Bac Ward	Điện Bàn Bắc	Dien Ban Bac	3	48
20575	an_thang	Phường An Thắng	An Thang Ward	An Thắng	An Thang	3	48
20579	dien_ban_dong	Phường Điện Bàn Đông	Dien Ban Dong Ward	Điện Bàn Đông	Dien Ban Dong	3	48
20308	ba_na	Xã Bà Nà	Ba Na Commune	Bà Nà	Ba Na	4	48
20320	hoa_vang	Xã Hòa Vang	Hoa Vang Commune	Hòa Vang	Hoa Vang	4	48
20332	hoa_tien	Xã Hòa Tiến	Hoa Tien Commune	Hòa Tiến	Hoa Tien	4	48
20364	chien_dan	Xã Chiên Đàn	Chien Dan Commune	Chiên Đàn	Chien Dan	4	48
20380	tay_ho	Xã Tây Hồ	Tay Ho Commune	Tây Hồ	Tay Ho	4	48
20392	phu_ninh	Xã Phú Ninh	Phu Ninh Commune	Phú Ninh	Phu Ninh	4	48
20434	tan_hiep	Xã Tân Hiệp	Tan Hiep Commune	Tân Hiệp	Tan Hiep	4	48
20443	hung_son	Xã Hùng Sơn	Hung Son Commune	Hùng Sơn	Hung Son	4	48
20455	tay_giang	Xã Tây Giang	Tay Giang Commune	Tây Giang	Tay Giang	4	48
20458	avuong	Xã Avương	Avuong Commune	Avương	Avuong	4	48
20467	dong_giang	Xã Đông Giang	Dong Giang Commune	Đông Giang	Dong Giang	4	48
20476	song_kon	Xã Sông Kôn	Song Kon Commune	Sông Kôn	Song Kon	4	48
20485	song_vang	Xã Sông Vàng	Song Vang Commune	Sông Vàng	Song Vang	4	48
20494	ben_hien	Xã Bến Hiên	Ben Hien Commune	Bến Hiên	Ben Hien	4	48
20500	dai_loc	Xã Đại Lộc	Dai Loc Commune	Đại Lộc	Dai Loc	4	48
20506	thuong_duc	Xã Thượng Đức	Thuong Duc Commune	Thượng Đức	Thuong Duc	4	48
20515	ha_nha	Xã Hà Nha	Ha Nha Commune	Hà Nha	Ha Nha	4	48
20539	vu_gia	Xã Vu Gia	Vu Gia Commune	Vu Gia	Vu Gia	4	48
20542	phu_thuan	Xã Phú Thuận	Phu Thuan Commune	Phú Thuận	Phu Thuan	4	48
20569	dien_ban_tay	Xã Điện Bàn Tây	Dien Ban Tay Commune	Điện Bàn Tây	Dien Ban Tay	4	48
20587	go_noi	Xã Gò Nổi	Go Noi Commune	Gò Nổi	Go Noi	4	48
20599	nam_phuoc	Xã Nam Phước	Nam Phuoc Commune	Nam Phước	Nam Phuoc	4	48
20611	thu_bon	Xã Thu Bồn	Thu Bon Commune	Thu Bồn	Thu Bon	4	48
20623	duy_xuyen	Xã Duy Xuyên	Duy Xuyen Commune	Duy Xuyên	Duy Xuyen	4	48
20635	duy_nghia	Xã Duy Nghĩa	Duy Nghia Commune	Duy Nghĩa	Duy Nghia	4	48
20641	que_son	Xã Quế Sơn	Que Son Commune	Quế Sơn	Que Son	4	48
20650	xuan_phu	Xã Xuân Phú	Xuan Phu Commune	Xuân Phú	Xuan Phu	4	48
20656	nong_son	Xã Nông Sơn	Nong Son Commune	Nông Sơn	Nong Son	4	48
20662	que_son_trung	Xã Quế Sơn Trung	Que Son Trung Commune	Quế Sơn Trung	Que Son Trung	4	48
20669	que_phuoc	Xã Quế Phước	Que Phuoc Commune	Quế Phước	Que Phuoc	4	48
20695	thanh_my	Xã Thạnh Mỹ	Thanh My Commune	Thạnh Mỹ	Thanh My	4	48
20698	la_ee	Xã La Êê	La Ee Commune	La Êê	La Ee	4	48
20704	la_dee	Xã La Dêê	La Dee Commune	La Dêê	La Dee	4	48
20707	nam_giang	Xã Nam Giang	Nam Giang Commune	Nam Giang	Nam Giang	4	48
20710	ben_giang	Xã Bến Giằng	Ben Giang Commune	Bến Giằng	Ben Giang	4	48
20716	dac_pring	Xã Đắc Pring	Dac Pring Commune	Đắc Pring	Dac Pring	4	48
20722	kham_duc	Xã Khâm Đức	Kham Duc Commune	Khâm Đức	Kham Duc	4	48
20728	phuoc_hiep	Xã Phước Hiệp	Phuoc Hiep Commune	Phước Hiệp	Phuoc Hiep	4	48
20734	phuoc_nang	Xã Phước Năng	Phuoc Nang Commune	Phước Năng	Phuoc Nang	4	48
20740	phuoc_chanh	Xã Phước Chánh	Phuoc Chanh Commune	Phước Chánh	Phuoc Chanh	4	48
20752	phuoc_thanh	Xã Phước Thành	Phuoc Thanh Commune	Phước Thành	Phuoc Thanh	4	48
20767	viet_an	Xã Việt An	Viet An Commune	Việt An	Viet An	4	48
20770	phuoc_tra	Xã Phước Trà	Phuoc Tra Commune	Phước Trà	Phuoc Tra	4	48
20779	hiep_duc	Xã Hiệp Đức	Hiep Duc Commune	Hiệp Đức	Hiep Duc	4	48
20791	thang_binh	Xã Thăng Bình	Thang Binh Commune	Thăng Bình	Thang Binh	4	48
20794	thang_an	Xã Thăng An	Thang An Commune	Thăng An	Thang An	4	48
20818	dong_duong	Xã Đồng Dương	Dong Duong Commune	Đồng Dương	Dong Duong	4	48
20827	thang_phu	Xã Thăng Phú	Thang Phu Commune	Thăng Phú	Thang Phu	4	48
20836	thang_truong	Xã Thăng Trường	Thang Truong Commune	Thăng Trường	Thang Truong	4	48
20848	thang_dien	Xã Thăng Điền	Thang Dien Commune	Thăng Điền	Thang Dien	4	48
20854	tien_phuoc	Xã Tiên Phước	Tien Phuoc Commune	Tiên Phước	Tien Phuoc	4	48
20857	son_cam_ha	Xã Sơn Cẩm Hà	Son Cam Ha Commune	Sơn Cẩm Hà	Son Cam Ha	4	48
20875	lanh_ngoc	Xã Lãnh Ngọc	Lanh Ngoc Commune	Lãnh Ngọc	Lanh Ngoc	4	48
20878	thanh_binh	Xã Thạnh Bình	Thanh Binh Commune	Thạnh Bình	Thanh Binh	4	48
20900	tra_my	Xã Trà My	Tra My Commune	Trà My	Tra My	4	48
20908	tra_lien	Xã Trà Liên	Tra Lien Commune	Trà Liên	Tra Lien	4	48
20920	tra_doc	Xã Trà Đốc	Tra Doc Commune	Trà Đốc	Tra Doc	4	48
20923	tra_tan	Xã Trà Tân	Tra Tan Commune	Trà Tân	Tra Tan	4	48
20929	tra_giap	Xã Trà Giáp	Tra Giap Commune	Trà Giáp	Tra Giap	4	48
20938	tra_leng	Xã Trà Leng	Tra Leng Commune	Trà Leng	Tra Leng	4	48
20941	tra_tap	Xã Trà Tập	Tra Tap Commune	Trà Tập	Tra Tap	4	48
20944	nam_tra_my	Xã Nam Trà My	Nam Tra My Commune	Nam Trà My	Nam Tra My	4	48
20950	tra_linh	Xã Trà Linh	Tra Linh Commune	Trà Linh	Tra Linh	4	48
20959	tra_van	Xã Trà Vân	Tra Van Commune	Trà Vân	Tra Van	4	48
20965	nui_thanh	Xã Núi Thành	Nui Thanh Commune	Núi Thành	Nui Thanh	4	48
20971	tam_xuan	Xã Tam Xuân	Tam Xuan Commune	Tam Xuân	Tam Xuan	4	48
20977	duc_phu	Xã Đức Phú	Duc Phu Commune	Đức Phú	Duc Phu	4	48
20984	tam_anh	Xã Tam Anh	Tam Anh Commune	Tam Anh	Tam Anh	4	48
20992	tam_hai	Xã Tam Hải	Tam Hai Commune	Tam Hải	Tam Hai	4	48
21004	tam_my	Xã Tam Mỹ	Tam My Commune	Tam Mỹ	Tam My	4	48
20333	hoang_sa	Đặc khu Hoàng Sa	Hoang Sa Special administrative region	Hoàng Sa	Hoang Sa	5	48
21025	cam_thanh	Phường Cẩm Thành	Cam Thanh Ward	Cẩm Thành	Cam Thanh	3	51
21028	nghia_lo	Phường Nghĩa Lộ	Nghia Lo Ward	Nghĩa Lộ	Nghia Lo	3	51
21172	truong_quang_trong	Phường Trương Quang Trọng	Truong Quang Trong Ward	Trương Quang Trọng	Truong Quang Trong	3	51
21439	duc_pho	Phường Đức Phổ	Duc Pho Ward	Đức Phổ	Duc Pho	3	51
21451	tra_cau	Phường Trà Câu	Tra Cau Ward	Trà Câu	Tra Cau	3	51
21478	sa_huynh	Phường Sa Huỳnh	Sa Huynh Ward	Sa Huỳnh	Sa Huynh	3	51
23284	dak_cam	Phường Đăk Cấm	Dak Cam Ward	Đăk Cấm	Dak Cam	3	51
23293	kon_tum	Phường Kon Tum	Kon Tum Ward	Kon Tum	Kon Tum	3	51
23302	dak_bla	Phường Đăk Bla	Dak Bla Ward	Đăk Bla	Dak Bla	3	51
21034	an_phu	Xã An Phú	An Phu Commune	An Phú	An Phu	4	51
21040	binh_son	Xã Bình Sơn	Binh Son Commune	Bình Sơn	Binh Son	4	51
21061	van_tuong	Xã Vạn Tường	Van Tuong Commune	Vạn Tường	Van Tuong	4	51
21085	binh_minh	Xã Bình Minh	Binh Minh Commune	Bình Minh	Binh Minh	4	51
21100	binh_chuong	Xã Bình Chương	Binh Chuong Commune	Bình Chương	Binh Chuong	4	51
21109	dong_son	Xã Đông Sơn	Dong Son Commune	Đông Sơn	Dong Son	4	51
21115	tra_bong	Xã Trà Bồng	Tra Bong Commune	Trà Bồng	Tra Bong	4	51
21124	thanh_bong	Xã Thanh Bồng	Thanh Bong Commune	Thanh Bồng	Thanh Bong	4	51
21127	dong_tra_bong	Xã Đông Trà Bồng	Dong Tra Bong Commune	Đông Trà Bồng	Dong Tra Bong	4	51
21136	ca_dam	Xã Cà Đam	Ca Dam Commune	Cà Đam	Ca Dam	4	51
21154	tay_tra	Xã Tây Trà	Tay Tra Commune	Tây Trà	Tay Tra	4	51
21157	tay_tra_bong	Xã Tây Trà Bồng	Tay Tra Bong Commune	Tây Trà Bồng	Tay Tra Bong	4	51
21181	tho_phong	Xã Thọ Phong	Tho Phong Commune	Thọ Phong	Tho Phong	4	51
21196	truong_giang	Xã Trường Giang	Truong Giang Commune	Trường Giang	Truong Giang	4	51
21205	ba_gia	Xã Ba Gia	Ba Gia Commune	Ba Gia	Ba Gia	4	51
21211	tinh_khe	Xã Tịnh Khê	Tinh Khe Commune	Tịnh Khê	Tinh Khe	4	51
21220	son_tinh	Xã Sơn Tịnh	Son Tinh Commune	Sơn Tịnh	Son Tinh	4	51
21235	tu_nghia	Xã Tư Nghĩa	Tu Nghia Commune	Tư Nghĩa	Tu Nghia	4	51
21238	ve_giang	Xã Vệ Giang	Ve Giang Commune	Vệ Giang	Ve Giang	4	51
21244	tra_giang	Xã Trà Giang	Tra Giang Commune	Trà Giang	Tra Giang	4	51
21250	nghia_giang	Xã Nghĩa Giang	Nghia Giang Commune	Nghĩa Giang	Nghia Giang	4	51
21289	son_ha	Xã Sơn Hà	Son Ha Commune	Sơn Hà	Son Ha	4	51
21292	son_ha	Xã Sơn Hạ	Son Ha Commune	Sơn Hạ	Son Ha	4	51
21307	son_linh	Xã Sơn Linh	Son Linh Commune	Sơn Linh	Son Linh	4	51
21319	son_thuy	Xã Sơn Thủy	Son Thuy Commune	Sơn Thủy	Son Thuy	4	51
21325	son_ky	Xã Sơn Kỳ	Son Ky Commune	Sơn Kỳ	Son Ky	4	51
21334	son_tay_thuong	Xã Sơn Tây Thượng	Son Tay Thuong Commune	Sơn Tây Thượng	Son Tay Thuong	4	51
21340	son_tay	Xã Sơn Tây	Son Tay Commune	Sơn Tây	Son Tay	4	51
24187	ea_hiao	Xã Ea Hiao	Ea Hiao Commune	Ea Hiao	Ea Hiao	4	66
21343	son_tay_ha	Xã Sơn Tây Hạ	Son Tay Ha Commune	Sơn Tây Hạ	Son Tay Ha	4	51
21349	son_mai	Xã Sơn Mai	Son Mai Commune	Sơn Mai	Son Mai	4	51
21361	minh_long	Xã Minh Long	Minh Long Commune	Minh Long	Minh Long	4	51
21364	nghia_hanh	Xã Nghĩa Hành	Nghia Hanh Commune	Nghĩa Hành	Nghia Hanh	4	51
21370	phuoc_giang	Xã Phước Giang	Phuoc Giang Commune	Phước Giang	Phuoc Giang	4	51
21385	dinh_cuong	Xã Đình Cương	Dinh Cuong Commune	Đình Cương	Dinh Cuong	4	51
21388	thien_tin	Xã Thiện Tín	Thien Tin Commune	Thiện Tín	Thien Tin	4	51
21400	mo_duc	Xã Mộ Đức	Mo Duc Commune	Mộ Đức	Mo Duc	4	51
21409	long_phung	Xã Long Phụng	Long Phung Commune	Long Phụng	Long Phung	4	51
21421	mo_cay	Xã Mỏ Cày	Mo Cay Commune	Mỏ Cày	Mo Cay	4	51
21433	lan_phong	Xã Lân Phong	Lan Phong Commune	Lân Phong	Lan Phong	4	51
21457	nguyen_nghiem	Xã Nguyễn Nghiêm	Nguyen Nghiem Commune	Nguyễn Nghiêm	Nguyen Nghiem	4	51
21472	khanh_cuong	Xã Khánh Cường	Khanh Cuong Commune	Khánh Cường	Khanh Cuong	4	51
21484	ba_to	Xã Ba Tơ	Ba To Commune	Ba Tơ	Ba To	4	51
21490	ba_vinh	Xã Ba Vinh	Ba Vinh Commune	Ba Vinh	Ba Vinh	4	51
21496	ba_dong	Xã Ba Động	Ba Dong Commune	Ba Động	Ba Dong	4	51
21499	ba_dinh	Xã Ba Dinh	Ba Dinh Commune	Ba Dinh	Ba Dinh	4	51
21520	dang_thuy_tram	Xã Đặng Thùy Trâm	Dang Thuy Tram Commune	Đặng Thùy Trâm	Dang Thuy Tram	4	51
21523	ba_to	Xã Ba Tô	Ba To Commune	Ba Tô	Ba To	4	51
21529	ba_vi	Xã Ba Vì	Ba Vi Commune	Ba Vì	Ba Vi	4	51
21538	ba_xa	Xã Ba Xa	Ba Xa Commune	Ba Xa	Ba Xa	4	51
23317	ngok_bay	Xã Ngọk Bay	Ngok Bay Commune	Ngọk Bay	Ngok Bay	4	51
23326	ia_chim	Xã Ia Chim	Ia Chim Commune	Ia Chim	Ia Chim	4	51
23332	dak_ro_wa	Xã Đăk Rơ Wa	Dak Ro Wa Commune	Đăk Rơ Wa	Dak Ro Wa	4	51
23341	dak_pek	Xã Đăk Pék	Dak Pek Commune	Đăk Pék	Dak Pek	4	51
23344	dak_plo	Xã Đăk Plô	Dak Plo Commune	Đăk Plô	Dak Plo	4	51
23356	xop	Xã Xốp	Xop Commune	Xốp	Xop	4	51
23365	ngoc_linh	Xã Ngọc Linh	Ngoc Linh Commune	Ngọc Linh	Ngoc Linh	4	51
23368	dak_long	Xã Đăk Long	Dak Long Commune	Đăk Long	Dak Long	4	51
23374	dak_mon	Xã Đăk Môn	Dak Mon Commune	Đăk Môn	Dak Mon	4	51
23377	bo_y	Xã Bờ Y	Bo Y Commune	Bờ Y	Bo Y	4	51
23383	duc_nong	Xã Dục Nông	Duc Nong Commune	Dục Nông	Duc Nong	4	51
23392	sa_loong	Xã Sa Loong	Sa Loong Commune	Sa Loong	Sa Loong	4	51
23401	dak_to	Xã Đăk Tô	Dak To Commune	Đăk Tô	Dak To	4	51
23416	dak_sao	Xã Đăk Sao	Dak Sao Commune	Đăk Sao	Dak Sao	4	51
23419	dak_to_kan	Xã Đăk Tờ Kan	Dak To Kan Commune	Đăk Tờ Kan	Dak To Kan	4	51
23425	tu_mo_rong	Xã Tu Mơ Rông	Tu Mo Rong Commune	Tu Mơ Rông	Tu Mo Rong	4	51
23428	ngok_tu	Xã Ngọk Tụ	Ngok Tu Commune	Ngọk Tụ	Ngok Tu	4	51
23430	kon_dao	Xã Kon Đào	Kon Dao Commune	Kon Đào	Kon Dao	4	51
23446	mang_ri	Xã Măng Ri	Mang Ri Commune	Măng Ri	Mang Ri	4	51
23455	mang_but	Xã Măng Bút	Mang But Commune	Măng Bút	Mang But	4	51
23473	mang_den	Xã Măng Đen	Mang Den Commune	Măng Đen	Mang Den	4	51
23476	kon_plong	Xã Kon Plông	Kon Plong Commune	Kon Plông	Kon Plong	4	51
23479	dak_rve	Xã Đăk Rve	Dak Rve Commune	Đăk Rve	Dak Rve	4	51
23485	dak_koi	Xã Đăk Kôi	Dak Koi Commune	Đăk Kôi	Dak Koi	4	51
23497	kon_braih	Xã Kon Braih	Kon Braih Commune	Kon Braih	Kon Braih	4	51
23500	dak_ha	Xã Đăk Hà	Dak Ha Commune	Đăk Hà	Dak Ha	4	51
23504	dak_pxi	Xã Đăk Pxi	Dak Pxi Commune	Đăk Pxi	Dak Pxi	4	51
23510	dak_ui	Xã Đăk Ui	Dak Ui Commune	Đăk Ui	Dak Ui	4	51
23512	dak_mar	Xã Đăk Mar	Dak Mar Commune	Đăk Mar	Dak Mar	4	51
23515	ngok_reo	Xã Ngọk Réo	Ngok Reo Commune	Ngọk Réo	Ngok Reo	4	51
23527	sa_thay	Xã Sa Thầy	Sa Thay Commune	Sa Thầy	Sa Thay	4	51
23530	ro_koi	Xã Rờ Kơi	Ro Koi Commune	Rờ Kơi	Ro Koi	4	51
23534	sa_binh	Xã Sa Bình	Sa Binh Commune	Sa Bình	Sa Binh	4	51
23535	ia_dal	Xã Ia Đal	Ia Dal Commune	Ia Đal	Ia Dal	4	51
23536	mo_rai	Xã Mô Rai	Mo Rai Commune	Mô Rai	Mo Rai	4	51
23538	ia_toi	Xã Ia Tơi	Ia Toi Commune	Ia Tơi	Ia Toi	4	51
23548	ya_ly	Xã Ya Ly	Ya Ly Commune	Ya Ly	Ya Ly	4	51
21548	ly_son	Đặc khu Lý Sơn	Ly Son Special administrative region	Lý Sơn	Ly Son	5	51
21553	quy_nhon_bac	Phường Quy Nhơn Bắc	Quy Nhon Bac Ward	Quy Nhơn Bắc	Quy Nhon Bac	3	52
21583	quy_nhon	Phường Quy Nhơn	Quy Nhon Ward	Quy Nhơn	Quy Nhon	3	52
21589	quy_nhon_tay	Phường Quy Nhơn Tây	Quy Nhon Tay Ward	Quy Nhơn Tây	Quy Nhon Tay	3	52
21592	quy_nhon_nam	Phường Quy Nhơn Nam	Quy Nhon Nam Ward	Quy Nhơn Nam	Quy Nhon Nam	3	52
21601	quy_nhon_dong	Phường Quy Nhơn Đông	Quy Nhon Dong Ward	Quy Nhơn Đông	Quy Nhon Dong	3	52
21637	tam_quan	Phường Tam Quan	Tam Quan Ward	Tam Quan	Tam Quan	3	52
21640	bong_son	Phường Bồng Sơn	Bong Son Ward	Bồng Sơn	Bong Son	3	52
21655	hoai_nhon_bac	Phường Hoài Nhơn Bắc	Hoai Nhon Bac Ward	Hoài Nhơn Bắc	Hoai Nhon Bac	3	52
21661	hoai_nhon_tay	Phường Hoài Nhơn Tây	Hoai Nhon Tay Ward	Hoài Nhơn Tây	Hoai Nhon Tay	3	52
21664	hoai_nhon	Phường Hoài Nhơn	Hoai Nhon Ward	Hoài Nhơn	Hoai Nhon	3	52
21670	hoai_nhon_dong	Phường Hoài Nhơn Đông	Hoai Nhon Dong Ward	Hoài Nhơn Đông	Hoai Nhon Dong	3	52
21673	hoai_nhon_nam	Phường Hoài Nhơn Nam	Hoai Nhon Nam Ward	Hoài Nhơn Nam	Hoai Nhon Nam	3	52
21907	binh_dinh	Phường Bình Định	Binh Dinh Ward	Bình Định	Binh Dinh	3	52
21910	an_nhon	Phường An Nhơn	An Nhon Ward	An Nhơn	An Nhon	3	52
21925	an_nhon_bac	Phường An Nhơn Bắc	An Nhon Bac Ward	An Nhơn Bắc	An Nhon Bac	3	52
24193	ea_wy	Xã Ea Wy	Ea Wy Commune	Ea Wy	Ea Wy	4	66
21934	an_nhon_dong	Phường An Nhơn Đông	An Nhon Dong Ward	An Nhơn Đông	An Nhon Dong	3	52
21943	an_nhon_nam	Phường An Nhơn Nam	An Nhon Nam Ward	An Nhơn Nam	An Nhon Nam	3	52
23563	dien_hong	Phường Diên Hồng	Dien Hong Ward	Diên Hồng	Dien Hong	3	52
23575	pleiku	Phường Pleiku	Pleiku Ward	Pleiku	Pleiku	3	52
23584	thong_nhat	Phường Thống Nhất	Thong Nhat Ward	Thống Nhất	Thong Nhat	3	52
23586	hoi_phu	Phường Hội Phú	Hoi Phu Ward	Hội Phú	Hoi Phu	3	52
23602	an_phu	Phường An Phú	An Phu Ward	An Phú	An Phu	3	52
23614	an_binh	Phường An Bình	An Binh Ward	An Bình	An Binh	3	52
23617	an_khe	Phường An Khê	An Khe Ward	An Khê	An Khe	3	52
24044	ayun_pa	Phường Ayun Pa	Ayun Pa Ward	Ayun Pa	Ayun Pa	3	52
21607	nhon_chau	Xã Nhơn Châu	Nhon Chau Commune	Nhơn Châu	Nhon Chau	4	52
21609	an_lao	Xã An Lão	An Lao Commune	An Lão	An Lao	4	52
21616	an_vinh	Xã An Vinh	An Vinh Commune	An Vinh	An Vinh	4	52
21622	an_toan	Xã An Toàn	An Toan Commune	An Toàn	An Toan	4	52
21628	an_hoa	Xã An Hòa	An Hoa Commune	An Hòa	An Hoa	4	52
21688	hoai_an	Xã Hoài Ân	Hoai An Commune	Hoài Ân	Hoai An	4	52
21697	an_hao	Xã Ân Hảo	An Hao Commune	Ân Hảo	An Hao	4	52
21703	van_duc	Xã Vạn Đức	Van Duc Commune	Vạn Đức	Van Duc	4	52
21715	an_tuong	Xã Ân Tường	An Tuong Commune	Ân Tường	An Tuong	4	52
21727	kim_son	Xã Kim Sơn	Kim Son Commune	Kim Sơn	Kim Son	4	52
21730	phu_my	Xã Phù Mỹ	Phu My Commune	Phù Mỹ	Phu My	4	52
21733	binh_duong	Xã Bình Dương	Binh Duong Commune	Bình Dương	Binh Duong	4	52
21739	phu_my_bac	Xã Phù Mỹ Bắc	Phu My Bac Commune	Phù Mỹ Bắc	Phu My Bac	4	52
21751	phu_my_dong	Xã Phù Mỹ Đông	Phu My Dong Commune	Phù Mỹ Đông	Phu My Dong	4	52
21757	phu_my_tay	Xã Phù Mỹ Tây	Phu My Tay Commune	Phù Mỹ Tây	Phu My Tay	4	52
21769	an_luong	Xã An Lương	An Luong Commune	An Lương	An Luong	4	52
21775	phu_my_nam	Xã Phù Mỹ Nam	Phu My Nam Commune	Phù Mỹ Nam	Phu My Nam	4	52
21786	vinh_thanh	Xã Vĩnh Thạnh	Vinh Thanh Commune	Vĩnh Thạnh	Vinh Thanh	4	52
21787	vinh_son	Xã Vĩnh Sơn	Vinh Son Commune	Vĩnh Sơn	Vinh Son	4	52
21796	vinh_thinh	Xã Vĩnh Thịnh	Vinh Thinh Commune	Vĩnh Thịnh	Vinh Thinh	4	52
21805	vinh_quang	Xã Vĩnh Quang	Vinh Quang Commune	Vĩnh Quang	Vinh Quang	4	52
21808	tay_son	Xã Tây Sơn	Tay Son Commune	Tây Sơn	Tay Son	4	52
21817	binh_hiep	Xã Bình Hiệp	Binh Hiep Commune	Bình Hiệp	Binh Hiep	4	52
21820	binh_khe	Xã Bình Khê	Binh Khe Commune	Bình Khê	Binh Khe	4	52
21829	binh_an	Xã Bình An	Binh An Commune	Bình An	Binh An	4	52
21835	binh_phu	Xã Bình Phú	Binh Phu Commune	Bình Phú	Binh Phu	4	52
21853	phu_cat	Xã Phù Cát	Phu Cat Commune	Phù Cát	Phu Cat	4	52
21859	de_gi	Xã Đề Gi	De Gi Commune	Đề Gi	De Gi	4	52
21868	hoi_son	Xã Hội Sơn	Hoi Son Commune	Hội Sơn	Hoi Son	4	52
21871	hoa_hoi	Xã Hòa Hội	Hoa Hoi Commune	Hòa Hội	Hoa Hoi	4	52
21880	cat_tien	Xã Cát Tiến	Cat Tien Commune	Cát Tiến	Cat Tien	4	52
21892	xuan_an	Xã Xuân An	Xuan An Commune	Xuân An	Xuan An	4	52
21901	ngo_may	Xã Ngô Mây	Ngo May Commune	Ngô Mây	Ngo May	4	52
21940	an_nhon_tay	Xã An Nhơn Tây	An Nhon Tay Commune	An Nhơn Tây	An Nhon Tay	4	52
21952	tuy_phuoc	Xã Tuy Phước	Tuy Phuoc Commune	Tuy Phước	Tuy Phuoc	4	52
21964	tuy_phuoc_bac	Xã Tuy Phước Bắc	Tuy Phuoc Bac Commune	Tuy Phước Bắc	Tuy Phuoc Bac	4	52
21970	tuy_phuoc_dong	Xã Tuy Phước Đông	Tuy Phuoc Dong Commune	Tuy Phước Đông	Tuy Phuoc Dong	4	52
21985	tuy_phuoc_tay	Xã Tuy Phước Tây	Tuy Phuoc Tay Commune	Tuy Phước Tây	Tuy Phuoc Tay	4	52
21994	van_canh	Xã Vân Canh	Van Canh Commune	Vân Canh	Van Canh	4	52
21997	canh_lien	Xã Canh Liên	Canh Lien Commune	Canh Liên	Canh Lien	4	52
22006	canh_vinh	Xã Canh Vinh	Canh Vinh Commune	Canh Vinh	Canh Vinh	4	52
23590	bien_ho	Xã Biển Hồ	Bien Ho Commune	Biển Hồ	Bien Ho	4	52
23611	gao	Xã Gào	Gao Commune	Gào	Gao	4	52
23629	cuu_an	Xã Cửu An	Cuu An Commune	Cửu An	Cuu An	4	52
23638	kbang	Xã Kbang	Kbang Commune	Kbang	Kbang	4	52
23644	dak_rong	Xã Đak Rong	Dak Rong Commune	Đak Rong	Dak Rong	4	52
23647	son_lang	Xã Sơn Lang	Son Lang Commune	Sơn Lang	Son Lang	4	52
23650	krong	Xã Krong	Krong Commune	Krong	Krong	4	52
23668	to_tung	Xã Tơ Tung	To Tung Commune	Tơ Tung	To Tung	4	52
23674	kong_bo_la	Xã Kông Bơ La	Kong Bo La Commune	Kông Bơ La	Kong Bo La	4	52
23677	dak_doa	Xã Đak Đoa	Dak Doa Commune	Đak Đoa	Dak Doa	4	52
23683	dak_somei	Xã Đak Sơmei	Dak Somei Commune	Đak Sơmei	Dak Somei	4	52
23701	kon_gang	Xã Kon Gang	Kon Gang Commune	Kon Gang	Kon Gang	4	52
23710	ia_bang	Xã Ia Băng	Ia Bang Commune	Ia Băng	Ia Bang	4	52
23714	kdang	Xã KDang	KDang Commune	KDang	KDang	4	52
23722	chu_pah	Xã Chư Păh	Chu Pah Commune	Chư Păh	Chu Pah	4	52
23728	ia_khuol	Xã Ia Khươl	Ia Khuol Commune	Ia Khươl	Ia Khuol	4	52
23734	ia_ly	Xã Ia Ly	Ia Ly Commune	Ia Ly	Ia Ly	4	52
23938	ia_mo	Xã Ia Mơ	Ia Mo Commune	Ia Mơ	Ia Mo	4	52
23749	ia_phi	Xã Ia Phí	Ia Phi Commune	Ia Phí	Ia Phi	4	52
23764	ia_grai	Xã Ia Grai	Ia Grai Commune	Ia Grai	Ia Grai	4	52
23767	ia_hrung	Xã Ia Hrung	Ia Hrung Commune	Ia Hrung	Ia Hrung	4	52
23776	ia_krai	Xã Ia Krái	Ia Krai Commune	Ia Krái	Ia Krai	4	52
23782	ia_o	Xã Ia O	Ia O Commune	Ia O	Ia O	4	52
23788	ia_chia	Xã Ia Chia	Ia Chia Commune	Ia Chia	Ia Chia	4	52
23794	mang_yang	Xã Mang Yang	Mang Yang Commune	Mang Yang	Mang Yang	4	52
23798	ayun	Xã Ayun	Ayun Commune	Ayun	Ayun	4	52
23818	kon_chieng	Xã Kon Chiêng	Kon Chieng Commune	Kon Chiêng	Kon Chieng	4	52
23824	kong_chro	Xã Kông Chro	Kong Chro Commune	Kông Chro	Kong Chro	4	52
23830	chu_krey	Xã Chư Krey	Chu Krey Commune	Chư Krey	Chu Krey	4	52
23833	ya_ma	Xã Ya Ma	Ya Ma Commune	Ya Ma	Ya Ma	4	52
23839	sro	Xã SRó	SRo Commune	SRó	SRo	4	52
23842	dak_song	Xã Đăk Song	Dak Song Commune	Đăk Song	Dak Song	4	52
23851	cho_long	Xã Chơ Long	Cho Long Commune	Chơ Long	Cho Long	4	52
23857	duc_co	Xã Đức Cơ	Duc Co Commune	Đức Cơ	Duc Co	4	52
23866	ia_krel	Xã Ia Krêl	Ia Krel Commune	Ia Krêl	Ia Krel	4	52
23869	ia_dok	Xã Ia Dơk	Ia Dok Commune	Ia Dơk	Ia Dok	4	52
23872	ia_dom	Xã Ia Dom	Ia Dom Commune	Ia Dom	Ia Dom	4	52
23881	ia_pnon	Xã Ia Pnôn	Ia Pnon Commune	Ia Pnôn	Ia Pnon	4	52
23884	ia_nan	Xã Ia Nan	Ia Nan Commune	Ia Nan	Ia Nan	4	52
23887	chu_prong	Xã Chư Prông	Chu Prong Commune	Chư Prông	Chu Prong	4	52
23896	bau_can	Xã Bàu Cạn	Bau Can Commune	Bàu Cạn	Bau Can	4	52
23908	ia_tor	Xã Ia Tôr	Ia Tor Commune	Ia Tôr	Ia Tor	4	52
23911	ia_boong	Xã Ia Boòng	Ia Boong Commune	Ia Boòng	Ia Boong	4	52
23917	ia_puch	Xã Ia Púch	Ia Puch Commune	Ia Púch	Ia Puch	4	52
23926	ia_pia	Xã Ia Pia	Ia Pia Commune	Ia Pia	Ia Pia	4	52
23935	ia_lau	Xã Ia Lâu	Ia Lau Commune	Ia Lâu	Ia Lau	4	52
23941	chu_se	Xã Chư Sê	Chu Se Commune	Chư Sê	Chu Se	4	52
23942	chu_puh	Xã Chư Pưh	Chu Puh Commune	Chư Pưh	Chu Puh	4	52
23947	bo_ngoong	Xã Bờ Ngoong	Bo Ngoong Commune	Bờ Ngoong	Bo Ngoong	4	52
23954	al_ba	Xã Al Bá	Al Ba Commune	Al Bá	Al Ba	4	52
23971	ia_hru	Xã Ia Hrú	Ia Hru Commune	Ia Hrú	Ia Hru	4	52
23977	ia_ko	Xã Ia Ko	Ia Ko Commune	Ia Ko	Ia Ko	4	52
23986	ia_le	Xã Ia Le	Ia Le Commune	Ia Le	Ia Le	4	52
23995	dak_po	Xã Đak Pơ	Dak Po Commune	Đak Pơ	Dak Po	4	52
24007	ya_hoi	Xã Ya Hội	Ya Hoi Commune	Ya Hội	Ya Hoi	4	52
24013	po_to	Xã Pờ Tó	Po To Commune	Pờ Tó	Po To	4	52
24022	ia_pa	Xã Ia Pa	Ia Pa Commune	Ia Pa	Ia Pa	4	52
24028	ia_tul	Xã Ia Tul	Ia Tul Commune	Ia Tul	Ia Tul	4	52
24043	phu_thien	Xã Phú Thiện	Phu Thien Commune	Phú Thiện	Phu Thien	4	52
24049	chu_a_thai	Xã Chư A Thai	Chu A Thai Commune	Chư A Thai	Chu A Thai	4	52
24061	ia_hiao	Xã Ia Hiao	Ia Hiao Commune	Ia Hiao	Ia Hiao	4	52
24065	ia_rbol	Xã Ia Rbol	Ia Rbol Commune	Ia Rbol	Ia Rbol	4	52
24073	ia_sao	Xã Ia Sao	Ia Sao Commune	Ia Sao	Ia Sao	4	52
24076	phu_tuc	Xã Phú Túc	Phu Tuc Commune	Phú Túc	Phu Tuc	4	52
24100	ia_dreh	Xã Ia Dreh	Ia Dreh Commune	Ia Dreh	Ia Dreh	4	52
24109	uar	Xã Uar	Uar Commune	Uar	Uar	4	52
24112	ia_rsai	Xã Ia Rsai	Ia Rsai Commune	Ia Rsai	Ia Rsai	4	52
22333	bac_nha_trang	Phường Bắc Nha Trang	Bac Nha Trang Ward	Bắc Nha Trang	Bac Nha Trang	3	56
22366	nha_trang	Phường Nha Trang	Nha Trang Ward	Nha Trang	Nha Trang	3	56
22390	tay_nha_trang	Phường Tây Nha Trang	Tay Nha Trang Ward	Tây Nha Trang	Tay Nha Trang	3	56
22402	nam_nha_trang	Phường Nam Nha Trang	Nam Nha Trang Ward	Nam Nha Trang	Nam Nha Trang	3	56
22411	bac_cam_ranh	Phường Bắc Cam Ranh	Bac Cam Ranh Ward	Bắc Cam Ranh	Bac Cam Ranh	3	56
22420	cam_ranh	Phường Cam Ranh	Cam Ranh Ward	Cam Ranh	Cam Ranh	3	56
22423	ba_ngoi	Phường Ba Ngòi	Ba Ngoi Ward	Ba Ngòi	Ba Ngoi	3	56
22432	cam_linh	Phường Cam Linh	Cam Linh Ward	Cam Linh	Cam Linh	3	56
22528	ninh_hoa	Phường Ninh Hòa	Ninh Hoa Ward	Ninh Hòa	Ninh Hoa	3	56
22561	dong_ninh_hoa	Phường Đông Ninh Hòa	Dong Ninh Hoa Ward	Đông Ninh Hòa	Dong Ninh Hoa	3	56
22591	hoa_thang	Phường Hòa Thắng	Hoa Thang Ward	Hòa Thắng	Hoa Thang	3	56
22738	do_vinh	Phường Đô Vinh	Do Vinh Ward	Đô Vinh	Do Vinh	3	56
22741	bao_an	Phường Bảo An	Bao An Ward	Bảo An	Bao An	3	56
22759	phan_rang	Phường Phan Rang	Phan Rang Ward	Phan Rang	Phan Rang	3	56
22780	dong_hai	Phường Đông Hải	Dong Hai Ward	Đông Hải	Dong Hai	3	56
22834	ninh_chu	Phường Ninh Chử	Ninh Chu Ward	Ninh Chử	Ninh Chu	3	56
22435	cam_hiep	Xã Cam Hiệp	Cam Hiep Commune	Cam Hiệp	Cam Hiep	4	56
22453	cam_lam	Xã Cam Lâm	Cam Lam Commune	Cam Lâm	Cam Lam	4	56
22465	cam_an	Xã Cam An	Cam An Commune	Cam An	Cam An	4	56
22480	nam_cam_ranh	Xã Nam Cam Ranh	Nam Cam Ranh Commune	Nam Cam Ranh	Nam Cam Ranh	4	56
22489	van_ninh	Xã Vạn Ninh	Van Ninh Commune	Vạn Ninh	Van Ninh	4	56
22498	tu_bong	Xã Tu Bông	Tu Bong Commune	Tu Bông	Tu Bong	4	56
22504	dai_lanh	Xã Đại Lãnh	Dai Lanh Commune	Đại Lãnh	Dai Lanh	4	56
22516	van_thang	Xã Vạn Thắng	Van Thang Commune	Vạn Thắng	Van Thang	4	56
22525	van_hung	Xã Vạn Hưng	Van Hung Commune	Vạn Hưng	Van Hung	4	56
22546	bac_ninh_hoa	Xã Bắc Ninh Hòa	Bac Ninh Hoa Commune	Bắc Ninh Hòa	Bac Ninh Hoa	4	56
22552	tay_ninh_hoa	Xã Tây Ninh Hòa	Tay Ninh Hoa Commune	Tây Ninh Hòa	Tay Ninh Hoa	4	56
22558	hoa_tri	Xã Hòa Trí	Hoa Tri Commune	Hòa Trí	Hoa Tri	4	56
22576	tan_dinh	Xã Tân Định	Tan Dinh Commune	Tân Định	Tan Dinh	4	56
22597	nam_ninh_hoa	Xã Nam Ninh Hòa	Nam Ninh Hoa Commune	Nam Ninh Hòa	Nam Ninh Hoa	4	56
22609	khanh_vinh	Xã Khánh Vĩnh	Khanh Vinh Commune	Khánh Vĩnh	Khanh Vinh	4	56
22612	trung_khanh_vinh	Xã Trung Khánh Vĩnh	Trung Khanh Vinh Commune	Trung Khánh Vĩnh	Trung Khanh Vinh	4	56
22615	bac_khanh_vinh	Xã Bắc Khánh Vĩnh	Bac Khanh Vinh Commune	Bắc Khánh Vĩnh	Bac Khanh Vinh	4	56
22624	tay_khanh_vinh	Xã Tây Khánh Vĩnh	Tay Khanh Vinh Commune	Tây Khánh Vĩnh	Tay Khanh Vinh	4	56
22648	nam_khanh_vinh	Xã Nam Khánh Vĩnh	Nam Khanh Vinh Commune	Nam Khánh Vĩnh	Nam Khanh Vinh	4	56
22651	dien_khanh	Xã Diên Khánh	Dien Khanh Commune	Diên Khánh	Dien Khanh	4	56
22657	dien_dien	Xã Diên Điền	Dien Dien Commune	Diên Điền	Dien Dien	4	56
22660	dien_lam	Xã Diên Lâm	Dien Lam Commune	Diên Lâm	Dien Lam	4	56
22672	dien_tho	Xã Diên Thọ	Dien Tho Commune	Diên Thọ	Dien Tho	4	56
22678	dien_lac	Xã Diên Lạc	Dien Lac Commune	Diên Lạc	Dien Lac	4	56
22702	suoi_hiep	Xã Suối Hiệp	Suoi Hiep Commune	Suối Hiệp	Suoi Hiep	4	56
22708	suoi_dau	Xã Suối Dầu	Suoi Dau Commune	Suối Dầu	Suoi Dau	4	56
22714	khanh_son	Xã Khánh Sơn	Khanh Son Commune	Khánh Sơn	Khanh Son	4	56
22720	tay_khanh_son	Xã Tây Khánh Sơn	Tay Khanh Son Commune	Tây Khánh Sơn	Tay Khanh Son	4	56
22732	dong_khanh_son	Xã Đông Khánh Sơn	Dong Khanh Son Commune	Đông Khánh Sơn	Dong Khanh Son	4	56
22786	bac_ai_tay	Xã Bác Ái Tây	Bac Ai Tay Commune	Bác Ái Tây	Bac Ai Tay	4	56
22795	bac_ai	Xã Bác Ái	Bac Ai Commune	Bác Ái	Bac Ai	4	56
22801	bac_ai_dong	Xã Bác Ái Đông	Bac Ai Dong Commune	Bác Ái Đông	Bac Ai Dong	4	56
22810	ninh_son	Xã Ninh Sơn	Ninh Son Commune	Ninh Sơn	Ninh Son	4	56
22813	lam_son	Xã Lâm Sơn	Lam Son Commune	Lâm Sơn	Lam Son	4	56
22822	my_son	Xã Mỹ Sơn	My Son Commune	Mỹ Sơn	My Son	4	56
22828	anh_dung	Xã Anh Dũng	Anh Dung Commune	Anh Dũng	Anh Dung	4	56
22840	cong_hai	Xã Công Hải	Cong Hai Commune	Công Hải	Cong Hai	4	56
22846	vinh_hai	Xã Vĩnh Hải	Vinh Hai Commune	Vĩnh Hải	Vinh Hai	4	56
22849	thuan_bac	Xã Thuận Bắc	Thuan Bac Commune	Thuận Bắc	Thuan Bac	4	56
22852	ninh_hai	Xã Ninh Hải	Ninh Hai Commune	Ninh Hải	Ninh Hai	4	56
22861	xuan_hai	Xã Xuân Hải	Xuan Hai Commune	Xuân Hải	Xuan Hai	4	56
22870	ninh_phuoc	Xã Ninh Phước	Ninh Phuoc Commune	Ninh Phước	Ninh Phuoc	4	56
22873	phuoc_hau	Xã Phước Hậu	Phuoc Hau Commune	Phước Hậu	Phuoc Hau	4	56
22888	phuoc_dinh	Xã Phước Dinh	Phuoc Dinh Commune	Phước Dinh	Phuoc Dinh	4	56
22891	phuoc_huu	Xã Phước Hữu	Phuoc Huu Commune	Phước Hữu	Phuoc Huu	4	56
22897	thuan_nam	Xã Thuận Nam	Thuan Nam Commune	Thuận Nam	Thuan Nam	4	56
22900	phuoc_ha	Xã Phước Hà	Phuoc Ha Commune	Phước Hà	Phuoc Ha	4	56
22909	ca_na	Xã Cà Ná	Ca Na Commune	Cà Ná	Ca Na	4	56
22736	truong_sa	Đặc khu Trường Sa	Truong Sa Special administrative region	Trường Sa	Truong Sa	5	56
22015	tuy_hoa	Phường Tuy Hòa	Tuy Hoa Ward	Tuy Hòa	Tuy Hoa	3	66
22045	binh_kien	Phường Bình Kiến	Binh Kien Ward	Bình Kiến	Binh Kien	3	66
22051	song_cau	Phường Sông Cầu	Song Cau Ward	Sông Cầu	Song Cau	3	66
22076	xuan_dai	Phường Xuân Đài	Xuan Dai Ward	Xuân Đài	Xuan Dai	3	66
22240	phu_yen	Phường Phú Yên	Phu Yen Ward	Phú Yên	Phu Yen	3	66
22258	dong_hoa	Phường Đông Hòa	Dong Hoa Ward	Đông Hòa	Dong Hoa	3	66
22261	hoa_hiep	Phường Hòa Hiệp	Hoa Hiep Ward	Hòa Hiệp	Hoa Hiep	3	66
24121	tan_lap	Phường Tân Lập	Tan Lap Ward	Tân Lập	Tan Lap	3	66
24133	buon_ma_thuot	Phường Buôn Ma Thuột	Buon Ma Thuot Ward	Buôn Ma Thuột	Buon Ma Thuot	3	66
24154	thanh_nhat	Phường Thành Nhất	Thanh Nhat Ward	Thành Nhất	Thanh Nhat	3	66
24163	tan_an	Phường Tân An	Tan An Ward	Tân An	Tan An	3	66
24169	ea_kao	Phường Ea Kao	Ea Kao Ward	Ea Kao	Ea Kao	3	66
24305	buon_ho	Phường Buôn Hồ	Buon Ho Ward	Buôn Hồ	Buon Ho	3	66
24340	cu_bao	Phường Cư Bao	Cu Bao Ward	Cư Bao	Cu Bao	3	66
22057	xuan_loc	Xã Xuân Lộc	Xuan Loc Commune	Xuân Lộc	Xuan Loc	4	66
22060	xuan_canh	Xã Xuân Cảnh	Xuan Canh Commune	Xuân Cảnh	Xuan Canh	4	66
22075	xuan_tho	Xã Xuân Thọ	Xuan Tho Commune	Xuân Thọ	Xuan Tho	4	66
22081	dong_xuan	Xã Đồng Xuân	Dong Xuan Commune	Đồng Xuân	Dong Xuan	4	66
22090	xuan_lanh	Xã Xuân Lãnh	Xuan Lanh Commune	Xuân Lãnh	Xuan Lanh	4	66
22096	phu_mo	Xã Phú Mỡ	Phu Mo Commune	Phú Mỡ	Phu Mo	4	66
22111	xuan_phuoc	Xã Xuân Phước	Xuan Phuoc Commune	Xuân Phước	Xuan Phuoc	4	66
22114	tuy_an_bac	Xã Tuy An Bắc	Tuy An Bac Commune	Tuy An Bắc	Tuy An Bac	4	66
22120	tuy_an_dong	Xã Tuy An Đông	Tuy An Dong Commune	Tuy An Đông	Tuy An Dong	4	66
22132	tuy_an_tay	Xã Tuy An Tây	Tuy An Tay Commune	Tuy An Tây	Tuy An Tay	4	66
22147	o_loan	Xã Ô Loan	O Loan Commune	Ô Loan	O Loan	4	66
22153	tuy_an_nam	Xã Tuy An Nam	Tuy An Nam Commune	Tuy An Nam	Tuy An Nam	4	66
22165	son_hoa	Xã Sơn Hòa	Son Hoa Commune	Sơn Hòa	Son Hoa	4	66
22171	tay_son	Xã Tây Sơn	Tay Son Commune	Tây Sơn	Tay Son	4	66
22177	van_hoa	Xã Vân Hòa	Van Hoa Commune	Vân Hòa	Van Hoa	4	66
22192	suoi_trai	Xã Suối Trai	Suoi Trai Commune	Suối Trai	Suoi Trai	4	66
22207	song_hinh	Xã Sông Hinh	Song Hinh Commune	Sông Hinh	Song Hinh	4	66
22222	duc_binh	Xã Đức Bình	Duc Binh Commune	Đức Bình	Duc Binh	4	66
22225	ea_ba	Xã Ea Bá	Ea Ba Commune	Ea Bá	Ea Ba	4	66
22237	ea_ly	Xã Ea Ly	Ea Ly Commune	Ea Ly	Ea Ly	4	66
22250	son_thanh	Xã Sơn Thành	Son Thanh Commune	Sơn Thành	Son Thanh	4	66
22255	tay_hoa	Xã Tây Hòa	Tay Hoa Commune	Tây Hòa	Tay Hoa	4	66
22276	hoa_thinh	Xã Hòa Thịnh	Hoa Thinh Commune	Hòa Thịnh	Hoa Thinh	4	66
22285	hoa_my	Xã Hòa Mỹ	Hoa My Commune	Hòa Mỹ	Hoa My	4	66
22291	hoa_xuan	Xã Hòa Xuân	Hoa Xuan Commune	Hòa Xuân	Hoa Xuan	4	66
22303	phu_hoa_2	Xã Phú Hòa 2	Phu Hoa 2 Commune	Phú Hòa 2	Phu Hoa 2	4	66
22319	phu_hoa_1	Xã Phú Hòa 1	Phu Hoa 1 Commune	Phú Hòa 1	Phu Hoa 1	4	66
24175	hoa_phu	Xã Hòa Phú	Hoa Phu Commune	Hòa Phú	Hoa Phu	4	66
24181	ea_drang	Xã Ea Drăng	Ea Drang Commune	Ea Drăng	Ea Drang	4	66
24184	ea_hleo	Xã Ea H'Leo	Ea H'Leo Commune	Ea H'Leo	Ea H'Leo	4	66
24208	ea_khal	Xã Ea Khăl	Ea Khal Commune	Ea Khăl	Ea Khal	4	66
24211	ea_sup	Xã Ea Súp	Ea Sup Commune	Ea Súp	Ea Sup	4	66
24214	ia_lop	Xã Ia Lốp	Ia Lop Commune	Ia Lốp	Ia Lop	4	66
24217	ea_rok	Xã Ea Rốk	Ea Rok Commune	Ea Rốk	Ea Rok	4	66
24221	ia_rve	Xã Ia Rvê	Ia Rve Commune	Ia Rvê	Ia Rve	4	66
24229	ea_bung	Xã Ea Bung	Ea Bung Commune	Ea Bung	Ea Bung	4	66
24235	buon_don	Xã Buôn Đôn	Buon Don Commune	Buôn Đôn	Buon Don	4	66
24241	ea_wer	Xã Ea Wer	Ea Wer Commune	Ea Wer	Ea Wer	4	66
24250	ea_nuol	Xã Ea Nuôl	Ea Nuol Commune	Ea Nuôl	Ea Nuol	4	66
24259	quang_phu	Xã Quảng Phú	Quang Phu Commune	Quảng Phú	Quang Phu	4	66
24265	ea_kiet	Xã Ea Kiết	Ea Kiet Commune	Ea Kiết	Ea Kiet	4	66
24277	ea_tul	Xã Ea Tul	Ea Tul Commune	Ea Tul	Ea Tul	4	66
24280	cu_mgar	Xã Cư M'gar	Cu M'gar Commune	Cư M'gar	Cu M'gar	4	66
24286	ea_mdroh	Xã Ea M'Droh	Ea M'Droh Commune	Ea M'Droh	Ea M'Droh	4	66
24301	cuor_dang	Xã Cuôr Đăng	Cuor Dang Commune	Cuôr Đăng	Cuor Dang	4	66
24310	krong_buk	Xã Krông Búk	Krong Buk Commune	Krông Búk	Krong Buk	4	66
24313	cu_pong	Xã Cư Pơng	Cu Pong Commune	Cư Pơng	Cu Pong	4	66
24316	pong_drang	Xã Pơng Drang	Pong Drang Commune	Pơng Drang	Pong Drang	4	66
24328	ea_drong	Xã Ea Drông	Ea Drong Commune	Ea Drông	Ea Drong	4	66
24343	krong_nang	Xã Krông Năng	Krong Nang Commune	Krông Năng	Krong Nang	4	66
24346	dlie_ya	Xã Dliê Ya	Dlie Ya Commune	Dliê Ya	Dlie Ya	4	66
24352	tam_giang	Xã Tam Giang	Tam Giang Commune	Tam Giang	Tam Giang	4	66
24364	phu_xuan	Xã Phú Xuân	Phu Xuan Commune	Phú Xuân	Phu Xuan	4	66
24373	ea_kar	Xã Ea Kar	Ea Kar Commune	Ea Kar	Ea Kar	4	66
24376	ea_knop	Xã Ea Knốp	Ea Knop Commune	Ea Knốp	Ea Knop	4	66
24400	ea_pal	Xã Ea Păl	Ea Pal Commune	Ea Păl	Ea Pal	4	66
24403	ea_o	Xã Ea Ô	Ea O Commune	Ea Ô	Ea O	4	66
24406	cu_yang	Xã Cư Yang	Cu Yang Commune	Cư Yang	Cu Yang	4	66
24412	mdrak	Xã M'Drắk	M'Drak Commune	M'Drắk	M'Drak	4	66
24415	cu_prao	Xã Cư Prao	Cu Prao Commune	Cư Prao	Cu Prao	4	66
24433	ea_rieng	Xã Ea Riêng	Ea Rieng Commune	Ea Riêng	Ea Rieng	4	66
24436	cu_mta	Xã Cư M'ta	Cu M'ta Commune	Cư M'ta	Cu M'ta	4	66
24444	krong_a	Xã Krông Á	Krong A Commune	Krông Á	Krong A	4	66
24445	ea_trang	Xã Ea Trang	Ea Trang Commune	Ea Trang	Ea Trang	4	66
24448	krong_bong	Xã Krông Bông	Krong Bong Commune	Krông Bông	Krong Bong	4	66
24454	dang_kang	Xã Dang Kang	Dang Kang Commune	Dang Kang	Dang Kang	4	66
24472	hoa_son	Xã Hòa Sơn	Hoa Son Commune	Hòa Sơn	Hoa Son	4	66
24478	cu_pui	Xã Cư Pui	Cu Pui Commune	Cư Pui	Cu Pui	4	66
24484	yang_mao	Xã Yang Mao	Yang Mao Commune	Yang Mao	Yang Mao	4	66
24490	krong_pac	Xã Krông Pắc	Krong Pac Commune	Krông Pắc	Krong Pac	4	66
24496	ea_kly	Xã Ea Kly	Ea Kly Commune	Ea Kly	Ea Kly	4	66
24502	ea_phe	Xã Ea Phê	Ea Phe Commune	Ea Phê	Ea Phe	4	66
24505	ea_knuec	Xã Ea Knuếc	Ea Knuec Commune	Ea Knuếc	Ea Knuec	4	66
24526	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	66
24529	vu_bon	Xã Vụ Bổn	Vu Bon Commune	Vụ Bổn	Vu Bon	4	66
24538	krong_ana	Xã Krông Ana	Krong Ana Commune	Krông Ana	Krong Ana	4	66
24540	ea_ning	Xã Ea Ning	Ea Ning Commune	Ea Ning	Ea Ning	4	66
24544	ea_ktur	Xã Ea Ktur	Ea Ktur Commune	Ea Ktur	Ea Ktur	4	66
24559	ea_na	Xã Ea Na	Ea Na Commune	Ea Na	Ea Na	4	66
24561	dray_bhang	Xã Dray Bhăng	Dray Bhang Commune	Dray Bhăng	Dray Bhang	4	66
24568	dur_kmal	Xã Dur Kmăl	Dur Kmal Commune	Dur Kmăl	Dur Kmal	4	66
24580	lien_son_lak	Xã Liên Sơn Lắk	Lien Son Lak Commune	Liên Sơn Lắk	Lien Son Lak	4	66
24595	dak_lieng	Xã Đắk Liêng	Dak Lieng Commune	Đắk Liêng	Dak Lieng	4	66
24598	dak_phoi	Xã Đắk Phơi	Dak Phoi Commune	Đắk Phơi	Dak Phoi	4	66
24604	krong_no	Xã Krông Nô	Krong No Commune	Krông Nô	Krong No	4	66
24607	nam_ka	Xã Nam Ka	Nam Ka Commune	Nam Ka	Nam Ka	4	66
22918	mui_ne	Phường Mũi Né	Mui Ne Ward	Mũi Né	Mui Ne	3	68
22924	phu_thuy	Phường Phú Thủy	Phu Thuy Ward	Phú Thủy	Phu Thuy	3	68
22933	ham_thang	Phường Hàm Thắng	Ham Thang Ward	Hàm Thắng	Ham Thang	3	68
22945	phan_thiet	Phường Phan Thiết	Phan Thiet Ward	Phan Thiết	Phan Thiet	3	68
22954	tien_thanh	Phường Tiến Thành	Tien Thanh Ward	Tiến Thành	Tien Thanh	3	68
22960	binh_thuan	Phường Bình Thuận	Binh Thuan Ward	Bình Thuận	Binh Thuan	3	68
23231	phuoc_hoi	Phường Phước Hội	Phuoc Hoi Ward	Phước Hội	Phuoc Hoi	3	68
23235	la_gi	Phường La Gi	La Gi Ward	La Gi	La Gi	3	68
24611	bac_gia_nghia	Phường Bắc Gia Nghĩa	Bac Gia Nghia Ward	Bắc Gia Nghĩa	Bac Gia Nghia	3	68
24615	nam_gia_nghia	Phường Nam Gia Nghĩa	Nam Gia Nghia Ward	Nam Gia Nghĩa	Nam Gia Nghia	3	68
24617	dong_gia_nghia	Phường Đông Gia Nghĩa	Dong Gia Nghia Ward	Đông Gia Nghĩa	Dong Gia Nghia	3	68
24778	lam_vien_da_lat	Phường Lâm Viên - Đà Lạt	Lam Vien - Da Lat Ward	Lâm Viên - Đà Lạt	Lam Vien - Da Lat	3	68
24781	xuan_huong_da_lat	Phường Xuân Hương - Đà Lạt	Xuan Huong - Da Lat Ward	Xuân Hương - Đà Lạt	Xuan Huong - Da Lat	3	68
24787	cam_ly_da_lat	Phường Cam Ly - Đà Lạt	Cam Ly - Da Lat Ward	Cam Ly - Đà Lạt	Cam Ly - Da Lat	3	68
24805	xuan_truong_da_lat	Phường Xuân Trường - Đà Lạt	Xuan Truong - Da Lat Ward	Xuân Trường - Đà Lạt	Xuan Truong - Da Lat	3	68
24820	2_bao_loc	Phường 2 Bảo Lộc	2 Bao Loc Ward	2 Bảo Lộc	2 Bao Loc	3	68
24823	1_bao_loc	Phường 1 Bảo Lộc	1 Bao Loc Ward	1 Bảo Lộc	1 Bao Loc	3	68
24829	blao	Phường B'Lao	B'Lao Ward	B'Lao	B'Lao	3	68
30469	my_duc	Xã Mỹ Đức	My Duc Commune	Mỹ Đức	My Duc	4	91
24841	3_bao_loc	Phường 3 Bảo Lộc	3 Bao Loc Ward	3 Bảo Lộc	3 Bao Loc	3	68
24846	lang_biang_da_lat	Phường Lang Biang - Đà Lạt	Lang Biang - Da Lat Ward	Lang Biang - Đà Lạt	Lang Biang - Da Lat	3	68
22963	tuyen_quang	Xã Tuyên Quang	Tuyen Quang Commune	Tuyên Quang	Tuyen Quang	4	68
22969	lien_huong	Xã Liên Hương	Lien Huong Commune	Liên Hương	Lien Huong	4	68
22972	phan_ri_cua	Xã Phan Rí Cửa	Phan Ri Cua Commune	Phan Rí Cửa	Phan Ri Cua	4	68
22978	tuy_phong	Xã Tuy Phong	Tuy Phong Commune	Tuy Phong	Tuy Phong	4	68
22981	vinh_hao	Xã Vĩnh Hảo	Vinh Hao Commune	Vĩnh Hảo	Vinh Hao	4	68
23005	bac_binh	Xã Bắc Bình	Bac Binh Commune	Bắc Bình	Bac Binh	4	68
23008	phan_son	Xã Phan Sơn	Phan Son Commune	Phan Sơn	Phan Son	4	68
23020	hai_ninh	Xã Hải Ninh	Hai Ninh Commune	Hải Ninh	Hai Ninh	4	68
23023	song_luy	Xã Sông Lũy	Song Luy Commune	Sông Lũy	Song Luy	4	68
23032	luong_son	Xã Lương Sơn	Luong Son Commune	Lương Sơn	Luong Son	4	68
23041	hong_thai	Xã Hồng Thái	Hong Thai Commune	Hồng Thái	Hong Thai	4	68
23053	hoa_thang	Xã Hòa Thắng	Hoa Thang Commune	Hòa Thắng	Hoa Thang	4	68
23059	ham_thuan	Xã Hàm Thuận	Ham Thuan Commune	Hàm Thuận	Ham Thuan	4	68
23065	la_da	Xã La Dạ	La Da Commune	La Dạ	La Da	4	68
23074	dong_giang	Xã Đông Giang	Dong Giang Commune	Đông Giang	Dong Giang	4	68
23086	hong_son	Xã Hồng Sơn	Hong Son Commune	Hồng Sơn	Hong Son	4	68
23089	ham_thuan_bac	Xã Hàm Thuận Bắc	Ham Thuan Bac Commune	Hàm Thuận Bắc	Ham Thuan Bac	4	68
23095	ham_liem	Xã Hàm Liêm	Ham Liem Commune	Hàm Liêm	Ham Liem	4	68
23110	ham_thuan_nam	Xã Hàm Thuận Nam	Ham Thuan Nam Commune	Hàm Thuận Nam	Ham Thuan Nam	4	68
23122	ham_thanh	Xã Hàm Thạnh	Ham Thanh Commune	Hàm Thạnh	Ham Thanh	4	68
23128	ham_kiem	Xã Hàm Kiệm	Ham Kiem Commune	Hàm Kiệm	Ham Kiem	4	68
23134	tan_lap	Xã Tân Lập	Tan Lap Commune	Tân Lập	Tan Lap	4	68
23143	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	68
23149	tanh_linh	Xã Tánh Linh	Tanh Linh Commune	Tánh Linh	Tanh Linh	4	68
23152	bac_ruong	Xã Bắc Ruộng	Bac Ruong Commune	Bắc Ruộng	Bac Ruong	4	68
23158	nghi_duc	Xã Nghị Đức	Nghi Duc Commune	Nghị Đức	Nghi Duc	4	68
23173	dong_kho	Xã Đồng Kho	Dong Kho Commune	Đồng Kho	Dong Kho	4	68
23188	suoi_kiet	Xã Suối Kiết	Suoi Kiet Commune	Suối Kiết	Suoi Kiet	4	68
23191	duc_linh	Xã Đức Linh	Duc Linh Commune	Đức Linh	Duc Linh	4	68
23194	hoai_duc	Xã Hoài Đức	Hoai Duc Commune	Hoài Đức	Hoai Duc	4	68
23200	nam_thanh	Xã Nam Thành	Nam Thanh Commune	Nam Thành	Nam Thanh	4	68
23227	tra_tan	Xã Trà Tân	Tra Tan Commune	Trà Tân	Tra Tan	4	68
23230	tan_minh	Xã Tân Minh	Tan Minh Commune	Tân Minh	Tan Minh	4	68
23236	ham_tan	Xã Hàm Tân	Ham Tan Commune	Hàm Tân	Ham Tan	4	68
23246	tan_hai	Xã Tân Hải	Tan Hai Commune	Tân Hải	Tan Hai	4	68
23266	son_my	Xã Sơn Mỹ	Son My Commune	Sơn Mỹ	Son My	4	68
24616	quang_son	Xã Quảng Sơn	Quang Son Commune	Quảng Sơn	Quang Son	4	68
24620	quang_hoa	Xã Quảng Hòa	Quang Hoa Commune	Quảng Hòa	Quang Hoa	4	68
24631	quang_khe	Xã Quảng Khê	Quang Khe Commune	Quảng Khê	Quang Khe	4	68
24637	ta_dung	Xã Tà Đùng	Ta Dung Commune	Tà Đùng	Ta Dung	4	68
24640	cu_jut	Xã Cư Jút	Cu Jut Commune	Cư Jút	Cu Jut	4	68
24646	dak_wil	Xã Đắk Wil	Dak Wil Commune	Đắk Wil	Dak Wil	4	68
24649	nam_dong	Xã Nam Dong	Nam Dong Commune	Nam Dong	Nam Dong	4	68
24664	duc_lap	Xã Đức Lập	Duc Lap Commune	Đức Lập	Duc Lap	4	68
24670	dak_mil	Xã Đắk Mil	Dak Mil Commune	Đắk Mil	Dak Mil	4	68
24678	dak_sak	Xã Đắk Sắk	Dak Sak Commune	Đắk Sắk	Dak Sak	4	68
24682	thuan_an	Xã Thuận An	Thuan An Commune	Thuận An	Thuan An	4	68
24688	krong_no	Xã Krông Nô	Krong No Commune	Krông Nô	Krong No	4	68
24697	nam_da	Xã Nam Đà	Nam Da Commune	Nam Đà	Nam Da	4	68
24703	nam_nung	Xã Nâm Nung	Nam Nung Commune	Nâm Nung	Nam Nung	4	68
24712	quang_phu	Xã Quảng Phú	Quang Phu Commune	Quảng Phú	Quang Phu	4	68
24717	duc_an	Xã Đức An	Duc An Commune	Đức An	Duc An	4	68
24718	dak_song	Xã Đắk Song	Dak Song Commune	Đắk Song	Dak Song	4	68
24722	thuan_hanh	Xã Thuận Hạnh	Thuan Hanh Commune	Thuận Hạnh	Thuan Hanh	4	68
24730	truong_xuan	Xã Trường Xuân	Truong Xuan Commune	Trường Xuân	Truong Xuan	4	68
24733	kien_duc	Xã Kiến Đức	Kien Duc Commune	Kiến Đức	Kien Duc	4	68
24736	quang_truc	Xã Quảng Trực	Quang Truc Commune	Quảng Trực	Quang Truc	4	68
24739	tuy_duc	Xã Tuy Đức	Tuy Duc Commune	Tuy Đức	Tuy Duc	4	68
24748	quang_tan	Xã Quảng Tân	Quang Tan Commune	Quảng Tân	Quang Tan	4	68
24751	nhan_co	Xã Nhân Cơ	Nhan Co Commune	Nhân Cơ	Nhan Co	4	68
24760	quang_tin	Xã Quảng Tín	Quang Tin Commune	Quảng Tín	Quang Tin	4	68
24848	lac_duong	Xã Lạc Dương	Lac Duong Commune	Lạc Dương	Lac Duong	4	68
24853	dam_rong_4	Xã Đam Rông 4	Dam Rong 4 Commune	Đam Rông 4	Dam Rong 4	4	68
24868	nam_ban_lam_ha	Xã Nam Ban Lâm Hà	Nam Ban Lam Ha Commune	Nam Ban Lâm Hà	Nam Ban Lam Ha	4	68
24871	dinh_van_lam_ha	Xã Đinh Văn Lâm Hà	Dinh Van Lam Ha Commune	Đinh Văn Lâm Hà	Dinh Van Lam Ha	4	68
24875	dam_rong_3	Xã Đam Rông 3	Dam Rong 3 Commune	Đam Rông 3	Dam Rong 3	4	68
24877	dam_rong_2	Xã Đam Rông 2	Dam Rong 2 Commune	Đam Rông 2	Dam Rong 2	4	68
24883	nam_ha_lam_ha	Xã Nam Hà Lâm Hà	Nam Ha Lam Ha Commune	Nam Hà Lâm Hà	Nam Ha Lam Ha	4	68
24886	dam_rong_1	Xã Đam Rông 1	Dam Rong 1 Commune	Đam Rông 1	Dam Rong 1	4	68
24895	phu_son_lam_ha	Xã Phú Sơn Lâm Hà	Phu Son Lam Ha Commune	Phú Sơn Lâm Hà	Phu Son Lam Ha	4	68
24907	phuc_tho_lam_ha	Xã Phúc Thọ Lâm Hà	Phuc Tho Lam Ha Commune	Phúc Thọ Lâm Hà	Phuc Tho Lam Ha	4	68
24916	tan_ha_lam_ha	Xã Tân Hà Lâm Hà	Tan Ha Lam Ha Commune	Tân Hà Lâm Hà	Tan Ha Lam Ha	4	68
24931	don_duong	Xã Đơn Dương	Don Duong Commune	Đơn Dương	Don Duong	4	68
24934	dran	Xã D'Ran	D'Ran Commune	D'Ran	D'Ran	4	68
24943	ka_do	Xã Ka Đô	Ka Do Commune	Ka Đô	Ka Do	4	68
24955	quang_lap	Xã Quảng Lập	Quang Lap Commune	Quảng Lập	Quang Lap	4	68
24958	duc_trong	Xã Đức Trọng	Duc Trong Commune	Đức Trọng	Duc Trong	4	68
24967	hiep_thanh	Xã Hiệp Thạnh	Hiep Thanh Commune	Hiệp Thạnh	Hiep Thanh	4	68
24976	tan_hoi	Xã Tân Hội	Tan Hoi Commune	Tân Hội	Tan Hoi	4	68
24985	ninh_gia	Xã Ninh Gia	Ninh Gia Commune	Ninh Gia	Ninh Gia	4	68
24988	ta_nang	Xã Tà Năng	Ta Nang Commune	Tà Năng	Ta Nang	4	68
24991	ta_hine	Xã Tà Hine	Ta Hine Commune	Tà Hine	Ta Hine	4	68
25000	di_linh	Xã Di Linh	Di Linh Commune	Di Linh	Di Linh	4	68
25007	dinh_trang_thuong	Xã Đinh Trang Thượng	Dinh Trang Thuong Commune	Đinh Trang Thượng	Dinh Trang Thuong	4	68
25015	gia_hiep	Xã Gia Hiệp	Gia Hiep Commune	Gia Hiệp	Gia Hiep	4	68
25018	bao_thuan	Xã Bảo Thuận	Bao Thuan Commune	Bảo Thuận	Bao Thuan	4	68
25036	hoa_ninh	Xã Hòa Ninh	Hoa Ninh Commune	Hòa Ninh	Hoa Ninh	4	68
25042	hoa_bac	Xã Hòa Bắc	Hoa Bac Commune	Hòa Bắc	Hoa Bac	4	68
25051	son_dien	Xã Sơn Điền	Son Dien Commune	Sơn Điền	Son Dien	4	68
25054	bao_lam_1	Xã Bảo Lâm 1	Bao Lam 1 Commune	Bảo Lâm 1	Bao Lam 1	4	68
25057	bao_lam_5	Xã Bảo Lâm 5	Bao Lam 5 Commune	Bảo Lâm 5	Bao Lam 5	4	68
25063	bao_lam_4	Xã Bảo Lâm 4	Bao Lam 4 Commune	Bảo Lâm 4	Bao Lam 4	4	68
25084	bao_lam_2	Xã Bảo Lâm 2	Bao Lam 2 Commune	Bảo Lâm 2	Bao Lam 2	4	68
25093	bao_lam_3	Xã Bảo Lâm 3	Bao Lam 3 Commune	Bảo Lâm 3	Bao Lam 3	4	68
25099	da_huoai	Xã Đạ Huoai	Da Huoai Commune	Đạ Huoai	Da Huoai	4	68
25105	da_huoai_2	Xã Đạ Huoai 2	Da Huoai 2 Commune	Đạ Huoai 2	Da Huoai 2	4	68
25114	da_huoai_3	Xã Đạ Huoai 3	Da Huoai 3 Commune	Đạ Huoai 3	Da Huoai 3	4	68
25126	da_teh	Xã Đạ Tẻh	Da Teh Commune	Đạ Tẻh	Da Teh	4	68
25135	da_teh_3	Xã Đạ Tẻh 3	Da Teh 3 Commune	Đạ Tẻh 3	Da Teh 3	4	68
25138	da_teh_2	Xã Đạ Tẻh 2	Da Teh 2 Commune	Đạ Tẻh 2	Da Teh 2	4	68
25159	cat_tien	Xã Cát Tiên	Cat Tien Commune	Cát Tiên	Cat Tien	4	68
25162	cat_tien_3	Xã Cát Tiên 3	Cat Tien 3 Commune	Cát Tiên 3	Cat Tien 3	4	68
25180	cat_tien_2	Xã Cát Tiên 2	Cat Tien 2 Commune	Cát Tiên 2	Cat Tien 2	4	68
23272	phu_quy	Đặc khu Phú Quý	Phu Quy Special administrative region	Phú Quý	Phu Quy	5	68
25195	binh_phuoc	Phường Bình Phước	Binh Phuoc Ward	Bình Phước	Binh Phuoc	3	75
25210	dong_xoai	Phường Đồng Xoài	Dong Xoai Ward	Đồng Xoài	Dong Xoai	3	75
25217	phuoc_long	Phường Phước Long	Phuoc Long Ward	Phước Long	Phuoc Long	3	75
25220	phuoc_binh	Phường Phước Bình	Phuoc Binh Ward	Phước Bình	Phuoc Binh	3	75
25326	binh_long	Phường Bình Long	Binh Long Ward	Bình Long	Binh Long	3	75
25333	an_loc	Phường An Lộc	An Loc Ward	An Lộc	An Loc	3	75
25432	chon_thanh	Phường Chơn Thành	Chon Thanh Ward	Chơn Thành	Chon Thanh	3	75
25441	minh_hung	Phường Minh Hưng	Minh Hung Ward	Minh Hưng	Minh Hung	3	75
25993	trang_dai	Phường Trảng Dài	Trang Dai Ward	Trảng Dài	Trang Dai	3	75
26005	ho_nai	Phường Hố Nai	Ho Nai Ward	Hố Nai	Ho Nai	3	75
26017	tam_hiep	Phường Tam Hiệp	Tam Hiep Ward	Tam Hiệp	Tam Hiep	3	75
26020	long_binh	Phường Long Bình	Long Binh Ward	Long Bình	Long Binh	3	75
26041	tran_bien	Phường Trấn Biên	Tran Bien Ward	Trấn Biên	Tran Bien	3	75
26068	bien_hoa	Phường Biên Hòa	Bien Hoa Ward	Biên Hòa	Bien Hoa	3	75
26080	long_khanh	Phường Long Khánh	Long Khanh Ward	Long Khánh	Long Khanh	3	75
26089	binh_loc	Phường Bình Lộc	Binh Loc Ward	Bình Lộc	Binh Loc	3	75
26098	bao_vinh	Phường Bảo Vinh	Bao Vinh Ward	Bảo Vinh	Bao Vinh	3	75
26104	xuan_lap	Phường Xuân Lập	Xuan Lap Ward	Xuân Lập	Xuan Lap	3	75
26113	hang_gon	Phường Hàng Gòn	Hang Gon Ward	Hàng Gòn	Hang Gon	3	75
26188	tan_trieu	Phường Tân Triều	Tan Trieu Ward	Tân Triều	Tan Trieu	3	75
26374	tam_phuoc	Phường Tam Phước	Tam Phuoc Ward	Tam Phước	Tam Phuoc	3	75
26377	phuoc_tan	Phường Phước Tân	Phuoc Tan Ward	Phước Tân	Phuoc Tan	3	75
26380	long_hung	Phường Long Hưng	Long Hung Ward	Long Hưng	Long Hung	3	75
25222	bu_gia_map	Xã Bù Gia Mập	Bu Gia Map Commune	Bù Gia Mập	Bu Gia Map	4	75
25225	dak_o	Xã Đăk Ơ	Dak O Commune	Đăk Ơ	Dak O	4	75
25231	da_kia	Xã Đa Kia	Da Kia Commune	Đa Kia	Da Kia	4	75
25246	binh_tan	Xã Bình Tân	Binh Tan Commune	Bình Tân	Binh Tan	4	75
25252	phu_rieng	Xã Phú Riềng	Phu Rieng Commune	Phú Riềng	Phu Rieng	4	75
25255	long_ha	Xã Long Hà	Long Ha Commune	Long Hà	Long Ha	4	75
25261	phu_trung	Xã Phú Trung	Phu Trung Commune	Phú Trung	Phu Trung	4	75
25267	phu_nghia	Xã Phú Nghĩa	Phu Nghia Commune	Phú Nghĩa	Phu Nghia	4	75
25270	loc_ninh	Xã Lộc Ninh	Loc Ninh Commune	Lộc Ninh	Loc Ninh	4	75
25279	loc_tan	Xã Lộc Tấn	Loc Tan Commune	Lộc Tấn	Loc Tan	4	75
25280	loc_thanh	Xã Lộc Thạnh	Loc Thanh Commune	Lộc Thạnh	Loc Thanh	4	75
25292	loc_quang	Xã Lộc Quang	Loc Quang Commune	Lộc Quang	Loc Quang	4	75
25294	loc_thanh	Xã Lộc Thành	Loc Thanh Commune	Lộc Thành	Loc Thanh	4	75
25303	loc_hung	Xã Lộc Hưng	Loc Hung Commune	Lộc Hưng	Loc Hung	4	75
25308	thien_hung	Xã Thiện Hưng	Thien Hung Commune	Thiện Hưng	Thien Hung	4	75
25309	hung_phuoc	Xã Hưng Phước	Hung Phuoc Commune	Hưng Phước	Hung Phuoc	4	75
25318	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	75
25345	tan_hung	Xã Tân Hưng	Tan Hung Commune	Tân Hưng	Tan Hung	4	75
25349	minh_duc	Xã Minh Đức	Minh Duc Commune	Minh Đức	Minh Duc	4	75
25351	tan_quan	Xã Tân Quan	Tan Quan Commune	Tân Quan	Tan Quan	4	75
25357	tan_khai	Xã Tân Khai	Tan Khai Commune	Tân Khai	Tan Khai	4	75
25363	dong_phu	Xã Đồng Phú	Dong Phu Commune	Đồng Phú	Dong Phu	4	75
25378	tan_loi	Xã Tân Lợi	Tan Loi Commune	Tân Lợi	Tan Loi	4	75
25387	thuan_loi	Xã Thuận Lợi	Thuan Loi Commune	Thuận Lợi	Thuan Loi	4	75
25390	dong_tam	Xã Đồng Tâm	Dong Tam Commune	Đồng Tâm	Dong Tam	4	75
25396	bu_dang	Xã Bù Đăng	Bu Dang Commune	Bù Đăng	Bu Dang	4	75
25399	dak_nhau	Xã Đak Nhau	Dak Nhau Commune	Đak Nhau	Dak Nhau	4	75
25402	tho_son	Xã Thọ Sơn	Tho Son Commune	Thọ Sơn	Tho Son	4	75
25405	bom_bo	Xã Bom Bo	Bom Bo Commune	Bom Bo	Bom Bo	4	75
25417	nghia_trung	Xã Nghĩa Trung	Nghia Trung Commune	Nghĩa Trung	Nghia Trung	4	75
25420	phuoc_son	Xã Phước Sơn	Phuoc Son Commune	Phước Sơn	Phuoc Son	4	75
25450	nha_bich	Xã Nha Bích	Nha Bich Commune	Nha Bích	Nha Bich	4	75
26116	tan_phu	Xã Tân Phú	Tan Phu Commune	Tân Phú	Tan Phu	4	75
26119	dak_lua	Xã Đak Lua	Dak Lua Commune	Đak Lua	Dak Lua	4	75
26122	nam_cat_tien	Xã Nam Cát Tiên	Nam Cat Tien Commune	Nam Cát Tiên	Nam Cat Tien	4	75
26134	ta_lai	Xã Tà Lài	Ta Lai Commune	Tà Lài	Ta Lai	4	75
26158	phu_lam	Xã Phú Lâm	Phu Lam Commune	Phú Lâm	Phu Lam	4	75
26170	tri_an	Xã Trị An	Tri An Commune	Trị An	Tri An	4	75
26173	phu_ly	Xã Phú Lý	Phu Ly Commune	Phú Lý	Phu Ly	4	75
26179	tan_an	Xã Tân An	Tan An Commune	Tân An	Tan An	4	75
26206	dinh_quan	Xã Định Quán	Dinh Quan Commune	Định Quán	Dinh Quan	4	75
26209	thanh_son	Xã Thanh Sơn	Thanh Son Commune	Thanh Sơn	Thanh Son	4	75
26215	phu_vinh	Xã Phú Vinh	Phu Vinh Commune	Phú Vinh	Phu Vinh	4	75
26221	phu_hoa	Xã Phú Hòa	Phu Hoa Commune	Phú Hòa	Phu Hoa	4	75
26227	la_nga	Xã La Ngà	La Nga Commune	La Ngà	La Nga	4	75
26248	trang_bom	Xã Trảng Bom	Trang Bom Commune	Trảng Bom	Trang Bom	4	75
26254	bau_ham	Xã Bàu Hàm	Bau Ham Commune	Bàu Hàm	Bau Ham	4	75
26278	binh_minh	Xã Bình Minh	Binh Minh Commune	Bình Minh	Binh Minh	4	75
26281	hung_thinh	Xã Hưng Thịnh	Hung Thinh Commune	Hưng Thịnh	Hung Thinh	4	75
26296	an_vien	Xã An Viễn	An Vien Commune	An Viễn	An Vien	4	75
26299	thong_nhat	Xã Thống Nhất	Thong Nhat Commune	Thống Nhất	Thong Nhat	4	75
26311	gia_kiem	Xã Gia Kiệm	Gia Kiem Commune	Gia Kiệm	Gia Kiem	4	75
26326	dau_giay	Xã Dầu Giây	Dau Giay Commune	Dầu Giây	Dau Giay	4	75
26332	xuan_que	Xã Xuân Quế	Xuan Que Commune	Xuân Quế	Xuan Que	4	75
26341	cam_my	Xã Cẩm Mỹ	Cam My Commune	Cẩm Mỹ	Cam My	4	75
26347	xuan_duong	Xã Xuân Đường	Xuan Duong Commune	Xuân Đường	Xuan Duong	4	75
26359	xuan_dong	Xã Xuân Đông	Xuan Dong Commune	Xuân Đông	Xuan Dong	4	75
26362	song_ray	Xã Sông Ray	Song Ray Commune	Sông Ray	Song Ray	4	75
26368	long_thanh	Xã Long Thành	Long Thanh Commune	Long Thành	Long Thanh	4	75
26383	an_phuoc	Xã An Phước	An Phuoc Commune	An Phước	An Phuoc	4	75
26389	binh_an	Xã Bình An	Binh An Commune	Bình An	Binh An	4	75
26413	long_phuoc	Xã Long Phước	Long Phuoc Commune	Long Phước	Long Phuoc	4	75
26422	phuoc_thai	Xã Phước Thái	Phuoc Thai Commune	Phước Thái	Phuoc Thai	4	75
26425	xuan_loc	Xã Xuân Lộc	Xuan Loc Commune	Xuân Lộc	Xuan Loc	4	75
26428	xuan_bac	Xã Xuân Bắc	Xuan Bac Commune	Xuân Bắc	Xuan Bac	4	75
26434	xuan_thanh	Xã Xuân Thành	Xuan Thanh Commune	Xuân Thành	Xuan Thanh	4	75
26446	xuan_hoa	Xã Xuân Hòa	Xuan Hoa Commune	Xuân Hòa	Xuan Hoa	4	75
26458	xuan_phu	Xã Xuân Phú	Xuan Phu Commune	Xuân Phú	Xuan Phu	4	75
26461	xuan_dinh	Xã Xuân Định	Xuan Dinh Commune	Xuân Định	Xuan Dinh	4	75
26485	nhon_trach	Xã Nhơn Trạch	Nhon Trach Commune	Nhơn Trạch	Nhon Trach	4	75
26491	dai_phuoc	Xã Đại Phước	Dai Phuoc Commune	Đại Phước	Dai Phuoc	4	75
26503	phuoc_an	Xã Phước An	Phuoc An Commune	Phước An	Phuoc An	4	75
25747	thu_dau_mot	Phường Thủ Dầu Một	Thu Dau Mot Ward	Thủ Dầu Một	Thu Dau Mot	3	79
25750	phu_loi	Phường Phú Lợi	Phu Loi Ward	Phú Lợi	Phu Loi	3	79
25760	binh_duong	Phường Bình Dương	Binh Duong Ward	Bình Dương	Binh Duong	3	79
25768	phu_an	Phường Phú An	Phu An Ward	Phú An	Phu An	3	79
25771	chanh_hiep	Phường Chánh Hiệp	Chanh Hiep Ward	Chánh Hiệp	Chanh Hiep	3	79
25813	ben_cat	Phường Bến Cát	Ben Cat Ward	Bến Cát	Ben Cat	3	79
25837	chanh_phu_hoa	Phường Chánh Phú Hòa	Chanh Phu Hoa Ward	Chánh Phú Hòa	Chanh Phu Hoa	3	79
25840	long_nguyen	Phường Long Nguyên	Long Nguyen Ward	Long Nguyên	Long Nguyen	3	79
25843	tay_nam	Phường Tây Nam	Tay Nam Ward	Tây Nam	Tay Nam	3	79
25846	thoi_hoa	Phường Thới Hòa	Thoi Hoa Ward	Thới Hòa	Thoi Hoa	3	79
25849	hoa_loi	Phường Hòa Lợi	Hoa Loi Ward	Hòa Lợi	Hoa Loi	3	79
25888	tan_uyen	Phường Tân Uyên	Tan Uyen Ward	Tân Uyên	Tan Uyen	3	79
25891	tan_khanh	Phường Tân Khánh	Tan Khanh Ward	Tân Khánh	Tan Khanh	3	79
25912	vinh_tan	Phường Vĩnh Tân	Vinh Tan Ward	Vĩnh Tân	Vinh Tan	3	79
25915	binh_co	Phường Bình Cơ	Binh Co Ward	Bình Cơ	Binh Co	3	79
25920	tan_hiep	Phường Tân Hiệp	Tan Hiep Ward	Tân Hiệp	Tan Hiep	3	79
25942	di_an	Phường Dĩ An	Di An Ward	Dĩ An	Di An	3	79
25945	tan_dong_hiep	Phường Tân Đông Hiệp	Tan Dong Hiep Ward	Tân Đông Hiệp	Tan Dong Hiep	3	79
25951	dong_hoa	Phường Đông Hòa	Dong Hoa Ward	Đông Hòa	Dong Hoa	3	79
25966	lai_thieu	Phường Lái Thiêu	Lai Thieu Ward	Lái Thiêu	Lai Thieu	3	79
25969	thuan_giao	Phường Thuận Giao	Thuan Giao Ward	Thuận Giao	Thuan Giao	3	79
25975	an_phu	Phường An Phú	An Phu Ward	An Phú	An Phu	3	79
25978	thuan_an	Phường Thuận An	Thuan An Ward	Thuận An	Thuan An	3	79
25987	binh_hoa	Phường Bình Hòa	Binh Hoa Ward	Bình Hòa	Binh Hoa	3	79
26506	vung_tau	Phường Vũng Tàu	Vung Tau Ward	Vũng Tàu	Vung Tau	3	79
26526	tam_thang	Phường Tam Thắng	Tam Thang Ward	Tam Thắng	Tam Thang	3	79
26536	rach_dua	Phường Rạch Dừa	Rach Dua Ward	Rạch Dừa	Rach Dua	3	79
26542	phuoc_thang	Phường Phước Thắng	Phuoc Thang Ward	Phước Thắng	Phuoc Thang	3	79
26560	ba_ria	Phường Bà Rịa	Ba Ria Ward	Bà Rịa	Ba Ria	3	79
26566	long_huong	Phường Long Hương	Long Huong Ward	Long Hương	Long Huong	3	79
26572	tam_long	Phường Tam Long	Tam Long Ward	Tam Long	Tam Long	3	79
26704	phu_my	Phường Phú Mỹ	Phu My Ward	Phú Mỹ	Phu My	3	79
26710	tan_hai	Phường Tân Hải	Tan Hai Ward	Tân Hải	Tan Hai	3	79
26713	tan_phuoc	Phường Tân Phước	Tan Phuoc Ward	Tân Phước	Tan Phuoc	3	79
26725	tan_thanh	Phường Tân Thành	Tan Thanh Ward	Tân Thành	Tan Thanh	3	79
26737	tan_dinh	Phường Tân Định	Tan Dinh Ward	Tân Định	Tan Dinh	3	79
26740	sai_gon	Phường Sài Gòn	Sai Gon Ward	Sài Gòn	Sai Gon	3	79
26743	ben_thanh	Phường Bến Thành	Ben Thanh Ward	Bến Thành	Ben Thanh	3	79
26758	cau_ong_lanh	Phường Cầu Ông Lãnh	Cau Ong Lanh Ward	Cầu Ông Lãnh	Cau Ong Lanh	3	79
26767	an_phu_dong	Phường An Phú Đông	An Phu Dong Ward	An Phú Đông	An Phu Dong	3	79
26773	thoi_an	Phường Thới An	Thoi An Ward	Thới An	Thoi An	3	79
26782	tan_thoi_hiep	Phường Tân Thới Hiệp	Tan Thoi Hiep Ward	Tân Thới Hiệp	Tan Thoi Hiep	3	79
26785	trung_my_tay	Phường Trung Mỹ Tây	Trung My Tay Ward	Trung Mỹ Tây	Trung My Tay	3	79
26791	dong_hung_thuan	Phường Đông Hưng Thuận	Dong Hung Thuan Ward	Đông Hưng Thuận	Dong Hung Thuan	3	79
26800	linh_xuan	Phường Linh Xuân	Linh Xuan Ward	Linh Xuân	Linh Xuan	3	79
26803	tam_binh	Phường Tam Bình	Tam Binh Ward	Tam Bình	Tam Binh	3	79
26809	hiep_binh	Phường Hiệp Bình	Hiep Binh Ward	Hiệp Bình	Hiep Binh	3	79
26824	thu_duc	Phường Thủ Đức	Thu Duc Ward	Thủ Đức	Thu Duc	3	79
26833	long_binh	Phường Long Bình	Long Binh Ward	Long Bình	Long Binh	3	79
26842	tang_nhon_phu	Phường Tăng Nhơn Phú	Tang Nhon Phu Ward	Tăng Nhơn Phú	Tang Nhon Phu	3	79
26848	phuoc_long	Phường Phước Long	Phuoc Long Ward	Phước Long	Phuoc Long	3	79
26857	long_phuoc	Phường Long Phước	Long Phuoc Ward	Long Phước	Long Phuoc	3	79
26860	long_truong	Phường Long Trường	Long Truong Ward	Long Trường	Long Truong	3	79
26876	an_nhon	Phường An Nhơn	An Nhon Ward	An Nhơn	An Nhon	3	79
26878	an_hoi_dong	Phường An Hội Đông	An Hoi Dong Ward	An Hội Đông	An Hoi Dong	3	79
26882	an_hoi_tay	Phường An Hội Tây	An Hoi Tay Ward	An Hội Tây	An Hoi Tay	3	79
26884	go_vap	Phường Gò Vấp	Go Vap Ward	Gò Vấp	Go Vap	3	79
26890	hanh_thong	Phường Hạnh Thông	Hanh Thong Ward	Hạnh Thông	Hanh Thong	3	79
26898	thong_tay_hoi	Phường Thông Tây Hội	Thong Tay Hoi Ward	Thông Tây Hội	Thong Tay Hoi	3	79
26905	binh_loi_trung	Phường Bình Lợi Trung	Binh Loi Trung Ward	Bình Lợi Trung	Binh Loi Trung	3	79
26911	binh_quoi	Phường Bình Quới	Binh Quoi Ward	Bình Quới	Binh Quoi	3	79
26929	binh_thanh	Phường Bình Thạnh	Binh Thanh Ward	Bình Thạnh	Binh Thanh	3	79
26944	gia_dinh	Phường Gia Định	Gia Dinh Ward	Gia Định	Gia Dinh	3	79
26956	thanh_my_tay	Phường Thạnh Mỹ Tây	Thanh My Tay Ward	Thạnh Mỹ Tây	Thanh My Tay	3	79
26968	tan_son_nhat	Phường Tân Sơn Nhất	Tan Son Nhat Ward	Tân Sơn Nhất	Tan Son Nhat	3	79
26977	tan_son_hoa	Phường Tân Sơn Hòa	Tan Son Hoa Ward	Tân Sơn Hòa	Tan Son Hoa	3	79
26983	bay_hien	Phường Bảy Hiền	Bay Hien Ward	Bảy Hiền	Bay Hien	3	79
26995	tan_hoa	Phường Tân Hòa	Tan Hoa Ward	Tân Hòa	Tan Hoa	3	79
27004	tan_binh	Phường Tân Bình	Tan Binh Ward	Tân Bình	Tan Binh	3	79
27007	tan_son	Phường Tân Sơn	Tan Son Ward	Tân Sơn	Tan Son	3	79
27013	tay_thanh	Phường Tây Thạnh	Tay Thanh Ward	Tây Thạnh	Tay Thanh	3	79
27019	tan_son_nhi	Phường Tân Sơn Nhì	Tan Son Nhi Ward	Tân Sơn Nhì	Tan Son Nhi	3	79
27022	phu_tho_hoa	Phường Phú Thọ Hòa	Phu Tho Hoa Ward	Phú Thọ Hòa	Phu Tho Hoa	3	79
27028	phu_thanh	Phường Phú Thạnh	Phu Thanh Ward	Phú Thạnh	Phu Thanh	3	79
27031	tan_phu	Phường Tân Phú	Tan Phu Ward	Tân Phú	Tan Phu	3	79
27043	duc_nhuan	Phường Đức Nhuận	Duc Nhuan Ward	Đức Nhuận	Duc Nhuan	3	79
27058	cau_kieu	Phường Cầu Kiệu	Cau Kieu Ward	Cầu Kiệu	Cau Kieu	3	79
27073	phu_nhuan	Phường Phú Nhuận	Phu Nhuan Ward	Phú Nhuận	Phu Nhuan	3	79
27094	an_khanh	Phường An Khánh	An Khanh Ward	An Khánh	An Khanh	3	79
27097	binh_trung	Phường Bình Trưng	Binh Trung Ward	Bình Trưng	Binh Trung	3	79
27112	cat_lai	Phường Cát Lái	Cat Lai Ward	Cát Lái	Cat Lai	3	79
27139	xuan_hoa	Phường Xuân Hòa	Xuan Hoa Ward	Xuân Hòa	Xuan Hoa	3	79
27142	nhieu_loc	Phường Nhiêu Lộc	Nhieu Loc Ward	Nhiêu Lộc	Nhieu Loc	3	79
27154	ban_co	Phường Bàn Cờ	Ban Co Ward	Bàn Cờ	Ban Co	3	79
27163	hoa_hung	Phường Hòa Hưng	Hoa Hung Ward	Hòa Hưng	Hoa Hung	3	79
27169	dien_hong	Phường Diên Hồng	Dien Hong Ward	Diên Hồng	Dien Hong	3	79
27190	vuon_lai	Phường Vườn Lài	Vuon Lai Ward	Vườn Lài	Vuon Lai	3	79
27211	hoa_binh	Phường Hòa Bình	Hoa Binh Ward	Hòa Bình	Hoa Binh	3	79
27226	phu_tho	Phường Phú Thọ	Phu Tho Ward	Phú Thọ	Phu Tho	3	79
27232	binh_thoi	Phường Bình Thới	Binh Thoi Ward	Bình Thới	Binh Thoi	3	79
27238	minh_phung	Phường Minh Phụng	Minh Phung Ward	Minh Phụng	Minh Phung	3	79
27259	xom_chieu	Phường Xóm Chiếu	Xom Chieu Ward	Xóm Chiếu	Xom Chieu	3	79
27265	khanh_hoi	Phường Khánh Hội	Khanh Hoi Ward	Khánh Hội	Khanh Hoi	3	79
27286	vinh_hoi	Phường Vĩnh Hội	Vinh Hoi Ward	Vĩnh Hội	Vinh Hoi	3	79
27301	cho_quan	Phường Chợ Quán	Cho Quan Ward	Chợ Quán	Cho Quan	3	79
27316	an_dong	Phường An Đông	An Dong Ward	An Đông	An Dong	3	79
27343	cho_lon	Phường Chợ Lớn	Cho Lon Ward	Chợ Lớn	Cho Lon	3	79
27349	phu_lam	Phường Phú Lâm	Phu Lam Ward	Phú Lâm	Phu Lam	3	79
27364	binh_phu	Phường Bình Phú	Binh Phu Ward	Bình Phú	Binh Phu	3	79
27367	binh_tay	Phường Bình Tây	Binh Tay Ward	Bình Tây	Binh Tay	3	79
27373	binh_tien	Phường Bình Tiên	Binh Tien Ward	Bình Tiên	Binh Tien	3	79
27418	chanh_hung	Phường Chánh Hưng	Chanh Hung Ward	Chánh Hưng	Chanh Hung	3	79
27424	binh_dong	Phường Bình Đông	Binh Dong Ward	Bình Đông	Binh Dong	3	79
27427	phu_dinh	Phường Phú Định	Phu Dinh Ward	Phú Định	Phu Dinh	3	79
27439	binh_hung_hoa	Phường Bình Hưng Hòa	Binh Hung Hoa Ward	Bình Hưng Hòa	Binh Hung Hoa	3	79
27442	binh_tan	Phường Bình Tân	Binh Tan Ward	Bình Tân	Binh Tan	3	79
27448	binh_tri_dong	Phường Bình Trị Đông	Binh Tri Dong Ward	Bình Trị Đông	Binh Tri Dong	3	79
27457	tan_tao	Phường Tân Tạo	Tan Tao Ward	Tân Tạo	Tan Tao	3	79
27460	an_lac	Phường An Lạc	An Lac Ward	An Lạc	An Lac	3	79
27475	tan_hung	Phường Tân Hưng	Tan Hung Ward	Tân Hưng	Tan Hung	3	79
27478	tan_thuan	Phường Tân Thuận	Tan Thuan Ward	Tân Thuận	Tan Thuan	3	79
27484	phu_thuan	Phường Phú Thuận	Phu Thuan Ward	Phú Thuận	Phu Thuan	3	79
27487	tan_my	Phường Tân Mỹ	Tan My Ward	Tân Mỹ	Tan My	3	79
25777	dau_tieng	Xã Dầu Tiếng	Dau Tieng Commune	Dầu Tiếng	Dau Tieng	4	79
25780	minh_thanh	Xã Minh Thạnh	Minh Thanh Commune	Minh Thạnh	Minh Thanh	4	79
25792	long_hoa	Xã Long Hòa	Long Hoa Commune	Long Hòa	Long Hoa	4	79
25807	thanh_an	Xã Thanh An	Thanh An Commune	Thanh An	Thanh An	4	79
25819	tru_van_tho	Xã Trừ Văn Thố	Tru Van Tho Commune	Trừ Văn Thố	Tru Van Tho	4	79
25822	bau_bang	Xã Bàu Bàng	Bau Bang Commune	Bàu Bàng	Bau Bang	4	79
25858	phu_giao	Xã Phú Giáo	Phu Giao Commune	Phú Giáo	Phu Giao	4	79
25864	phuoc_thanh	Xã Phước Thành	Phuoc Thanh Commune	Phước Thành	Phuoc Thanh	4	79
25867	an_long	Xã An Long	An Long Commune	An Long	An Long	4	79
25882	phuoc_hoa	Xã Phước Hòa	Phuoc Hoa Commune	Phước Hòa	Phuoc Hoa	4	79
25906	bac_tan_uyen	Xã Bắc Tân Uyên	Bac Tan Uyen Commune	Bắc Tân Uyên	Bac Tan Uyen	4	79
25909	thuong_tan	Xã Thường Tân	Thuong Tan Commune	Thường Tân	Thuong Tan	4	79
26545	long_son	Xã Long Sơn	Long Son Commune	Long Sơn	Long Son	4	79
26575	ngai_giao	Xã Ngãi Giao	Ngai Giao Commune	Ngãi Giao	Ngai Giao	4	79
26584	xuan_son	Xã Xuân Sơn	Xuan Son Commune	Xuân Sơn	Xuan Son	4	79
26590	binh_gia	Xã Bình Giã	Binh Gia Commune	Bình Giã	Binh Gia	4	79
26596	chau_duc	Xã Châu Đức	Chau Duc Commune	Châu Đức	Chau Duc	4	79
26608	kim_long	Xã Kim Long	Kim Long Commune	Kim Long	Kim Long	4	79
26617	nghia_thanh	Xã Nghĩa Thành	Nghia Thanh Commune	Nghĩa Thành	Nghia Thanh	4	79
26620	ho_tram	Xã Hồ Tràm	Ho Tram Commune	Hồ Tràm	Ho Tram	4	79
26632	xuyen_moc	Xã Xuyên Mộc	Xuyen Moc Commune	Xuyên Mộc	Xuyen Moc	4	79
26638	bau_lam	Xã Bàu Lâm	Bau Lam Commune	Bàu Lâm	Bau Lam	4	79
26641	hoa_hoi	Xã Hòa Hội	Hoa Hoi Commune	Hòa Hội	Hoa Hoi	4	79
26647	hoa_hiep	Xã Hòa Hiệp	Hoa Hiep Commune	Hòa Hiệp	Hoa Hiep	4	79
26656	binh_chau	Xã Bình Châu	Binh Chau Commune	Bình Châu	Binh Chau	4	79
26659	long_dien	Xã Long Điền	Long Dien Commune	Long Điền	Long Dien	4	79
26662	long_hai	Xã Long Hải	Long Hai Commune	Long Hải	Long Hai	4	79
26680	dat_do	Xã Đất Đỏ	Dat Do Commune	Đất Đỏ	Dat Do	4	79
26686	phuoc_hai	Xã Phước Hải	Phuoc Hai Commune	Phước Hải	Phuoc Hai	4	79
26728	chau_pha	Xã Châu Pha	Chau Pha Commune	Châu Pha	Chau Pha	4	79
27496	tan_an_hoi	Xã Tân An Hội	Tan An Hoi Commune	Tân An Hội	Tan An Hoi	4	79
27508	an_nhon_tay	Xã An Nhơn Tây	An Nhon Tay Commune	An Nhơn Tây	An Nhon Tay	4	79
27511	nhuan_duc	Xã Nhuận Đức	Nhuan Duc Commune	Nhuận Đức	Nhuan Duc	4	79
27526	thai_my	Xã Thái Mỹ	Thai My Commune	Thái Mỹ	Thai My	4	79
27541	phu_hoa_dong	Xã Phú Hòa Đông	Phu Hoa Dong Commune	Phú Hòa Đông	Phu Hoa Dong	4	79
27544	binh_my	Xã Bình Mỹ	Binh My Commune	Bình Mỹ	Binh My	4	79
27553	cu_chi	Xã Củ Chi	Cu Chi Commune	Củ Chi	Cu Chi	4	79
27559	hoc_mon	Xã Hóc Môn	Hoc Mon Commune	Hóc Môn	Hoc Mon	4	79
27568	dong_thanh	Xã Đông Thạnh	Dong Thanh Commune	Đông Thạnh	Dong Thanh	4	79
27577	xuan_thoi_son	Xã Xuân Thới Sơn	Xuan Thoi Son Commune	Xuân Thới Sơn	Xuan Thoi Son	4	79
27592	ba_diem	Xã Bà Điểm	Ba Diem Commune	Bà Điểm	Ba Diem	4	79
27595	tan_nhut	Xã Tân Nhựt	Tan Nhut Commune	Tân Nhựt	Tan Nhut	4	79
27601	vinh_loc	Xã Vĩnh Lộc	Vinh Loc Commune	Vĩnh Lộc	Vinh Loc	4	79
27604	tan_vinh_loc	Xã Tân Vĩnh Lộc	Tan Vinh Loc Commune	Tân Vĩnh Lộc	Tan Vinh Loc	4	79
27610	binh_loi	Xã Bình Lợi	Binh Loi Commune	Bình Lợi	Binh Loi	4	79
27619	binh_hung	Xã Bình Hưng	Binh Hung Commune	Bình Hưng	Binh Hung	4	79
27628	hung_long	Xã Hưng Long	Hung Long Commune	Hưng Long	Hung Long	4	79
27637	binh_chanh	Xã Bình Chánh	Binh Chanh Commune	Bình Chánh	Binh Chanh	4	79
27655	nha_be	Xã Nhà Bè	Nha Be Commune	Nhà Bè	Nha Be	4	79
27658	hiep_phuoc	Xã Hiệp Phước	Hiep Phuoc Commune	Hiệp Phước	Hiep Phuoc	4	79
27664	can_gio	Xã Cần Giờ	Can Gio Commune	Cần Giờ	Can Gio	4	79
27667	binh_khanh	Xã Bình Khánh	Binh Khanh Commune	Bình Khánh	Binh Khanh	4	79
27673	an_thoi_dong	Xã An Thới Đông	An Thoi Dong Commune	An Thới Đông	An Thoi Dong	4	79
27676	thanh_an	Xã Thạnh An	Thanh An Commune	Thạnh An	Thanh An	4	79
26732	con_dao	Đặc khu Côn Đảo	Con Dao Special administrative region	Côn Đảo	Con Dao	5	79
25459	tan_ninh	Phường Tân Ninh	Tan Ninh Ward	Tân Ninh	Tan Ninh	3	80
25480	binh_minh	Phường Bình Minh	Binh Minh Ward	Bình Minh	Binh Minh	3	80
25567	ninh_thanh	Phường Ninh Thạnh	Ninh Thanh Ward	Ninh Thạnh	Ninh Thanh	3	80
25630	long_hoa	Phường Long Hoa	Long Hoa Ward	Long Hoa	Long Hoa	3	80
25633	thanh_dien	Phường Thanh Điền	Thanh Dien Ward	Thanh Điền	Thanh Dien	3	80
25645	hoa_thanh	Phường Hòa Thành	Hoa Thanh Ward	Hòa Thành	Hoa Thanh	3	80
25654	go_dau	Phường Gò Dầu	Go Dau Ward	Gò Dầu	Go Dau	3	80
25672	gia_loc	Phường Gia Lộc	Gia Loc Ward	Gia Lộc	Gia Loc	3	80
25708	trang_bang	Phường Trảng Bàng	Trang Bang Ward	Trảng Bàng	Trang Bang	3	80
25732	an_tinh	Phường An Tịnh	An Tinh Ward	An Tịnh	An Tinh	3	80
27694	long_an	Phường Long An	Long An Ward	Long An	Long An	3	80
27712	tan_an	Phường Tân An	Tan An Ward	Tân An	Tan An	3	80
27715	khanh_hau	Phường Khánh Hậu	Khanh Hau Ward	Khánh Hậu	Khanh Hau	3	80
27787	kien_tuong	Phường Kiến Tường	Kien Tuong Ward	Kiến Tường	Kien Tuong	3	80
25486	tan_bien	Xã Tân Biên	Tan Bien Commune	Tân Biên	Tan Bien	4	80
25489	tan_lap	Xã Tân Lập	Tan Lap Commune	Tân Lập	Tan Lap	4	80
25498	thanh_binh	Xã Thạnh Bình	Thanh Binh Commune	Thạnh Bình	Thanh Binh	4	80
25510	tra_vong	Xã Trà Vong	Tra Vong Commune	Trà Vong	Tra Vong	4	80
25516	tan_chau	Xã Tân Châu	Tan Chau Commune	Tân Châu	Tan Chau	4	80
25522	tan_dong	Xã Tân Đông	Tan Dong Commune	Tân Đông	Tan Dong	4	80
25525	tan_hoi	Xã Tân Hội	Tan Hoi Commune	Tân Hội	Tan Hoi	4	80
25531	tan_hoa	Xã Tân Hòa	Tan Hoa Commune	Tân Hòa	Tan Hoa	4	80
25534	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	80
25549	tan_phu	Xã Tân Phú	Tan Phu Commune	Tân Phú	Tan Phu	4	80
25552	duong_minh_chau	Xã Dương Minh Châu	Duong Minh Chau Commune	Dương Minh Châu	Duong Minh Chau	4	80
25573	cau_khoi	Xã Cầu Khởi	Cau Khoi Commune	Cầu Khởi	Cau Khoi	4	80
25579	loc_ninh	Xã Lộc Ninh	Loc Ninh Commune	Lộc Ninh	Loc Ninh	4	80
25585	chau_thanh	Xã Châu Thành	Chau Thanh Commune	Châu Thành	Chau Thanh	4	80
25588	hao_duoc	Xã Hảo Đước	Hao Duoc Commune	Hảo Đước	Hao Duoc	4	80
25591	phuoc_vinh	Xã Phước Vinh	Phuoc Vinh Commune	Phước Vinh	Phuoc Vinh	4	80
25606	hoa_hoi	Xã Hòa Hội	Hoa Hoi Commune	Hòa Hội	Hoa Hoi	4	80
25621	ninh_dien	Xã Ninh Điền	Ninh Dien Commune	Ninh Điền	Ninh Dien	4	80
25657	thanh_duc	Xã Thạnh Đức	Thanh Duc Commune	Thạnh Đức	Thanh Duc	4	80
25663	phuoc_thanh	Xã Phước Thạnh	Phuoc Thanh Commune	Phước Thạnh	Phuoc Thanh	4	80
25666	truong_mit	Xã Truông Mít	Truong Mit Commune	Truông Mít	Truong Mit	4	80
25681	ben_cau	Xã Bến Cầu	Ben Cau Commune	Bến Cầu	Ben Cau	4	80
25684	long_chu	Xã Long Chữ	Long Chu Commune	Long Chữ	Long Chu	4	80
25702	long_thuan	Xã Long Thuận	Long Thuan Commune	Long Thuận	Long Thuan	4	80
25711	hung_thuan	Xã Hưng Thuận	Hung Thuan Commune	Hưng Thuận	Hung Thuan	4	80
25729	phuoc_chi	Xã Phước Chỉ	Phuoc Chi Commune	Phước Chỉ	Phuoc Chi	4	80
27721	tan_hung	Xã Tân Hưng	Tan Hung Commune	Tân Hưng	Tan Hung	4	80
27727	hung_dien	Xã Hưng Điền	Hung Dien Commune	Hưng Điền	Hung Dien	4	80
27736	vinh_thanh	Xã Vĩnh Thạnh	Vinh Thanh Commune	Vĩnh Thạnh	Vinh Thanh	4	80
27748	vinh_chau	Xã Vĩnh Châu	Vinh Chau Commune	Vĩnh Châu	Vinh Chau	4	80
27757	vinh_hung	Xã Vĩnh Hưng	Vinh Hung Commune	Vĩnh Hưng	Vinh Hung	4	80
27763	khanh_hung	Xã Khánh Hưng	Khanh Hung Commune	Khánh Hưng	Khanh Hung	4	80
27775	tuyen_binh	Xã Tuyên Bình	Tuyen Binh Commune	Tuyên Bình	Tuyen Binh	4	80
27793	binh_hiep	Xã Bình Hiệp	Binh Hiep Commune	Bình Hiệp	Binh Hiep	4	80
27811	binh_hoa	Xã Bình Hòa	Binh Hoa Commune	Bình Hòa	Binh Hoa	4	80
27817	tuyen_thanh	Xã Tuyên Thạnh	Tuyen Thanh Commune	Tuyên Thạnh	Tuyen Thanh	4	80
27823	moc_hoa	Xã Mộc Hóa	Moc Hoa Commune	Mộc Hóa	Moc Hoa	4	80
27826	tan_thanh	Xã Tân Thạnh	Tan Thanh Commune	Tân Thạnh	Tan Thanh	4	80
27838	nhon_hoa_lap	Xã Nhơn Hòa Lập	Nhon Hoa Lap Commune	Nhơn Hòa Lập	Nhon Hoa Lap	4	80
27841	hau_thanh	Xã Hậu Thạnh	Hau Thanh Commune	Hậu Thạnh	Hau Thanh	4	80
27856	nhon_ninh	Xã Nhơn Ninh	Nhon Ninh Commune	Nhơn Ninh	Nhon Ninh	4	80
27865	thanh_hoa	Xã Thạnh Hóa	Thanh Hoa Commune	Thạnh Hóa	Thanh Hoa	4	80
27868	binh_thanh	Xã Bình Thành	Binh Thanh Commune	Bình Thành	Binh Thanh	4	80
27877	thanh_phuoc	Xã Thạnh Phước	Thanh Phuoc Commune	Thạnh Phước	Thanh Phuoc	4	80
27889	tan_tay	Xã Tân Tây	Tan Tay Commune	Tân Tây	Tan Tay	4	80
27898	dong_thanh	Xã Đông Thành	Dong Thanh Commune	Đông Thành	Dong Thanh	4	80
27907	my_quy	Xã Mỹ Quý	My Quy Commune	Mỹ Quý	My Quy	4	80
27925	duc_hue	Xã Đức Huệ	Duc Hue Commune	Đức Huệ	Duc Hue	4	80
27931	hau_nghia	Xã Hậu Nghĩa	Hau Nghia Commune	Hậu Nghĩa	Hau Nghia	4	80
27937	duc_hoa	Xã Đức Hòa	Duc Hoa Commune	Đức Hòa	Duc Hoa	4	80
27943	an_ninh	Xã An Ninh	An Ninh Commune	An Ninh	An Ninh	4	80
27952	hiep_hoa	Xã Hiệp Hòa	Hiep Hoa Commune	Hiệp Hòa	Hiep Hoa	4	80
27964	duc_lap	Xã Đức Lập	Duc Lap Commune	Đức Lập	Duc Lap	4	80
27976	my_hanh	Xã Mỹ Hạnh	My Hanh Commune	Mỹ Hạnh	My Hanh	4	80
27979	hoa_khanh	Xã Hòa Khánh	Hoa Khanh Commune	Hòa Khánh	Hoa Khanh	4	80
27991	ben_luc	Xã Bến Lức	Ben Luc Commune	Bến Lức	Ben Luc	4	80
27994	thanh_loi	Xã Thạnh Lợi	Thanh Loi Commune	Thạnh Lợi	Thanh Loi	4	80
28003	luong_hoa	Xã Lương Hòa	Luong Hoa Commune	Lương Hòa	Luong Hoa	4	80
28015	binh_duc	Xã Bình Đức	Binh Duc Commune	Bình Đức	Binh Duc	4	80
28018	my_yen	Xã Mỹ Yên	My Yen Commune	Mỹ Yên	My Yen	4	80
28036	thu_thua	Xã Thủ Thừa	Thu Thua Commune	Thủ Thừa	Thu Thua	4	80
28051	my_thanh	Xã Mỹ Thạnh	My Thanh Commune	Mỹ Thạnh	My Thanh	4	80
28066	my_an	Xã Mỹ An	My An Commune	Mỹ An	My An	4	80
28072	tan_long	Xã Tân Long	Tan Long Commune	Tân Long	Tan Long	4	80
28075	tan_tru	Xã Tân Trụ	Tan Tru Commune	Tân Trụ	Tan Tru	4	80
28087	nhut_tao	Xã Nhựt Tảo	Nhut Tao Commune	Nhựt Tảo	Nhut Tao	4	80
28093	vam_co	Xã Vàm Cỏ	Vam Co Commune	Vàm Cỏ	Vam Co	4	80
28108	can_duoc	Xã Cần Đước	Can Duoc Commune	Cần Đước	Can Duoc	4	80
28114	rach_kien	Xã Rạch Kiến	Rach Kien Commune	Rạch Kiến	Rach Kien	4	80
28126	long_cang	Xã Long Cang	Long Cang Commune	Long Cang	Long Cang	4	80
28132	my_le	Xã Mỹ Lệ	My Le Commune	Mỹ Lệ	My Le	4	80
28138	tan_lan	Xã Tân Lân	Tan Lan Commune	Tân Lân	Tan Lan	4	80
28144	long_huu	Xã Long Hựu	Long Huu Commune	Long Hựu	Long Huu	4	80
28159	can_giuoc	Xã Cần Giuộc	Can Giuoc Commune	Cần Giuộc	Can Giuoc	4	80
28165	phuoc_ly	Xã Phước Lý	Phuoc Ly Commune	Phước Lý	Phuoc Ly	4	80
28177	my_loc	Xã Mỹ Lộc	My Loc Commune	Mỹ Lộc	My Loc	4	80
29944	an_phuoc	Xã An Phước	An Phuoc Commune	An Phước	An Phuoc	4	82
28201	phuoc_vinh_tay	Xã Phước Vĩnh Tây	Phuoc Vinh Tay Commune	Phước Vĩnh Tây	Phuoc Vinh Tay	4	80
28207	tan_tap	Xã Tân Tập	Tan Tap Commune	Tân Tập	Tan Tap	4	80
28210	tam_vu	Xã Tầm Vu	Tam Vu Commune	Tầm Vu	Tam Vu	4	80
28222	vinh_cong	Xã Vĩnh Công	Vinh Cong Commune	Vĩnh Công	Vinh Cong	4	80
28225	thuan_my	Xã Thuận Mỹ	Thuan My Commune	Thuận Mỹ	Thuan My	4	80
28243	an_luc_long	Xã An Lục Long	An Luc Long Commune	An Lục Long	An Luc Long	4	80
28249	dao_thanh	Phường Đạo Thạnh	Dao Thanh Ward	Đạo Thạnh	Dao Thanh	3	82
28261	my_tho	Phường Mỹ Tho	My Tho Ward	Mỹ Tho	My Tho	3	82
28270	thoi_son	Phường Thới Sơn	Thoi Son Ward	Thới Sơn	Thoi Son	3	82
28273	my_phong	Phường Mỹ Phong	My Phong Ward	Mỹ Phong	My Phong	3	82
28285	trung_an	Phường Trung An	Trung An Ward	Trung An	Trung An	3	82
28297	long_thuan	Phường Long Thuận	Long Thuan Ward	Long Thuận	Long Thuan	3	82
28306	go_cong	Phường Gò Công	Go Cong Ward	Gò Công	Go Cong	3	82
28315	binh_xuan	Phường Bình Xuân	Binh Xuan Ward	Bình Xuân	Binh Xuan	3	82
28435	my_phuoc_tay	Phường Mỹ Phước Tây	My Phuoc Tay Ward	Mỹ Phước Tây	My Phuoc Tay	3	82
28436	thanh_hoa	Phường Thanh Hòa	Thanh Hoa Ward	Thanh Hòa	Thanh Hoa	3	82
28439	cai_lay	Phường Cai Lậy	Cai Lay Ward	Cai Lậy	Cai Lay	3	82
28477	nhi_quy	Phường Nhị Quý	Nhi Quy Ward	Nhị Quý	Nhi Quy	3	82
28729	son_qui	Phường Sơn Qui	Son Qui Ward	Sơn Qui	Son Qui	3	82
29869	cao_lanh	Phường Cao Lãnh	Cao Lanh Ward	Cao Lãnh	Cao Lanh	3	82
29884	my_ngai	Phường Mỹ Ngãi	My Ngai Ward	Mỹ Ngãi	My Ngai	3	82
29888	my_tra	Phường Mỹ Trà	My Tra Ward	Mỹ Trà	My Tra	3	82
29905	sa_dec	Phường Sa Đéc	Sa Dec Ward	Sa Đéc	Sa Dec	3	82
29954	an_binh	Phường An Bình	An Binh Ward	An Bình	An Binh	3	82
29955	hong_ngu	Phường Hồng Ngự	Hong Ngu Ward	Hồng Ngự	Hong Ngu	3	82
29978	thuong_lac	Phường Thường Lạc	Thuong Lac Ward	Thường Lạc	Thuong Lac	3	82
28321	tan_phuoc_1	Xã Tân Phước 1	Tan Phuoc 1 Commune	Tân Phước 1	Tan Phuoc 1	4	82
28327	tan_phuoc_2	Xã Tân Phước 2	Tan Phuoc 2 Commune	Tân Phước 2	Tan Phuoc 2	4	82
28336	hung_thanh	Xã Hưng Thạnh	Hung Thanh Commune	Hưng Thạnh	Hung Thanh	4	82
28345	tan_phuoc_3	Xã Tân Phước 3	Tan Phuoc 3 Commune	Tân Phước 3	Tan Phuoc 3	4	82
28360	cai_be	Xã Cái Bè	Cai Be Commune	Cái Bè	Cai Be	4	82
28366	hau_my	Xã Hậu Mỹ	Hau My Commune	Hậu Mỹ	Hau My	4	82
28378	my_thien	Xã Mỹ Thiện	My Thien Commune	Mỹ Thiện	My Thien	4	82
28393	hoi_cu	Xã Hội Cư	Hoi Cu Commune	Hội Cư	Hoi Cu	4	82
28405	my_duc_tay	Xã Mỹ Đức Tây	My Duc Tay Commune	Mỹ Đức Tây	My Duc Tay	4	82
28414	my_loi	Xã Mỹ Lợi	My Loi Commune	Mỹ Lợi	My Loi	4	82
28426	thanh_hung	Xã Thanh Hưng	Thanh Hung Commune	Thanh Hưng	Thanh Hung	4	82
28429	an_huu	Xã An Hữu	An Huu Commune	An Hữu	An Huu	4	82
28444	thanh_phu	Xã Thạnh Phú	Thanh Phu Commune	Thạnh Phú	Thanh Phu	4	82
28456	my_thanh	Xã Mỹ Thành	My Thanh Commune	Mỹ Thành	My Thanh	4	82
28468	tan_phu	Xã Tân Phú	Tan Phu Commune	Tân Phú	Tan Phu	4	82
28471	binh_phu	Xã Bình Phú	Binh Phu Commune	Bình Phú	Binh Phu	4	82
28501	hiep_duc	Xã Hiệp Đức	Hiep Duc Commune	Hiệp Đức	Hiep Duc	4	82
28504	long_tien	Xã Long Tiên	Long Tien Commune	Long Tiên	Long Tien	4	82
28516	ngu_hiep	Xã Ngũ Hiệp	Ngu Hiep Commune	Ngũ Hiệp	Ngu Hiep	4	82
28519	chau_thanh	Xã Châu Thành	Chau Thanh Commune	Châu Thành	Chau Thanh	4	82
28525	tan_huong	Xã Tân Hương	Tan Huong Commune	Tân Hương	Tan Huong	4	82
28537	long_hung	Xã Long Hưng	Long Hung Commune	Long Hưng	Long Hung	4	82
28543	long_dinh	Xã Long Định	Long Dinh Commune	Long Định	Long Dinh	4	82
28564	binh_trung	Xã Bình Trưng	Binh Trung Commune	Bình Trưng	Binh Trung	4	82
28576	vinh_kim	Xã Vĩnh Kim	Vinh Kim Commune	Vĩnh Kim	Vinh Kim	4	82
28582	kim_son	Xã Kim Sơn	Kim Son Commune	Kim Sơn	Kim Son	4	82
28594	cho_gao	Xã Chợ Gạo	Cho Gao Commune	Chợ Gạo	Cho Gao	4	82
28603	my_tinh_an	Xã Mỹ Tịnh An	My Tinh An Commune	Mỹ Tịnh An	My Tinh An	4	82
28615	luong_hoa_lac	Xã Lương Hòa Lạc	Luong Hoa Lac Commune	Lương Hòa Lạc	Luong Hoa Lac	4	82
28627	tan_thuan_binh	Xã Tân Thuận Bình	Tan Thuan Binh Commune	Tân Thuận Bình	Tan Thuan Binh	4	82
28633	an_thanh_thuy	Xã An Thạnh Thủy	An Thanh Thuy Commune	An Thạnh Thủy	An Thanh Thuy	4	82
28648	binh_ninh	Xã Bình Ninh	Binh Ninh Commune	Bình Ninh	Binh Ninh	4	82
28651	vinh_binh	Xã Vĩnh Bình	Vinh Binh Commune	Vĩnh Bình	Vinh Binh	4	82
28660	dong_son	Xã Đồng Sơn	Dong Son Commune	Đồng Sơn	Dong Son	4	82
28663	phu_thanh	Xã Phú Thành	Phu Thanh Commune	Phú Thành	Phu Thanh	4	82
28678	vinh_huu	Xã Vĩnh Hựu	Vinh Huu Commune	Vĩnh Hựu	Vinh Huu	4	82
28687	long_binh	Xã Long Bình	Long Binh Commune	Long Bình	Long Binh	4	82
28693	tan_thoi	Xã Tân Thới	Tan Thoi Commune	Tân Thới	Tan Thoi	4	82
28696	tan_phu_dong	Xã Tân Phú Đông	Tan Phu Dong Commune	Tân Phú Đông	Tan Phu Dong	4	82
28702	tan_hoa	Xã Tân Hòa	Tan Hoa Commune	Tân Hòa	Tan Hoa	4	82
28720	gia_thuan	Xã Gia Thuận	Gia Thuan Commune	Gia Thuận	Gia Thuan	4	82
28723	tan_dong	Xã Tân Đông	Tan Dong Commune	Tân Đông	Tan Dong	4	82
28738	tan_dien	Xã Tân Điền	Tan Dien Commune	Tân Điền	Tan Dien	4	82
28747	go_cong_dong	Xã Gò Công Đông	Go Cong Dong Commune	Gò Công Đông	Go Cong Dong	4	82
29926	tan_hong	Xã Tân Hồng	Tan Hong Commune	Tân Hồng	Tan Hong	4	82
29929	tan_ho_co	Xã Tân Hộ Cơ	Tan Ho Co Commune	Tân Hộ Cơ	Tan Ho Co	4	82
29938	tan_thanh	Xã Tân Thành	Tan Thanh Commune	Tân Thành	Tan Thanh	4	82
29971	thuong_phuoc	Xã Thường Phước	Thuong Phuoc Commune	Thường Phước	Thuong Phuoc	4	82
29983	long_khanh	Xã Long Khánh	Long Khanh Commune	Long Khánh	Long Khanh	4	82
29992	long_phu_thuan	Xã Long Phú Thuận	Long Phu Thuan Commune	Long Phú Thuận	Long Phu Thuan	4	82
30001	tram_chim	Xã Tràm Chim	Tram Chim Commune	Tràm Chim	Tram Chim	4	82
30010	tam_nong	Xã Tam Nông	Tam Nong Commune	Tam Nông	Tam Nong	4	82
30019	an_hoa	Xã An Hòa	An Hoa Commune	An Hòa	An Hoa	4	82
30025	phu_cuong	Xã Phú Cường	Phu Cuong Commune	Phú Cường	Phu Cuong	4	82
30028	an_long	Xã An Long	An Long Commune	An Long	An Long	4	82
30034	phu_tho	Xã Phú Thọ	Phu Tho Commune	Phú Thọ	Phu Tho	4	82
30037	thap_muoi	Xã Tháp Mười	Thap Muoi Commune	Tháp Mười	Thap Muoi	4	82
30043	phuong_thinh	Xã Phương Thịnh	Phuong Thinh Commune	Phương Thịnh	Phuong Thinh	4	82
30046	truong_xuan	Xã Trường Xuân	Truong Xuan Commune	Trường Xuân	Truong Xuan	4	82
30055	my_qui	Xã Mỹ Quí	My Qui Commune	Mỹ Quí	My Qui	4	82
30061	doc_binh_kieu	Xã Đốc Binh Kiều	Doc Binh Kieu Commune	Đốc Binh Kiều	Doc Binh Kieu	4	82
30073	thanh_my	Xã Thanh Mỹ	Thanh My Commune	Thanh Mỹ	Thanh My	4	82
30076	my_tho	Xã Mỹ Thọ	My Tho Commune	Mỹ Thọ	My Tho	4	82
30085	ba_sao	Xã Ba Sao	Ba Sao Commune	Ba Sao	Ba Sao	4	82
30088	phong_my	Xã Phong Mỹ	Phong My Commune	Phong Mỹ	Phong My	4	82
30112	my_hiep	Xã Mỹ Hiệp	My Hiep Commune	Mỹ Hiệp	My Hiep	4	82
30118	binh_hang_trung	Xã Bình Hàng Trung	Binh Hang Trung Commune	Bình Hàng Trung	Binh Hang Trung	4	82
30130	thanh_binh	Xã Thanh Bình	Thanh Binh Commune	Thanh Bình	Thanh Binh	4	82
30154	tan_long	Xã Tân Long	Tan Long Commune	Tân Long	Tan Long	4	82
30157	tan_thanh	Xã Tân Thạnh	Tan Thanh Commune	Tân Thạnh	Tan Thanh	4	82
30163	binh_thanh	Xã Bình Thành	Binh Thanh Commune	Bình Thành	Binh Thanh	4	82
30169	lap_vo	Xã Lấp Vò	Lap Vo Commune	Lấp Vò	Lap Vo	4	82
30178	my_an_hung	Xã Mỹ An Hưng	My An Hung Commune	Mỹ An Hưng	My An Hung	4	82
30184	tan_khanh_trung	Xã Tân Khánh Trung	Tan Khanh Trung Commune	Tân Khánh Trung	Tan Khanh Trung	4	82
30208	hoa_long	Xã Hòa Long	Hoa Long Commune	Hòa Long	Hoa Long	4	82
30214	tan_duong	Xã Tân Dương	Tan Duong Commune	Tân Dương	Tan Duong	4	82
30226	lai_vung	Xã Lai Vung	Lai Vung Commune	Lai Vung	Lai Vung	4	82
30235	phong_hoa	Xã Phong Hòa	Phong Hoa Commune	Phong Hòa	Phong Hoa	4	82
30244	phu_huu	Xã Phú Hựu	Phu Huu Commune	Phú Hựu	Phu Huu	4	82
30253	tan_nhuan_dong	Xã Tân Nhuận Đông	Tan Nhuan Dong Commune	Tân Nhuận Đông	Tan Nhuan Dong	4	82
30259	tan_phu_trung	Xã Tân Phú Trung	Tan Phu Trung Commune	Tân Phú Trung	Tan Phu Trung	4	82
28756	phu_khuong	Phường Phú Khương	Phu Khuong Ward	Phú Khương	Phu Khuong	3	86
28777	an_hoi	Phường An Hội	An Hoi Ward	An Hội	An Hoi	3	86
28783	son_dong	Phường Sơn Đông	Son Dong Ward	Sơn Đông	Son Dong	3	86
28789	ben_tre	Phường Bến Tre	Ben Tre Ward	Bến Tre	Ben Tre	3	86
28858	phu_tan	Phường Phú Tân	Phu Tan Ward	Phú Tân	Phu Tan	3	86
29242	tra_vinh	Phường Trà Vinh	Tra Vinh Ward	Trà Vinh	Tra Vinh	3	86
29254	nguyet_hoa	Phường Nguyệt Hóa	Nguyet Hoa Ward	Nguyệt Hóa	Nguyet Hoa	3	86
29263	long_duc	Phường Long Đức	Long Duc Ward	Long Đức	Long Duc	3	86
29398	hoa_thuan	Phường Hòa Thuận	Hoa Thuan Ward	Hòa Thuận	Hoa Thuan	3	86
29512	duyen_hai	Phường Duyên Hải	Duyen Hai Ward	Duyên Hải	Duyen Hai	3	86
29516	truong_long_hoa	Phường Trường Long Hòa	Truong Long Hoa Ward	Trường Long Hòa	Truong Long Hoa	3	86
29551	long_chau	Phường Long Châu	Long Chau Ward	Long Châu	Long Chau	3	86
29557	phuoc_hau	Phường Phước Hậu	Phuoc Hau Ward	Phước Hậu	Phuoc Hau	3	86
29566	tan_ngai	Phường Tân Ngãi	Tan Ngai Ward	Tân Ngãi	Tan Ngai	3	86
29590	thanh_duc	Phường Thanh Đức	Thanh Duc Ward	Thanh Đức	Thanh Duc	3	86
29593	tan_hanh	Phường Tân Hạnh	Tan Hanh Ward	Tân Hạnh	Tan Hanh	3	86
29770	cai_von	Phường Cái Vồn	Cai Von Ward	Cái Vồn	Cai Von	3	86
29771	binh_minh	Phường Bình Minh	Binh Minh Ward	Bình Minh	Binh Minh	3	86
29812	dong_thanh	Phường Đông Thành	Dong Thanh Ward	Đông Thành	Dong Thanh	3	86
28807	giao_long	Xã Giao Long	Giao Long Commune	Giao Long	Giao Long	4	86
28810	phu_tuc	Xã Phú Túc	Phu Tuc Commune	Phú Túc	Phu Tuc	4	86
28840	tan_phu	Xã Tân Phú	Tan Phu Commune	Tân Phú	Tan Phu	4	86
28861	tien_thuy	Xã Tiên Thủy	Tien Thuy Commune	Tiên Thủy	Tien Thuy	4	86
28870	cho_lach	Xã Chợ Lách	Cho Lach Commune	Chợ Lách	Cho Lach	4	86
28879	phu_phung	Xã Phú Phụng	Phu Phung Commune	Phú Phụng	Phu Phung	4	86
28894	vinh_thanh	Xã Vĩnh Thành	Vinh Thanh Commune	Vĩnh Thành	Vinh Thanh	4	86
28901	hung_khanh_trung	Xã Hưng Khánh Trung	Hung Khanh Trung Commune	Hưng Khánh Trung	Hung Khanh Trung	4	86
28903	mo_cay	Xã Mỏ Cày	Mo Cay Commune	Mỏ Cày	Mo Cay	4	86
28915	phuoc_my_trung	Xã Phước Mỹ Trung	Phuoc My Trung Commune	Phước Mỹ Trung	Phuoc My Trung	4	86
28921	tan_thanh_binh	Xã Tân Thành Bình	Tan Thanh Binh Commune	Tân Thành Bình	Tan Thanh Binh	4	86
28945	dong_khoi	Xã Đồng Khởi	Dong Khoi Commune	Đồng Khởi	Dong Khoi	4	86
28948	nhuan_phu_tan	Xã Nhuận Phú Tân	Nhuan Phu Tan Commune	Nhuận Phú Tân	Nhuan Phu Tan	4	86
28957	an_dinh	Xã An Định	An Dinh Commune	An Định	An Dinh	4	86
28969	thanh_thoi	Xã Thành Thới	Thanh Thoi Commune	Thành Thới	Thanh Thoi	4	86
28981	huong_my	Xã Hương Mỹ	Huong My Commune	Hương Mỹ	Huong My	4	86
28984	giong_trom	Xã Giồng Trôm	Giong Trom Commune	Giồng Trôm	Giong Trom	4	86
28987	luong_hoa	Xã Lương Hòa	Luong Hoa Commune	Lương Hòa	Luong Hoa	4	86
28993	luong_phu	Xã Lương Phú	Luong Phu Commune	Lương Phú	Luong Phu	4	86
28996	chau_hoa	Xã Châu Hòa	Chau Hoa Commune	Châu Hòa	Chau Hoa	4	86
29020	phuoc_long	Xã Phước Long	Phuoc Long Commune	Phước Long	Phuoc Long	4	86
29029	tan_hao	Xã Tân Hào	Tan Hao Commune	Tân Hào	Tan Hao	4	86
29044	hung_nhuong	Xã Hưng Nhượng	Hung Nhuong Commune	Hưng Nhượng	Hung Nhuong	4	86
29050	binh_dai	Xã Bình Đại	Binh Dai Commune	Bình Đại	Binh Dai	4	86
29062	phu_thuan	Xã Phú Thuận	Phu Thuan Commune	Phú Thuận	Phu Thuan	4	86
29077	loc_thuan	Xã Lộc Thuận	Loc Thuan Commune	Lộc Thuận	Loc Thuan	4	86
29083	chau_hung	Xã Châu Hưng	Chau Hung Commune	Châu Hưng	Chau Hung	4	86
29089	thanh_tri	Xã Thạnh Trị	Thanh Tri Commune	Thạnh Trị	Thanh Tri	4	86
29104	thanh_phuoc	Xã Thạnh Phước	Thanh Phuoc Commune	Thạnh Phước	Thanh Phuoc	4	86
29107	thoi_thuan	Xã Thới Thuận	Thoi Thuan Commune	Thới Thuận	Thoi Thuan	4	86
29110	ba_tri	Xã Ba Tri	Ba Tri Commune	Ba Tri	Ba Tri	4	86
29122	my_chanh_hoa	Xã Mỹ Chánh Hòa	My Chanh Hoa Commune	Mỹ Chánh Hòa	My Chanh Hoa	4	86
29125	bao_thanh	Xã Bảo Thạnh	Bao Thanh Commune	Bảo Thạnh	Bao Thanh	4	86
29137	tan_xuan	Xã Tân Xuân	Tan Xuan Commune	Tân Xuân	Tan Xuan	4	86
29143	an_ngai_trung	Xã An Ngãi Trung	An Ngai Trung Commune	An Ngãi Trung	An Ngai Trung	4	86
29158	an_hiep	Xã An Hiệp	An Hiep Commune	An Hiệp	An Hiep	4	86
29167	tan_thuy	Xã Tân Thủy	Tan Thuy Commune	Tân Thủy	Tan Thuy	4	86
29182	thanh_phu	Xã Thạnh Phú	Thanh Phu Commune	Thạnh Phú	Thanh Phu	4	86
29191	quoi_dien	Xã Quới Điền	Quoi Dien Commune	Quới Điền	Quoi Dien	4	86
29194	dai_dien	Xã Đại Điền	Dai Dien Commune	Đại Điền	Dai Dien	4	86
29221	thanh_hai	Xã Thạnh Hải	Thanh Hai Commune	Thạnh Hải	Thanh Hai	4	86
29224	an_qui	Xã An Qui	An Qui Commune	An Qui	An Qui	4	86
29227	thanh_phong	Xã Thạnh Phong	Thanh Phong Commune	Thạnh Phong	Thanh Phong	4	86
29266	cang_long	Xã Càng Long	Cang Long Commune	Càng Long	Cang Long	4	86
29275	an_truong	Xã An Trường	An Truong Commune	An Trường	An Truong	4	86
29278	tan_an	Xã Tân An	Tan An Commune	Tân An	Tan An	4	86
29287	binh_phu	Xã Bình Phú	Binh Phu Commune	Bình Phú	Binh Phu	4	86
29302	nhi_long	Xã Nhị Long	Nhi Long Commune	Nhị Long	Nhi Long	4	86
29308	cau_ke	Xã Cầu Kè	Cau Ke Commune	Cầu Kè	Cau Ke	4	86
29317	an_phu_tan	Xã An Phú Tân	An Phu Tan Commune	An Phú Tân	An Phu Tan	4	86
29329	phong_thanh	Xã Phong Thạnh	Phong Thanh Commune	Phong Thạnh	Phong Thanh	4	86
29335	tam_ngai	Xã Tam Ngãi	Tam Ngai Commune	Tam Ngãi	Tam Ngai	4	86
29341	tieu_can	Xã Tiểu Cần	Tieu Can Commune	Tiểu Cần	Tieu Can	4	86
29362	hung_hoa	Xã Hùng Hòa	Hung Hoa Commune	Hùng Hòa	Hung Hoa	4	86
29365	tap_ngai	Xã Tập Ngãi	Tap Ngai Commune	Tập Ngãi	Tap Ngai	4	86
29371	tan_hoa	Xã Tân Hòa	Tan Hoa Commune	Tân Hòa	Tan Hoa	4	86
29374	chau_thanh	Xã Châu Thành	Chau Thanh Commune	Châu Thành	Chau Thanh	4	86
29386	song_loc	Xã Song Lộc	Song Loc Commune	Song Lộc	Song Loc	4	86
29407	hung_my	Xã Hưng Mỹ	Hung My Commune	Hưng Mỹ	Hung My	4	86
29410	hoa_minh	Xã Hòa Minh	Hoa Minh Commune	Hòa Minh	Hoa Minh	4	86
29413	long_hoa	Xã Long Hòa	Long Hoa Commune	Long Hòa	Long Hoa	4	86
31147	tan_an	Phường Tân An	Tan An Ward	Tân An	Tan An	3	92
29416	cau_ngang	Xã Cầu Ngang	Cau Ngang Commune	Cầu Ngang	Cau Ngang	4	86
29419	my_long	Xã Mỹ Long	My Long Commune	Mỹ Long	My Long	4	86
29431	vinh_kim	Xã Vinh Kim	Vinh Kim Commune	Vinh Kim	Vinh Kim	4	86
29446	nhi_truong	Xã Nhị Trường	Nhi Truong Commune	Nhị Trường	Nhi Truong	4	86
29455	hiep_my	Xã Hiệp Mỹ	Hiep My Commune	Hiệp Mỹ	Hiep My	4	86
29461	tra_cu	Xã Trà Cú	Tra Cu Commune	Trà Cú	Tra Cu	4	86
29467	tap_son	Xã Tập Sơn	Tap Son Commune	Tập Sơn	Tap Son	4	86
29476	luu_nghiep_anh	Xã Lưu Nghiệp Anh	Luu Nghiep Anh Commune	Lưu Nghiệp Anh	Luu Nghiep Anh	4	86
29489	ham_giang	Xã Hàm Giang	Ham Giang Commune	Hàm Giang	Ham Giang	4	86
29491	dai_an	Xã Đại An	Dai An Commune	Đại An	Dai An	4	86
29497	don_chau	Xã Đôn Châu	Don Chau Commune	Đôn Châu	Don Chau	4	86
29506	long_hiep	Xã Long Hiệp	Long Hiep Commune	Long Hiệp	Long Hiep	4	86
29513	long_thanh	Xã Long Thành	Long Thanh Commune	Long Thành	Long Thanh	4	86
29518	long_huu	Xã Long Hữu	Long Huu Commune	Long Hữu	Long Huu	4	86
29530	ngu_lac	Xã Ngũ Lạc	Ngu Lac Commune	Ngũ Lạc	Ngu Lac	4	86
29533	long_vinh	Xã Long Vĩnh	Long Vinh Commune	Long Vĩnh	Long Vinh	4	86
29536	dong_hai	Xã Đông Hải	Dong Hai Commune	Đông Hải	Dong Hai	4	86
29584	an_binh	Xã An Bình	An Binh Commune	An Bình	An Binh	4	86
29602	long_ho	Xã Long Hồ	Long Ho Commune	Long Hồ	Long Ho	4	86
29611	phu_quoi	Xã Phú Quới	Phu Quoi Commune	Phú Quới	Phu Quoi	4	86
29623	nhon_phu	Xã Nhơn Phú	Nhon Phu Commune	Nhơn Phú	Nhon Phu	4	86
29638	binh_phuoc	Xã Bình Phước	Binh Phuoc Commune	Bình Phước	Binh Phuoc	4	86
29641	cai_nhum	Xã Cái Nhum	Cai Nhum Commune	Cái Nhum	Cai Nhum	4	86
29653	tan_long_hoi	Xã Tân Long Hội	Tan Long Hoi Commune	Tân Long Hội	Tan Long Hoi	4	86
29659	trung_thanh	Xã Trung Thành	Trung Thanh Commune	Trung Thành	Trung Thanh	4	86
29668	quoi_an	Xã Quới An	Quoi An Commune	Quới An	Quoi An	4	86
29677	quoi_thien	Xã Quới Thiện	Quoi Thien Commune	Quới Thiện	Quoi Thien	4	86
29683	trung_hiep	Xã Trung Hiệp	Trung Hiep Commune	Trung Hiệp	Trung Hiep	4	86
29698	trung_ngai	Xã Trung Ngãi	Trung Ngai Commune	Trung Ngãi	Trung Ngai	4	86
29701	hieu_phung	Xã Hiếu Phụng	Hieu Phung Commune	Hiếu Phụng	Hieu Phung	4	86
29713	hieu_thanh	Xã Hiếu Thành	Hieu Thanh Commune	Hiếu Thành	Hieu Thanh	4	86
29719	tam_binh	Xã Tam Bình	Tam Binh Commune	Tam Bình	Tam Binh	4	86
29728	cai_ngang	Xã Cái Ngang	Cai Ngang Commune	Cái Ngang	Cai Ngang	4	86
29734	hoa_hiep	Xã Hòa Hiệp	Hoa Hiep Commune	Hòa Hiệp	Hoa Hiep	4	86
29740	song_phu	Xã Song Phú	Song Phu Commune	Song Phú	Song Phu	4	86
29767	ngai_tu	Xã Ngãi Tứ	Ngai Tu Commune	Ngãi Tứ	Ngai Tu	4	86
29785	tan_luoc	Xã Tân Lược	Tan Luoc Commune	Tân Lược	Tan Luoc	4	86
29788	my_thuan	Xã Mỹ Thuận	My Thuan Commune	Mỹ Thuận	My Thuan	4	86
29800	tan_quoi	Xã Tân Quới	Tan Quoi Commune	Tân Quới	Tan Quoi	4	86
29821	tra_on	Xã Trà Ôn	Tra On Commune	Trà Ôn	Tra On	4	86
29830	hoa_binh	Xã Hòa Bình	Hoa Binh Commune	Hòa Bình	Hoa Binh	4	86
29836	tra_con	Xã Trà Côn	Tra Con Commune	Trà Côn	Tra Con	4	86
29845	vinh_xuan	Xã Vĩnh Xuân	Vinh Xuan Commune	Vĩnh Xuân	Vinh Xuan	4	86
29857	luc_si_thanh	Xã Lục Sĩ Thành	Luc Si Thanh Commune	Lục Sĩ Thành	Luc Si Thanh	4	86
30292	binh_duc	Phường Bình Đức	Binh Duc Ward	Bình Đức	Binh Duc	3	91
30301	my_thoi	Phường Mỹ Thới	My Thoi Ward	Mỹ Thới	My Thoi	3	91
30307	long_xuyen	Phường Long Xuyên	Long Xuyen Ward	Long Xuyên	Long Xuyen	3	91
30316	chau_doc	Phường Châu Đốc	Chau Doc Ward	Châu Đốc	Chau Doc	3	91
30325	vinh_te	Phường Vĩnh Tế	Vinh Te Ward	Vĩnh Tế	Vinh Te	3	91
30376	tan_chau	Phường Tân Châu	Tan Chau Ward	Tân Châu	Tan Chau	3	91
30377	long_phu	Phường Long Phú	Long Phu Ward	Long Phú	Long Phu	3	91
30502	thoi_son	Phường Thới Sơn	Thoi Son Ward	Thới Sơn	Thoi Son	3	91
30505	chi_lang	Phường Chi Lăng	Chi Lang Ward	Chi Lăng	Chi Lang	3	91
30520	tinh_bien	Phường Tịnh Biên	Tinh Bien Ward	Tịnh Biên	Tinh Bien	3	91
30742	rach_gia	Phường Rạch Giá	Rach Gia Ward	Rạch Giá	Rach Gia	3	91
30760	vinh_thong	Phường Vĩnh Thông	Vinh Thong Ward	Vĩnh Thông	Vinh Thong	3	91
30766	to_chau	Phường Tô Châu	To Chau Ward	Tô Châu	To Chau	3	91
30769	ha_tien	Phường Hà Tiên	Ha Tien Ward	Hà Tiên	Ha Tien	3	91
30313	my_hoa_hung	Xã Mỹ Hòa Hưng	My Hoa Hung Commune	Mỹ Hòa Hưng	My Hoa Hung	4	91
30337	an_phu	Xã An Phú	An Phu Commune	An Phú	An Phu	4	91
30341	khanh_binh	Xã Khánh Bình	Khanh Binh Commune	Khánh Bình	Khanh Binh	4	91
30346	nhon_hoi	Xã Nhơn Hội	Nhon Hoi Commune	Nhơn Hội	Nhon Hoi	4	91
30352	phu_huu	Xã Phú Hữu	Phu Huu Commune	Phú Hữu	Phu Huu	4	91
30367	vinh_hau	Xã Vĩnh Hậu	Vinh Hau Commune	Vĩnh Hậu	Vinh Hau	4	91
30385	vinh_xuong	Xã Vĩnh Xương	Vinh Xuong Commune	Vĩnh Xương	Vinh Xuong	4	91
30388	tan_an	Xã Tân An	Tan An Commune	Tân An	Tan An	4	91
30403	chau_phong	Xã Châu Phong	Chau Phong Commune	Châu Phong	Chau Phong	4	91
30406	phu_tan	Xã Phú Tân	Phu Tan Commune	Phú Tân	Phu Tan	4	91
30409	cho_vam	Xã Chợ Vàm	Cho Vam Commune	Chợ Vàm	Cho Vam	4	91
30421	phu_lam	Xã Phú Lâm	Phu Lam Commune	Phú Lâm	Phu Lam	4	91
30430	hoa_lac	Xã Hòa Lạc	Hoa Lac Commune	Hòa Lạc	Hoa Lac	4	91
30436	phu_an	Xã Phú An	Phu An Commune	Phú An	Phu An	4	91
30445	binh_thanh_dong	Xã Bình Thạnh Đông	Binh Thanh Dong Commune	Bình Thạnh Đông	Binh Thanh Dong	4	91
30463	chau_phu	Xã Châu Phú	Chau Phu Commune	Châu Phú	Chau Phu	4	91
30478	vinh_thanh_trung	Xã Vĩnh Thạnh Trung	Vinh Thanh Trung Commune	Vĩnh Thạnh Trung	Vinh Thanh Trung	4	91
30481	thanh_my_tay	Xã Thạnh Mỹ Tây	Thanh My Tay Commune	Thạnh Mỹ Tây	Thanh My Tay	4	91
30487	binh_my	Xã Bình Mỹ	Binh My Commune	Bình Mỹ	Binh My	4	91
30526	an_cu	Xã An Cư	An Cu Commune	An Cư	An Cu	4	91
30538	nui_cam	Xã Núi Cấm	Nui Cam Commune	Núi Cấm	Nui Cam	4	91
30544	tri_ton	Xã Tri Tôn	Tri Ton Commune	Tri Tôn	Tri Ton	4	91
30547	ba_chuc	Xã Ba Chúc	Ba Chuc Commune	Ba Chúc	Ba Chuc	4	91
30568	vinh_gia	Xã Vĩnh Gia	Vinh Gia Commune	Vĩnh Gia	Vinh Gia	4	91
30577	o_lam	Xã Ô Lâm	O Lam Commune	Ô Lâm	O Lam	4	91
30580	co_to	Xã Cô Tô	Co To Commune	Cô Tô	Co To	4	91
30589	an_chau	Xã An Châu	An Chau Commune	An Châu	An Chau	4	91
30595	can_dang	Xã Cần Đăng	Can Dang Commune	Cần Đăng	Can Dang	4	91
30604	vinh_an	Xã Vĩnh An	Vinh An Commune	Vĩnh An	Vinh An	4	91
30607	binh_hoa	Xã Bình Hòa	Binh Hoa Commune	Bình Hòa	Binh Hoa	4	91
30619	vinh_hanh	Xã Vĩnh Hanh	Vinh Hanh Commune	Vĩnh Hanh	Vinh Hanh	4	91
30628	cho_moi	Xã Chợ Mới	Cho Moi Commune	Chợ Mới	Cho Moi	4	91
30631	long_dien	Xã Long Điền	Long Dien Commune	Long Điền	Long Dien	4	91
30643	cu_lao_gieng	Xã Cù Lao Giêng	Cu Lao Gieng Commune	Cù Lao Giêng	Cu Lao Gieng	4	91
30658	nhon_my	Xã Nhơn Mỹ	Nhon My Commune	Nhơn Mỹ	Nhon My	4	91
30664	long_kien	Xã Long Kiến	Long Kien Commune	Long Kiến	Long Kien	4	91
30673	hoi_an	Xã Hội An	Hoi An Commune	Hội An	Hoi An	4	91
30682	thoai_son	Xã Thoại Sơn	Thoai Son Commune	Thoại Sơn	Thoai Son	4	91
30685	phu_hoa	Xã Phú Hòa	Phu Hoa Commune	Phú Hòa	Phu Hoa	4	91
30688	oc_eo	Xã Óc Eo	Oc Eo Commune	Óc Eo	Oc Eo	4	91
30691	tay_phu	Xã Tây Phú	Tay Phu Commune	Tây Phú	Tay Phu	4	91
30697	vinh_trach	Xã Vĩnh Trạch	Vinh Trach Commune	Vĩnh Trạch	Vinh Trach	4	91
30709	dinh_my	Xã Định Mỹ	Dinh My Commune	Định Mỹ	Dinh My	4	91
30781	tien_hai	Xã Tiên Hải	Tien Hai Commune	Tiên Hải	Tien Hai	4	91
30787	kien_luong	Xã Kiên Lương	Kien Luong Commune	Kiên Lương	Kien Luong	4	91
30790	hoa_dien	Xã Hòa Điền	Hoa Dien Commune	Hòa Điền	Hoa Dien	4	91
30793	vinh_dieu	Xã Vĩnh Điều	Vinh Dieu Commune	Vĩnh Điều	Vinh Dieu	4	91
30796	giang_thanh	Xã Giang Thành	Giang Thanh Commune	Giang Thành	Giang Thanh	4	91
30811	son_hai	Xã Sơn Hải	Son Hai Commune	Sơn Hải	Son Hai	4	91
30814	hon_nghe	Xã Hòn Nghệ	Hon Nghe Commune	Hòn Nghệ	Hon Nghe	4	91
30817	hon_dat	Xã Hòn Đất	Hon Dat Commune	Hòn Đất	Hon Dat	4	91
30823	binh_son	Xã Bình Sơn	Binh Son Commune	Bình Sơn	Binh Son	4	91
30826	binh_giang	Xã Bình Giang	Binh Giang Commune	Bình Giang	Binh Giang	4	91
30835	son_kien	Xã Sơn Kiên	Son Kien Commune	Sơn Kiên	Son Kien	4	91
30838	my_thuan	Xã Mỹ Thuận	My Thuan Commune	Mỹ Thuận	My Thuan	4	91
30850	tan_hiep	Xã Tân Hiệp	Tan Hiep Commune	Tân Hiệp	Tan Hiep	4	91
30856	tan_hoi	Xã Tân Hội	Tan Hoi Commune	Tân Hội	Tan Hoi	4	91
30874	thanh_dong	Xã Thạnh Đông	Thanh Dong Commune	Thạnh Đông	Thanh Dong	4	91
30880	chau_thanh	Xã Châu Thành	Chau Thanh Commune	Châu Thành	Chau Thanh	4	91
30886	thanh_loc	Xã Thạnh Lộc	Thanh Loc Commune	Thạnh Lộc	Thanh Loc	4	91
30898	binh_an	Xã Bình An	Binh An Commune	Bình An	Binh An	4	91
30904	giong_rieng	Xã Giồng Riềng	Giong Rieng Commune	Giồng Riềng	Giong Rieng	4	91
30910	thanh_hung	Xã Thạnh Hưng	Thanh Hung Commune	Thạnh Hưng	Thanh Hung	4	91
30928	ngoc_chuc	Xã Ngọc Chúc	Ngoc Chuc Commune	Ngọc Chúc	Ngoc Chuc	4	91
30934	hoa_hung	Xã Hòa Hưng	Hoa Hung Commune	Hòa Hưng	Hoa Hung	4	91
30943	long_thanh	Xã Long Thạnh	Long Thanh Commune	Long Thạnh	Long Thanh	4	91
30949	hoa_thuan	Xã Hòa Thuận	Hoa Thuan Commune	Hòa Thuận	Hoa Thuan	4	91
30952	go_quao	Xã Gò Quao	Go Quao Commune	Gò Quao	Go Quao	4	91
30958	dinh_hoa	Xã Định Hòa	Dinh Hoa Commune	Định Hòa	Dinh Hoa	4	91
30970	vinh_hoa_hung	Xã Vĩnh Hòa Hưng	Vinh Hoa Hung Commune	Vĩnh Hòa Hưng	Vinh Hoa Hung	4	91
30982	vinh_tuy	Xã Vĩnh Tuy	Vinh Tuy Commune	Vĩnh Tuy	Vinh Tuy	4	91
30985	an_bien	Xã An Biên	An Bien Commune	An Biên	An Bien	4	91
30988	tay_yen	Xã Tây Yên	Tay Yen Commune	Tây Yên	Tay Yen	4	91
31006	dong_thai	Xã Đông Thái	Dong Thai Commune	Đông Thái	Dong Thai	4	91
31012	vinh_hoa	Xã Vĩnh Hòa	Vinh Hoa Commune	Vĩnh Hòa	Vinh Hoa	4	91
31018	an_minh	Xã An Minh	An Minh Commune	An Minh	An Minh	4	91
31024	dong_hoa	Xã Đông Hòa	Dong Hoa Commune	Đông Hòa	Dong Hoa	4	91
31027	u_minh_thuong	Xã U Minh Thượng	U Minh Thuong Commune	U Minh Thượng	U Minh Thuong	4	91
31031	tan_thanh	Xã Tân Thạnh	Tan Thanh Commune	Tân Thạnh	Tan Thanh	4	91
31036	dong_hung	Xã Đông Hưng	Dong Hung Commune	Đông Hưng	Dong Hung	4	91
31042	van_khanh	Xã Vân Khánh	Van Khanh Commune	Vân Khánh	Van Khanh	4	91
31051	vinh_phong	Xã Vĩnh Phong	Vinh Phong Commune	Vĩnh Phong	Vinh Phong	4	91
31064	vinh_binh	Xã Vĩnh Bình	Vinh Binh Commune	Vĩnh Bình	Vinh Binh	4	91
31069	vinh_thuan	Xã Vĩnh Thuận	Vinh Thuan Commune	Vĩnh Thuận	Vinh Thuan	4	91
31078	phu_quoc	Đặc khu Phú Quốc	Phu Quoc Special administrative region	Phú Quốc	Phu Quoc	5	91
31105	tho_chau	Đặc khu Thổ Châu	Tho Chau Special administrative region	Thổ Châu	Tho Chau	5	91
31108	kien_hai	Đặc khu Kiên Hải	Kien Hai Special administrative region	Kiên Hải	Kien Hai	5	91
31120	cai_khe	Phường Cái Khế	Cai Khe Ward	Cái Khế	Cai Khe	3	92
31135	ninh_kieu	Phường Ninh Kiều	Ninh Kieu Ward	Ninh Kiều	Ninh Kieu	3	92
31150	an_binh	Phường An Bình	An Binh Ward	An Bình	An Binh	3	92
31153	o_mon	Phường Ô Môn	O Mon Ward	Ô Môn	O Mon	3	92
31157	thoi_long	Phường Thới Long	Thoi Long Ward	Thới Long	Thoi Long	3	92
31162	phuoc_thoi	Phường Phước Thới	Phuoc Thoi Ward	Phước Thới	Phuoc Thoi	3	92
31168	binh_thuy	Phường Bình Thủy	Binh Thuy Ward	Bình Thủy	Binh Thuy	3	92
31174	thoi_an_dong	Phường Thới An Đông	Thoi An Dong Ward	Thới An Đông	Thoi An Dong	3	92
31183	long_tuyen	Phường Long Tuyền	Long Tuyen Ward	Long Tuyền	Long Tuyen	3	92
31186	cai_rang	Phường Cái Răng	Cai Rang Ward	Cái Răng	Cai Rang	3	92
31201	hung_phu	Phường Hưng Phú	Hung Phu Ward	Hưng Phú	Hung Phu	3	92
31207	thot_not	Phường Thốt Nốt	Thot Not Ward	Thốt Nốt	Thot Not	3	92
31213	tan_loc	Phường Tân Lộc	Tan Loc Ward	Tân Lộc	Tan Loc	3	92
31217	trung_nhut	Phường Trung Nhứt	Trung Nhut Ward	Trung Nhứt	Trung Nhut	3	92
31228	thuan_hung	Phường Thuận Hưng	Thuan Hung Ward	Thuận Hưng	Thuan Hung	3	92
31321	vi_thanh	Phường Vị Thanh	Vi Thanh Ward	Vị Thanh	Vi Thanh	3	92
31333	vi_tan	Phường Vị Tân	Vi Tan Ward	Vị Tân	Vi Tan	3	92
31340	nga_bay	Phường Ngã Bảy	Nga Bay Ward	Ngã Bảy	Nga Bay	3	92
31411	dai_thanh	Phường Đại Thành	Dai Thanh Ward	Đại Thành	Dai Thanh	3	92
31471	long_my	Phường Long Mỹ	Long My Ward	Long Mỹ	Long My	3	92
31473	long_binh	Phường Long Bình	Long Binh Ward	Long Bình	Long Binh	3	92
31480	long_phu_1	Phường Long Phú 1	Long Phu 1 Ward	Long Phú 1	Long Phu 1	3	92
31507	soc_trang	Phường Sóc Trăng	Soc Trang Ward	Sóc Trăng	Soc Trang	3	92
31510	phu_loi	Phường Phú Lợi	Phu Loi Ward	Phú Lợi	Phu Loi	3	92
31684	my_xuyen	Phường Mỹ Xuyên	My Xuyen Ward	Mỹ Xuyên	My Xuyen	3	92
31732	nga_nam	Phường Ngã Năm	Nga Nam Ward	Ngã Năm	Nga Nam	3	92
31753	my_quoi	Phường Mỹ Quới	My Quoi Ward	Mỹ Quới	My Quoi	3	92
31783	vinh_chau	Phường Vĩnh Châu	Vinh Chau Ward	Vĩnh Châu	Vinh Chau	3	92
31789	khanh_hoa	Phường Khánh Hòa	Khanh Hoa Ward	Khánh Hòa	Khanh Hoa	3	92
31804	vinh_phuoc	Phường Vĩnh Phước	Vinh Phuoc Ward	Vĩnh Phước	Vinh Phuoc	3	92
31231	thanh_an	Xã Thạnh An	Thanh An Commune	Thạnh An	Thanh An	4	92
31232	vinh_thanh	Xã Vĩnh Thạnh	Vinh Thanh Commune	Vĩnh Thạnh	Vinh Thanh	4	92
31237	vinh_trinh	Xã Vĩnh Trinh	Vinh Trinh Commune	Vĩnh Trinh	Vinh Trinh	4	92
31246	thanh_quoi	Xã Thạnh Quới	Thanh Quoi Commune	Thạnh Quới	Thanh Quoi	4	92
31249	thanh_phu	Xã Thạnh Phú	Thanh Phu Commune	Thạnh Phú	Thanh Phu	4	92
31255	trung_hung	Xã Trung Hưng	Trung Hung Commune	Trung Hưng	Trung Hung	4	92
31258	thoi_lai	Xã Thới Lai	Thoi Lai Commune	Thới Lai	Thoi Lai	4	92
31261	co_do	Xã Cờ Đỏ	Co Do Commune	Cờ Đỏ	Co Do	4	92
31264	thoi_hung	Xã Thới Hưng	Thoi Hung Commune	Thới Hưng	Thoi Hung	4	92
31273	dong_hiep	Xã Đông Hiệp	Dong Hiep Commune	Đông Hiệp	Dong Hiep	4	92
31282	dong_thuan	Xã Đông Thuận	Dong Thuan Commune	Đông Thuận	Dong Thuan	4	92
31288	truong_thanh	Xã Trường Thành	Truong Thanh Commune	Trường Thành	Truong Thanh	4	92
31294	truong_xuan	Xã Trường Xuân	Truong Xuan Commune	Trường Xuân	Truong Xuan	4	92
31299	phong_dien	Xã Phong Điền	Phong Dien Commune	Phong Điền	Phong Dien	4	92
31309	truong_long	Xã Trường Long	Truong Long Commune	Trường Long	Truong Long	4	92
31315	nhon_ai	Xã Nhơn Ái	Nhon Ai Commune	Nhơn Ái	Nhon Ai	4	92
31338	hoa_luu	Xã Hỏa Lựu	Hoa Luu Commune	Hỏa Lựu	Hoa Luu	4	92
31342	tan_hoa	Xã Tân Hòa	Tan Hoa Commune	Tân Hòa	Tan Hoa	4	92
31348	truong_long_tay	Xã Trường Long Tây	Truong Long Tay Commune	Trường Long Tây	Truong Long Tay	4	92
31360	thanh_xuan	Xã Thạnh Xuân	Thanh Xuan Commune	Thạnh Xuân	Thanh Xuan	4	92
31366	chau_thanh	Xã Châu Thành	Chau Thanh Commune	Châu Thành	Chau Thanh	4	92
31369	dong_phuoc	Xã Đông Phước	Dong Phuoc Commune	Đông Phước	Dong Phuoc	4	92
31378	phu_huu	Xã Phú Hữu	Phu Huu Commune	Phú Hữu	Phu Huu	4	92
31393	hoa_an	Xã Hòa An	Hoa An Commune	Hòa An	Hoa An	4	92
31396	hiep_hung	Xã Hiệp Hưng	Hiep Hung Commune	Hiệp Hưng	Hiep Hung	4	92
31399	tan_binh	Xã Tân Bình	Tan Binh Commune	Tân Bình	Tan Binh	4	92
31408	thanh_hoa	Xã Thạnh Hòa	Thanh Hoa Commune	Thạnh Hòa	Thanh Hoa	4	92
31420	phung_hiep	Xã Phụng Hiệp	Phung Hiep Commune	Phụng Hiệp	Phung Hiep	4	92
31426	phuong_binh	Xã Phương Bình	Phuong Binh Commune	Phương Bình	Phuong Binh	4	92
31432	tan_phuoc_hung	Xã Tân Phước Hưng	Tan Phuoc Hung Commune	Tân Phước Hưng	Tan Phuoc Hung	4	92
31441	vi_thuy	Xã Vị Thủy	Vi Thuy Commune	Vị Thủy	Vi Thuy	4	92
31453	vinh_thuan_dong	Xã Vĩnh Thuận Đông	Vinh Thuan Dong Commune	Vĩnh Thuận Đông	Vinh Thuan Dong	4	92
31459	vinh_tuong	Xã Vĩnh Tường	Vinh Tuong Commune	Vĩnh Tường	Vinh Tuong	4	92
31465	vi_thanh_1	Xã Vị Thanh 1	Vi Thanh 1 Commune	Vị Thanh 1	Vi Thanh 1	4	92
31489	vinh_vien	Xã Vĩnh Viễn	Vinh Vien Commune	Vĩnh Viễn	Vinh Vien	4	92
31492	luong_tam	Xã Lương Tâm	Luong Tam Commune	Lương Tâm	Luong Tam	4	92
31495	xa_phien	Xã Xà Phiên	Xa Phien Commune	Xà Phiên	Xa Phien	4	92
31528	ke_sach	Xã Kế Sách	Ke Sach Commune	Kế Sách	Ke Sach	4	92
31531	an_lac_thon	Xã An Lạc Thôn	An Lac Thon Commune	An Lạc Thôn	An Lac Thon	4	92
31537	phong_nam	Xã Phong Nẫm	Phong Nam Commune	Phong Nẫm	Phong Nam	4	92
31540	thoi_an_hoi	Xã Thới An Hội	Thoi An Hoi Commune	Thới An Hội	Thoi An Hoi	4	92
31552	nhon_my	Xã Nhơn Mỹ	Nhon My Commune	Nhơn Mỹ	Nhon My	4	92
31561	dai_hai	Xã Đại Hải	Dai Hai Commune	Đại Hải	Dai Hai	4	92
31567	my_tu	Xã Mỹ Tú	My Tu Commune	Mỹ Tú	My Tu	4	92
31569	phu_tam	Xã Phú Tâm	Phu Tam Commune	Phú Tâm	Phu Tam	4	92
31570	ho_dac_kien	Xã Hồ Đắc Kiện	Ho Dac Kien Commune	Hồ Đắc Kiện	Ho Dac Kien	4	92
31579	long_hung	Xã Long Hưng	Long Hung Commune	Long Hưng	Long Hung	4	92
31582	thuan_hoa	Xã Thuận Hòa	Thuan Hoa Commune	Thuận Hòa	Thuan Hoa	4	92
31591	my_huong	Xã Mỹ Hương	My Huong Commune	Mỹ Hương	My Huong	4	92
31594	an_ninh	Xã An Ninh	An Ninh Commune	An Ninh	An Ninh	4	92
31603	my_phuoc	Xã Mỹ Phước	My Phuoc Commune	Mỹ Phước	My Phuoc	4	92
31615	an_thanh	Xã An Thạnh	An Thanh Commune	An Thạnh	An Thanh	4	92
31633	cu_lao_dung	Xã Cù Lao Dung	Cu Lao Dung Commune	Cù Lao Dung	Cu Lao Dung	4	92
31639	long_phu	Xã Long Phú	Long Phu Commune	Long Phú	Long Phu	4	92
31645	dai_ngai	Xã Đại Ngãi	Dai Ngai Commune	Đại Ngãi	Dai Ngai	4	92
31654	truong_khanh	Xã Trường Khánh	Truong Khanh Commune	Trường Khánh	Truong Khanh	4	92
31666	tan_thanh	Xã Tân Thạnh	Tan Thanh Commune	Tân Thạnh	Tan Thanh	4	92
31673	tran_de	Xã Trần Đề	Tran De Commune	Trần Đề	Tran De	4	92
31675	lieu_tu	Xã Liêu Tú	Lieu Tu Commune	Liêu Tú	Lieu Tu	4	92
31679	lich_hoi_thuong	Xã Lịch Hội Thượng	Lich Hoi Thuong Commune	Lịch Hội Thượng	Lich Hoi Thuong	4	92
31687	tai_van	Xã Tài Văn	Tai Van Commune	Tài Văn	Tai Van	4	92
31699	thanh_thoi_an	Xã Thạnh Thới An	Thanh Thoi An Commune	Thạnh Thới An	Thanh Thoi An	4	92
31708	nhu_gia	Xã Nhu Gia	Nhu Gia Commune	Nhu Gia	Nhu Gia	4	92
31717	hoa_tu	Xã Hòa Tú	Hoa Tu Commune	Hòa Tú	Hoa Tu	4	92
31723	ngoc_to	Xã Ngọc Tố	Ngoc To Commune	Ngọc Tố	Ngoc To	4	92
31726	gia_hoa	Xã Gia Hòa	Gia Hoa Commune	Gia Hòa	Gia Hoa	4	92
31741	tan_long	Xã Tân Long	Tan Long Commune	Tân Long	Tan Long	4	92
31756	phu_loc	Xã Phú Lộc	Phu Loc Commune	Phú Lộc	Phu Loc	4	92
31759	lam_tan	Xã Lâm Tân	Lam Tan Commune	Lâm Tân	Lam Tan	4	92
31777	vinh_loi	Xã Vĩnh Lợi	Vinh Loi Commune	Vĩnh Lợi	Vinh Loi	4	92
31795	vinh_hai	Xã Vĩnh Hải	Vinh Hai Commune	Vĩnh Hải	Vinh Hai	4	92
31810	lai_hoa	Xã Lai Hòa	Lai Hoa Commune	Lai Hòa	Lai Hoa	4	92
31825	bac_lieu	Phường Bạc Liêu	Bac Lieu Ward	Bạc Liêu	Bac Lieu	3	96
31834	vinh_trach	Phường Vĩnh Trạch	Vinh Trach Ward	Vĩnh Trạch	Vinh Trach	3	96
31840	hiep_thanh	Phường Hiệp Thành	Hiep Thanh Ward	Hiệp Thành	Hiep Thanh	3	96
31942	gia_rai	Phường Giá Rai	Gia Rai Ward	Giá Rai	Gia Rai	3	96
31951	lang_tron	Phường Láng Tròn	Lang Tron Ward	Láng Tròn	Lang Tron	3	96
32002	an_xuyen	Phường An Xuyên	An Xuyen Ward	An Xuyên	An Xuyen	3	96
32014	ly_van_lam	Phường Lý Văn Lâm	Ly Van Lam Ward	Lý Văn Lâm	Ly Van Lam	3	96
32025	tan_thanh	Phường Tân Thành	Tan Thanh Ward	Tân Thành	Tan Thanh	3	96
32041	hoa_thanh	Phường Hòa Thành	Hoa Thanh Ward	Hòa Thành	Hoa Thanh	3	96
31843	hong_dan	Xã Hồng Dân	Hong Dan Commune	Hồng Dân	Hong Dan	4	96
31849	ninh_quoi	Xã Ninh Quới	Ninh Quoi Commune	Ninh Quới	Ninh Quoi	4	96
31858	vinh_loc	Xã Vĩnh Lộc	Vinh Loc Commune	Vĩnh Lộc	Vinh Loc	4	96
31864	ninh_thanh_loi	Xã Ninh Thạnh Lợi	Ninh Thanh Loi Commune	Ninh Thạnh Lợi	Ninh Thanh Loi	4	96
31867	phuoc_long	Xã Phước Long	Phuoc Long Commune	Phước Long	Phuoc Long	4	96
31876	vinh_phuoc	Xã Vĩnh Phước	Vinh Phuoc Commune	Vĩnh Phước	Vinh Phuoc	4	96
31882	vinh_thanh	Xã Vĩnh Thanh	Vinh Thanh Commune	Vĩnh Thanh	Vinh Thanh	4	96
31885	phong_hiep	Xã Phong Hiệp	Phong Hiep Commune	Phong Hiệp	Phong Hiep	4	96
31891	hoa_binh	Xã Hòa Bình	Hoa Binh Commune	Hòa Bình	Hoa Binh	4	96
31894	chau_thoi	Xã Châu Thới	Chau Thoi Commune	Châu Thới	Chau Thoi	4	96
31900	vinh_loi	Xã Vĩnh Lợi	Vinh Loi Commune	Vĩnh Lợi	Vinh Loi	4	96
31906	hung_hoi	Xã Hưng Hội	Hung Hoi Commune	Hưng Hội	Hung Hoi	4	96
31918	vinh_my	Xã Vĩnh Mỹ	Vinh My Commune	Vĩnh Mỹ	Vinh My	4	96
31927	vinh_hau	Xã Vĩnh Hậu	Vinh Hau Commune	Vĩnh Hậu	Vinh Hau	4	96
31957	phong_thanh	Xã Phong Thạnh	Phong Thanh Commune	Phong Thạnh	Phong Thanh	4	96
31972	ganh_hao	Xã Gành Hào	Ganh Hao Commune	Gành Hào	Ganh Hao	4	96
31975	dong_hai	Xã Đông Hải	Dong Hai Commune	Đông Hải	Dong Hai	4	96
31985	long_dien	Xã Long Điền	Long Dien Commune	Long Điền	Long Dien	4	96
31988	an_trach	Xã An Trạch	An Trach Commune	An Trạch	An Trach	4	96
31993	dinh_thanh	Xã Định Thành	Dinh Thanh Commune	Định Thành	Dinh Thanh	4	96
32044	nguyen_phich	Xã Nguyễn Phích	Nguyen Phich Commune	Nguyễn Phích	Nguyen Phich	4	96
32047	u_minh	Xã U Minh	U Minh Commune	U Minh	U Minh	4	96
32059	khanh_an	Xã Khánh An	Khanh An Commune	Khánh An	Khanh An	4	96
32062	khanh_lam	Xã Khánh Lâm	Khanh Lam Commune	Khánh Lâm	Khanh Lam	4	96
32065	thoi_binh	Xã Thới Bình	Thoi Binh Commune	Thới Bình	Thoi Binh	4	96
32069	bien_bach	Xã Biển Bạch	Bien Bach Commune	Biển Bạch	Bien Bach	4	96
32071	tri_phai	Xã Trí Phải	Tri Phai Commune	Trí Phải	Tri Phai	4	96
32083	tan_loc	Xã Tân Lộc	Tan Loc Commune	Tân Lộc	Tan Loc	4	96
32092	ho_thi_ky	Xã Hồ Thị Kỷ	Ho Thi Ky Commune	Hồ Thị Kỷ	Ho Thi Ky	4	96
32095	tran_van_thoi	Xã Trần Văn Thời	Tran Van Thoi Commune	Trần Văn Thời	Tran Van Thoi	4	96
32098	song_doc	Xã Sông Đốc	Song Doc Commune	Sông Đốc	Song Doc	4	96
32104	da_bac	Xã Đá Bạc	Da Bac Commune	Đá Bạc	Da Bac	4	96
32110	khanh_binh	Xã Khánh Bình	Khanh Binh Commune	Khánh Bình	Khanh Binh	4	96
32119	khanh_hung	Xã Khánh Hưng	Khanh Hung Commune	Khánh Hưng	Khanh Hung	4	96
32128	cai_nuoc	Xã Cái Nước	Cai Nuoc Commune	Cái Nước	Cai Nuoc	4	96
32134	luong_the_tran	Xã Lương Thế Trân	Luong The Tran Commune	Lương Thế Trân	Luong The Tran	4	96
32137	tan_hung	Xã Tân Hưng	Tan Hung Commune	Tân Hưng	Tan Hung	4	96
32140	hung_my	Xã Hưng Mỹ	Hung My Commune	Hưng Mỹ	Hung My	4	96
32152	dam_doi	Xã Đầm Dơi	Dam Doi Commune	Đầm Dơi	Dam Doi	4	96
32155	ta_an_khuong	Xã Tạ An Khương	Ta An Khuong Commune	Tạ An Khương	Ta An Khuong	4	96
32161	tran_phan	Xã Trần Phán	Tran Phan Commune	Trần Phán	Tran Phan	4	96
32167	tan_thuan	Xã Tân Thuận	Tan Thuan Commune	Tân Thuận	Tan Thuan	4	96
32182	quach_pham	Xã Quách Phẩm	Quach Pham Commune	Quách Phẩm	Quach Pham	4	96
32185	thanh_tung	Xã Thanh Tùng	Thanh Tung Commune	Thanh Tùng	Thanh Tung	4	96
32188	tan_tien	Xã Tân Tiến	Tan Tien Commune	Tân Tiến	Tan Tien	4	96
32191	nam_can	Xã Năm Căn	Nam Can Commune	Năm Căn	Nam Can	4	96
32201	dat_moi	Xã Đất Mới	Dat Moi Commune	Đất Mới	Dat Moi	4	96
32206	tam_giang	Xã Tam Giang	Tam Giang Commune	Tam Giang	Tam Giang	4	96
32212	cai_doi_vam	Xã Cái Đôi Vàm	Cai Doi Vam Commune	Cái Đôi Vàm	Cai Doi Vam	4	96
32214	phu_my	Xã Phú Mỹ	Phu My Commune	Phú Mỹ	Phu My	4	96
32218	phu_tan	Xã Phú Tân	Phu Tan Commune	Phú Tân	Phu Tan	4	96
32227	nguyen_viet_khai	Xã Nguyễn Việt Khái	Nguyen Viet Khai Commune	Nguyễn Việt Khái	Nguyen Viet Khai	4	96
32236	tan_an	Xã Tân Ân	Tan An Commune	Tân Ân	Tan An	4	96
32244	phan_ngoc_hien	Xã Phan Ngọc Hiển	Phan Ngoc Hien Commune	Phan Ngọc Hiển	Phan Ngoc Hien	4	96
32248	dat_mui	Xã Đất Mũi	Dat Mui Commune	Đất Mũi	Dat Mui	4	96
\.


--
-- Data for Name: work_approach; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.work_approach (id, created_at, created_by, deleted_at, deleted_by, name, updated_at, updated_by) FROM stdin;
1	2026-03-03 19:26:11.754062	admin	\N	\N	Onsite	2026-03-03 19:26:11.754062	admin
2	2026-03-03 19:26:11.754062	admin	\N	\N	Remote	2026-03-03 19:26:11.754062	admin
\.


--
-- Data for Name: work_experiences; Type: TABLE DATA; Schema: public; Owner: recruitify
--

COPY public.work_experiences (id, company_name, description, end_date, job_title, location, start_date, user_profile_id) FROM stdin;
1	FPT Software	Worked on enterprise Java systems using Spring Boot and PostgreSQL.	2022-08-31	Backend Developer	Da Nang, Vietnam	2021-06-01	1
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.account_id_seq', 1, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.company_id_seq', 1, false);


--
-- Name: education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.education_id_seq', 1, false);


--
-- Name: employment_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.employment_type_id_seq', 1, false);


--
-- Name: experience_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.experience_level_id_seq', 1, false);


--
-- Name: job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.job_id_seq', 1, false);


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.skills_id_seq', 1, false);


--
-- Name: work_approach_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.work_approach_id_seq', 1, false);


--
-- Name: work_experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: recruitify
--

SELECT pg_catalog.setval('public.work_experiences_id_seq', 1, false);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: administrative_units administrative_units_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.administrative_units
    ADD CONSTRAINT administrative_units_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: education education_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (id);


--
-- Name: employment_type employment_type_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.employment_type
    ADD CONSTRAINT employment_type_pkey PRIMARY KEY (id);


--
-- Name: experience_level experience_level_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.experience_level
    ADD CONSTRAINT experience_level_pkey PRIMARY KEY (id);


--
-- Name: job job_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);


--
-- Name: job_skill job_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job_skill
    ADD CONSTRAINT job_skill_pkey PRIMARY KEY (job_id, skill_id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (account_id);


--
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (code);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: account uk_gex1lmaqpg0ir5g1f5eftyaa1; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT uk_gex1lmaqpg0ir5g1f5eftyaa1 UNIQUE (username);


--
-- Name: refresh_tokens uk_ghpmfn23vmxfu3spu3lfg4r2d; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT uk_ghpmfn23vmxfu3spu3lfg4r2d UNIQUE (token);


--
-- Name: account uk_q0uja26qgu1atulenwup9rxyr; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT uk_q0uja26qgu1atulenwup9rxyr UNIQUE (email);


--
-- Name: account ukq0uja26qgu1atulenwup9rxyr; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT ukq0uja26qgu1atulenwup9rxyr UNIQUE (email);


--
-- Name: wards wards_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.wards
    ADD CONSTRAINT wards_pkey PRIMARY KEY (code);


--
-- Name: work_approach work_approach_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.work_approach
    ADD CONSTRAINT work_approach_pkey PRIMARY KEY (id);


--
-- Name: work_experiences work_experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.work_experiences
    ADD CONSTRAINT work_experiences_pkey PRIMARY KEY (id);


--
-- Name: job fk1jtisqv4yk9oxdk2a2qgdnwq6; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fk1jtisqv4yk9oxdk2a2qgdnwq6 FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: job fk3ac1ea229kkph0rxkglsl1a1t; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fk3ac1ea229kkph0rxkglsl1a1t FOREIGN KEY (experience_level_id) REFERENCES public.experience_level(id);


--
-- Name: job fk5q04favsasq8y70bsei7wv8fc; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fk5q04favsasq8y70bsei7wv8fc FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: profiles fk7r5m4wenf0gpdakt0if9jxhyk; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT fk7r5m4wenf0gpdakt0if9jxhyk FOREIGN KEY (province_code) REFERENCES public.provinces(code);


--
-- Name: job_skill fk9ix4wg520ii2gu2felxdhdup6; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job_skill
    ADD CONSTRAINT fk9ix4wg520ii2gu2felxdhdup6 FOREIGN KEY (job_id) REFERENCES public.job(id);


--
-- Name: wards fkbbn5fb8ddvvbruv27f9yj8dhx; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.wards
    ADD CONSTRAINT fkbbn5fb8ddvvbruv27f9yj8dhx FOREIGN KEY (administrative_unit_id) REFERENCES public.administrative_units(id);


--
-- Name: job_skill fkdh76859joo68p6dbj9erh4pbs; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job_skill
    ADD CONSTRAINT fkdh76859joo68p6dbj9erh4pbs FOREIGN KEY (skill_id) REFERENCES public.skills(id);


--
-- Name: job fke2c3t57e2hr51sg7doafceqrt; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fke2c3t57e2hr51sg7doafceqrt FOREIGN KEY (work_approach_id) REFERENCES public.work_approach(id);


--
-- Name: job fkek0pj6tin0xvky5qxsj49190v; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fkek0pj6tin0xvky5qxsj49190v FOREIGN KEY (ward_code) REFERENCES public.wards(code);


--
-- Name: account fkgdpd8e1vs356bjg287jr27pl7; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT fkgdpd8e1vs356bjg287jr27pl7 FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: education fkj3fa1g1bam6ga9bco6qrkum08; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT fkj3fa1g1bam6ga9bco6qrkum08 FOREIGN KEY (user_profile_id) REFERENCES public.profiles(account_id);


--
-- Name: job fkm01u49rkk4myw78nede7udym6; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT fkm01u49rkk4myw78nede7udym6 FOREIGN KEY (employment_type_id) REFERENCES public.employment_type(id);


--
-- Name: wards fkm20w5foy3ba7txbvrlrsjxcih; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.wards
    ADD CONSTRAINT fkm20w5foy3ba7txbvrlrsjxcih FOREIGN KEY (province_code) REFERENCES public.provinces(code);


--
-- Name: refresh_tokens fkoudpq400piginvq6tymq2lrxt; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT fkoudpq400piginvq6tymq2lrxt FOREIGN KEY (user_id) REFERENCES public.account(id);


--
-- Name: provinces fkqenrpv1j8q01yhmvol8avi09s; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT fkqenrpv1j8q01yhmvol8avi09s FOREIGN KEY (administrative_unit_id) REFERENCES public.administrative_units(id);


--
-- Name: work_experiences fkqtubojo4ssll6vpwdcbxgmwut; Type: FK CONSTRAINT; Schema: public; Owner: recruitify
--

ALTER TABLE ONLY public.work_experiences
    ADD CONSTRAINT fkqtubojo4ssll6vpwdcbxgmwut FOREIGN KEY (user_profile_id) REFERENCES public.profiles(account_id);


--
-- PostgreSQL database dump complete
--

\unrestrict ocDo0UXpuCmD7CqoKn8hVZYbZ8HCYL3gkWgDiVPfEjR5jnKPJWofxccN4Y3Degi


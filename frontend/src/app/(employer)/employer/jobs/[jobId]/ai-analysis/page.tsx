import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  Eye,
  Lightbulb,
  MapPin,
  PenLine,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import styles from './page.module.css';

const analysis = {
  quality: {
    overall: 100,
    checks: [
      ['Title', true],
      ['Requirements', true],
      ['Responsibilities', true],
      ['Benefits', true],
      ['Description length', true],
      ['Salary', true],
    ] as const,
  },
  market: {
    yourApplied: 23,
    yourViews: 60,
    averageApplied: 42.3,
    topSimilarApplied: 80,
    similarity: 92.1,
    currentJob: {
      title: 'Senior SQL Developer',
      company: 'ChainWorks',
      category: 'Information Technology',
      employmentType: 'Full-time',
      experienceLevel: 'Senior',
      workApproach: 'Remote',
      location: 'Hồ Tràm, Thành phố Hồ Chí Minh',
      salary: '3,000 - 4,000 USD',
      applied: 23,
      views: 60,
    },
    similarJob: {
      title: 'Senior ETL Developer',
      company: 'ShopSphere',
      category: 'Information Technology',
      employmentType: 'Contract',
      experienceLevel: 'Senior',
      workApproach: 'Onsite',
      location: 'Gò Dầu, Tỉnh Tây Ninh',
      salary: '2,600 - 4,000 USD',
      applied: 80,
      views: 1296,
    },
    selectionReason:
      'Trong tin tuyển dụng cùng ngành Information Technology, cùng cấp bậc Senior, đây là tin đang thu hút nhiều ứng viên nhất — nên được chọn để so sánh với tin của bạn.',
    comparison: [
      { field: 'Applications', yours: '23', competitor: '80', verdict: 'worse' },
      { field: 'Views', yours: '60', competitor: '1,296', verdict: 'worse' },
      { field: 'Salary range', yours: '3,000 - 4,000', competitor: '2,600 - 4,000', verdict: 'equal' },
      {
        field: 'Location',
        yours: 'Hồ Tràm, Thành phố Hồ Chí Minh',
        competitor: 'Gò Dầu, Tỉnh Tây Ninh',
        verdict: 'different',
      },
      { field: 'Employment type', yours: 'Full-time', competitor: 'Contract', verdict: 'different' },
      { field: 'Work approach', yours: 'Remote', competitor: 'Onsite', verdict: 'different' },
      { field: 'Experience level', yours: 'Senior', competitor: 'Senior', verdict: 'equal' },
      { field: 'Description length', yours: '55 words', competitor: '47 words', verdict: 'better' },
      { field: 'Benefit richness', yours: '10 words', competitor: '8 words', verdict: 'better' },
    ] as const,
    gaps: [
      'Lượt xem thấp hơn 21 lần so với job tương đồng (60 vs 1,296). Tối ưu tiêu đề, mô tả và từ khóa SEO.',
      'Lượt ứng tuyển thấp hơn 57 lượt (23 vs 80). Điều chỉnh mức lương cạnh tranh hoặc bổ sung phúc lợi hấp dẫn.',
    ],
    benefits: [
      "Thêm 'Flexible working hours' để thu hút ứng viên.",
      "Thêm 'WFH 3 days/week' để tăng tính linh hoạt.",
      "Thêm 'Annual trip' để nâng cao trải nghiệm nhân viên.",
    ],
    recommendations: [
      "Tối ưu tiêu đề: thêm từ khóa 'ETL Developer' hoặc 'Data Engineer' vào job.",
      "Bổ sung phúc lợi 'WFH 3 ngày/tuần' và 'Chuyến du lịch thường niên'.",
      'Tăng mức lương tối thiểu lên 3,200 USD để cạnh tranh trực tiếp với job tương đồng.',
    ],
  },
};

type JobSummary = typeof analysis.market.currentJob;

export default function AiAnalysisPage() {
  return (
    <main className={styles.page}>
      <Link href="/employer/jobs" className={styles.backLink}>
        <ArrowLeft size={16} aria-hidden />
        Back to jobs
      </Link>

      <header className={styles.pageHeader}>
        <div>
          <div className={styles.eyebrow}>
            <Sparkles size={15} aria-hidden />
            AI market intelligence
          </div>
          <h1>{analysis.market.currentJob.title}</h1>
          <p>
            {analysis.market.currentJob.company}
            <span aria-hidden>•</span>
            {analysis.market.currentJob.category}
          </p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.secondaryButton}>
            <RefreshCw size={16} aria-hidden />
            Analyze again
          </button>
          <button type="button" className={styles.primaryButton}>
            <PenLine size={16} aria-hidden />
            Edit job
          </button>
        </div>
      </header>

      <section className={styles.overviewGrid} aria-label="Analysis overview">
        <article className={styles.scoreCard}>
          <div className={styles.scoreRing} style={{ '--score': analysis.quality.overall } as React.CSSProperties}>
            <strong>{analysis.quality.overall}</strong>
            <span>/100</span>
          </div>
          <div className={styles.scoreContent}>
            <p className={styles.cardLabel}>Job completeness</p>
            <h2>Your posting is complete</h2>
            <p>All essential job information is present and ready for candidates.</p>
            <div className={styles.checkList}>
              {analysis.quality.checks.map(([label]) => (
                <span key={label}>
                  <Check size={12} aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className={styles.metricGrid}>
          <MetricCard icon={<Users size={19} />} label="Applications" value="23" detail="45.6% below average" tone="danger" />
          <MetricCard icon={<TrendingUp size={19} />} label="Market average" value="42.3" detail="Applications per job" />
          <MetricCard icon={<Eye size={19} />} label="Job views" value="60" detail="21× below top listing" tone="danger" />
          <MetricCard icon={<Trophy size={19} />} label="Top similar job" value="80" detail="Applications" tone="success" />
        </div>
      </section>

      <section className={styles.alertBanner} aria-label="Primary AI insight">
        <span className={styles.alertIcon}>
          <TrendingUp size={21} aria-hidden />
        </span>
        <div>
          <strong>Your biggest opportunity is visibility</strong>
          <p>
            The top similar job receives 21× more views. Improving search keywords and the job title can increase your
            candidate reach.
          </p>
        </div>
        <ArrowUpRight size={20} aria-hidden />
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Competitive benchmark"
          title="Your job vs. the market leader"
          description="Compare the factors influencing candidate reach and application conversion."
        />

        <div className={styles.jobComparisonGrid}>
          <JobCard label="Your job" job={analysis.market.currentJob} />
          <JobCard
            label="Top-performing similar job"
            job={analysis.market.similarJob}
            highlighted
            badge={`${analysis.market.similarity}% match`}
          />
        </div>

        <div className={styles.selectionReason}>
          <Target size={18} aria-hidden />
          <p>{analysis.market.selectionReason}</p>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Detailed benchmark"
          title="Market comparison"
          description="A field-by-field view of where your posting leads, matches, or differs."
        />
        <div className={styles.tableWrap}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Your job</th>
                <th>Similar job</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {analysis.market.comparison.map((row) => (
                <tr key={row.field}>
                  <th scope="row">{row.field}</th>
                  <td>{row.yours}</td>
                  <td>{row.competitor}</td>
                  <td>
                    <span className={`${styles.verdict} ${styles[`verdict_${row.verdict}`]}`}>{row.verdict}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.insightsGrid}>
        <InsightCard icon={<AlertTriangle size={19} />} eyebrow="Priority gaps" title="Performance gaps" tone="warning">
          <NumberedList items={analysis.market.gaps} />
        </InsightCard>

        <InsightCard icon={<Lightbulb size={19} />} eyebrow="Recommended next steps" title="AI recommendations" tone="primary">
          <NumberedList items={analysis.market.recommendations} />
          <button type="button" className={styles.cardAction}>
            Edit job with suggestions
            <ArrowUpRight size={15} aria-hidden />
          </button>
        </InsightCard>

        <InsightCard icon={<Sparkles size={19} />} eyebrow="Candidate appeal" title="Benefits to consider" tone="success">
          <ul className={styles.bulletList}>
            {analysis.market.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </InsightCard>

        <InsightCard icon={<BriefcaseBusiness size={19} />} eyebrow="Skills coverage" title="More data needed" tone="neutral">
          <div className={styles.emptyState}>
            <p>Skills data is unavailable, so AI cannot benchmark role-specific capabilities yet.</p>
            <button type="button">Add skills to job</button>
          </div>
        </InsightCard>
      </section>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  tone?: 'neutral' | 'danger' | 'success';
}) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricIcon}>{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span className={styles[`metricDetail_${tone}`]}>{detail}</span>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className={styles.sectionHeading}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function JobCard({ label, job, highlighted = false, badge }: { label: string; job: JobSummary; highlighted?: boolean; badge?: string }) {
  return (
    <article className={`${styles.jobCard} ${highlighted ? styles.jobCardHighlighted : ''}`}>
      <div className={styles.jobCardTopline}>
        <span>{label}</span>
        {badge && <strong>{badge}</strong>}
      </div>
      <h3>{job.title}</h3>
      <p className={styles.companyName}>{job.company}</p>
      <div className={styles.jobMeta}>
        <span>
          <BriefcaseBusiness size={15} aria-hidden /> {job.employmentType} · {job.experienceLevel}
        </span>
        <span>
          <MapPin size={15} aria-hidden /> {job.location} · {job.workApproach}
        </span>
        <span>
          <CircleDollarSign size={15} aria-hidden /> {job.salary}
        </span>
      </div>
      <div className={styles.jobStats}>
        <div>
          <span>Applications</span>
          <strong>{job.applied}</strong>
        </div>
        <div>
          <span>Views</span>
          <strong>{job.views.toLocaleString('en-US')}</strong>
        </div>
      </div>
    </article>
  );
}

function InsightCard({
  icon,
  eyebrow,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  tone: 'warning' | 'primary' | 'success' | 'neutral';
  children: React.ReactNode;
}) {
  return (
    <article className={`${styles.insightCard} ${styles[`insightCard_${tone}`]}`}>
      <div className={styles.insightTitle}>
        <span>{icon}</span>
        <div>
          <p>{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </article>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className={styles.numberedList}>
      {items.map((item, index) => (
        <li key={item}>
          <span>{index + 1}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

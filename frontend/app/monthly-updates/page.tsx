import PageHeader from "@/components/PageHeader";
import styles from "./page.module.scss";

const metrics = [
  { label: "Approvals closed", value: "42", detail: "+12% vs May" },
  { label: "Average SLA", value: "16h", detail: "-4h improvement" },
  { label: "Overlap risk", value: "3 windows", detail: "Needs staffing plan" },
];

const timeline = [
  {
    week: "Week 1",
    title: "FY25 PTO policy refresh",
    detail: "Legal review complete · published to handbook",
    owner: "People Ops",
    status: "done",
  },
  {
    week: "Week 2",
    title: "Integration with Workday",
    detail: "Syncing balances nightly · monitoring variance",
    owner: "Systems",
    status: "in-progress",
  },
  {
    week: "Week 3",
    title: "Leadership handoff brief",
    detail: "Slides drafted · needs dept inputs",
    owner: "Ops",
    status: "review",
  },
  {
    week: "Week 4",
    title: "H2 blackout windows",
    detail: "Gathering critical ship dates",
    owner: "PMO",
    status: "up-next",
  },
];

const nudges = [
  { title: "Product org · July 15", detail: "32% overlap · assign backup owners" },
  { title: "Finance close", detail: "Lock PTO approvals June 24 - July 1" },
  { title: "New manager toolkit", detail: "Share review checklist in weekly note" },
];

const monthlyTable = [
  { team: "Product", approved: 18, pending: 2, avgBalance: "15d" },
  { team: "Design", approved: 9, pending: 1, avgBalance: "12d" },
  { team: "Engineering", approved: 27, pending: 4, avgBalance: "14d" },
  { team: "Ops", approved: 8, pending: 0, avgBalance: "16d" },
];

export default function MonthlyUpdatesPage() {
  return (
    <section className={styles.wrapper}>
      <PageHeader
        overline="Monthly briefing"
        title="June updates & action items"
        subtitle="Snapshot of what shipped, what is in motion, and where leadership should lean in."
        badges={[{ label: "Next review · Jul 30" }]}
        actions={[{ label: "Share recap" }, { label: "Schedule review", variant: "primary" }]}
      />

      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.detail}</span>
          </div>
        ))}
      </div>

      <div className={styles.timelineCard}>
        <div className={styles.timelineHeader}>
          <div>
            <h3>Weekly milestones</h3>
            <p>Track progress and unblock owners</p>
          </div>
          <button>Add milestone</button>
        </div>

        <ul className={styles.timeline}>
          {timeline.map((item) => (
            <li key={item.title}>
              <div className={styles.week}>{item.week}</div>
              <div className={styles.timelineBody}>
                <div className={styles.badgeRow}>
                  <span className={`${styles.status} ${styles[item.status.replace("-", "")]}`}>
                    {item.status.replace("-", " ")}
                  </span>
                  <span className={styles.owner}>{item.owner}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottomGrid}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Leadership nudges</h3>
            <button>Send reminder</button>
          </div>
          <ul className={styles.list}>
            {nudges.map((nudge) => (
              <li key={nudge.title}>
                <h4>{nudge.title}</h4>
                <p>{nudge.detail}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Team totals · June</h3>
            <button>Export</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Team</th>
                <th>Approved</th>
                <th>Pending</th>
                <th>Avg balance</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTable.map((row) => (
                <tr key={row.team}>
                  <td>{row.team}</td>
                  <td>{row.approved}</td>
                  <td>{row.pending}</td>
                  <td>{row.avgBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </section>
  );
}

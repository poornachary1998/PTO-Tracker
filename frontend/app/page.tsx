import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import StatCard, { type Accent } from "@/components/StatCard";
import styles from "./page.module.scss";

type StatCardData = {
  title: string;
  value: string;
  description?: string;
  delta?: string;
  deltaLabel?: string;
  accent: Accent;
  icon: ReactNode;
};

const statCards: StatCardData[] = [
  {
    title: "Active employees",
    value: "128",
    description: "Across 6 teams",
    delta: "+4",
    deltaLabel: "vs last month",
    accent: "primary",
    icon: <TeamIcon />,
  },
  {
    title: "Avg PTO balance",
    value: "14.6d",
    description: "Per employee",
    delta: "-0.4d",
    deltaLabel: "utilization trend",
    accent: "warning",
    icon: <SuitcaseIcon />,
  },
  {
    title: "Requests in review",
    value: "5",
    description: "Need approval",
    delta: "2 overdue",
    deltaLabel: "Escalated",
    accent: "success",
    icon: <ClipboardIcon />,
  },
  {
    title: "Coverage score",
    value: "92%",
    description: "Upcoming 30 days",
    delta: "+6%",
    deltaLabel: "staffing health",
    accent: "neutral",
    icon: <ShieldIcon />,
  },
];

const availability = [
  { name: "Avery Collins", role: "Design Lead", status: "In office", hours: "8 / 8h", team: "Design" },
  { name: "Kai Nunez", role: "People Ops", status: "WFH", hours: "6 / 8h", team: "HR" },
  { name: "Morgan Patel", role: "Frontend", status: "Out · PTO", hours: "0 / 8h", team: "Product" },
  { name: "Sydney Lee", role: "Data", status: "Client travel", hours: "4 / 8h", team: "Insights" },
];

const upcomingPto = [
  { name: "Harris Blake", span: "Jun 18 → Jun 21", type: "Family", status: "Approved" },
  { name: "Priya Shah", span: "Jun 24 → Jun 28", type: "Sabbatical", status: "Pending" },
  { name: "Jonah Reeves", span: "Jul 2 → Jul 5", type: "Travel", status: "In review" },
];

const announcements = [
  { title: "Quarter close blackout", detail: "Ops & Finance heads down 6/25 - 6/28" },
  { title: "Wellness Friday", detail: "Company-wide recharge day on 7/12" },
  { title: "Policy refresh", detail: "New parental leave guidelines published" },
];

export default function HomePage() {
  return (
    <section className={styles.dashboard}>
      <PageHeader
        overline="Operations overview"
        title="Employee health, PTO balance & coverage"
        subtitle="Track every team in one place. Review pending requests, staffing gaps, and highlights for this month."
        badges={[
          { label: "SLA healthy", tone: "success" },
          { label: "3 escalations", tone: "warning" },
        ]}
        actions={[
          { label: "Share snapshot" },
          { label: "New request", variant: "primary" },
        ]}
      />

      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            delta={card.delta}
            deltaLabel={card.deltaLabel}
            accent={card.accent}
            icon={card.icon}
          />
        ))}
      </div>

      <div className={styles.splitPanel}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Team availability today</h3>
              <p>Live sync with Google Calendar</p>
            </div>
            <button>View schedule</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Team member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((row) => (
                <tr key={row.name}>
                  <td>
                    <div>
                      <p className={styles.name}>{row.name}</p>
                      <span className={styles.muted}>{row.team}</span>
                    </div>
                  </td>
                  <td>{row.role}</td>
                  <td>
                    <span className={`${styles.pill} ${styles[row.status.toLowerCase().split(" ")[0]]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Upcoming PTO</h3>
              <p>Next 6 approved windows</p>
            </div>
            <button>Manage calendar</button>
          </div>

          <ul className={styles.ptoList}>
            {upcomingPto.map((pto) => (
              <li key={pto.name} className={styles.ptoRow}>
                <div>
                  <p className={styles.name}>{pto.name}</p>
                  <span className={styles.muted}>{pto.type}</span>
                </div>
                <div>
                  <p className={styles.name}>{pto.span}</p>
                  <span className={styles.ptoStatus}>{pto.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className={styles.bottomGrid}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Highlights</h3>
              <p>Monthly nudge to share with leadership</p>
            </div>
            <button>Export digest</button>
          </div>
          <div className={styles.highlights}>
            <div>
              <p className={styles.label}>Coverage peak</p>
              <h4>Week of July 1</h4>
              <p className={styles.muted}>Only 6% of team out · all deliverables on track.</p>
            </div>
            <div>
              <p className={styles.label}>Risk window</p>
              <h4>Week of July 15</h4>
              <p className={styles.muted}>Product squad hitting 32% PTO overlap · plan backfills.</p>
            </div>
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3>Announcements</h3>
              <p>Shared with entire org</p>
            </div>
            <button>Create note</button>
          </div>
          <ul className={styles.announcementList}>
            {announcements.map((item) => (
              <li key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function SuitcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4V2h6v2h5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 0h2V4zM4 8v11h16V8z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 2h6v2h4v18H5V4h4zM8 8v2h8V8zm0 4v2h8v-2zm0 4v2h5v-2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6z" />
    </svg>
  );
}

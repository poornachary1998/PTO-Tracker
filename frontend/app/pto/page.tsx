import PageHeader from "@/components/PageHeader";
import styles from "./page.module.scss";

const requests = [
  {
    employee: "Jordan Kim",
    team: "Frontend",
    dates: "Jun 24 → Jun 28",
    type: "Vacation",
    status: "Pending",
    coverage: "Ava (backup)",
  },
  {
    employee: "Priya Shah",
    team: "People Ops",
    dates: "Jun 24 → Aug 2",
    type: "Sabbatical",
    status: "In review",
    coverage: "Leah owning approvals",
  },
  {
    employee: "Mateo Ruiz",
    team: "Data",
    dates: "Jul 11 → Jul 15",
    type: "Family",
    status: "Approved",
    coverage: "Shifts to Sydney",
  },
  {
    employee: "Nia Brooks",
    team: "Customer Success",
    dates: "Jul 18 → Jul 22",
    type: "Travel",
    status: "Pending",
    coverage: "Need plan",
  },
];

const quickActions = [
  "Auto-approve requests under 3 days",
  "Share summer blackout guidance",
  "Remind managers with overdue reviews",
];

const policies = [
  { title: "Carryover limit", detail: "Max 5 days after Dec 31" },
  { title: "Blackout windows", detail: "Finance close & product launch" },
  { title: "Minimum balance", detail: "Keep < 25 days banked" },
];

export default function PTOPage() {
  return (
    <section className={styles.wrapper}>
      <PageHeader
        overline="PTO workflow"
        title="Requests, approvals & coverage"
        subtitle="Review who is out, confirm coverage, and nudge managers before deadlines."
        actions={[
          { label: "Download calendar" },
          { label: "Create request", variant: "primary" },
        ]}
      />

      <div className={styles.summaryRow}>
        <div>
          <p>Waiting approval</p>
          <strong>5 requests</strong>
          <span>SLA 12h · 2 escalations</span>
        </div>
        <div>
          <p>Next blackout</p>
          <strong>Jun 25 - Jun 28</strong>
          <span>Finance close</span>
        </div>
        <div>
          <p>Coverage health</p>
          <strong>92%</strong>
          <span>Next 30 days</span>
        </div>
        <div className={styles.actions}>
          <button>Approve all safe</button>
          <button>Notify managers</button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h3>Requests in queue</h3>
            <p>Sorted by requested date</p>
          </div>
          <div className={styles.tableActions}>
            <button>Assign reviewer</button>
            <button className={styles.primaryBtn}>Bulk update</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Team</th>
              <th>Dates</th>
              <th>Type</th>
              <th>Status</th>
              <th>Coverage plan</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.employee}>
                <td>{request.employee}</td>
                <td>{request.team}</td>
                <td>{request.dates}</td>
                <td>{request.type}</td>
                <td>
                  <span className={`${styles.status} ${styles[request.status.replace(" ", "").toLowerCase()]}`}>
                    {request.status}
                  </span>
                </td>
                <td>{request.coverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.bottomGrid}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Quick automations</h3>
            <button>Create rule</button>
          </div>
          <ul className={styles.list}>
            {quickActions.map((action) => (
              <li key={action}>
                <p>{action}</p>
                <button>Trigger</button>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Policy reminders</h3>
            <button>Update policy</button>
          </div>
          <ul className={styles.policyList}>
            {policies.map((policy) => (
              <li key={policy.title}>
                <h4>{policy.title}</h4>
                <p>{policy.detail}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Coverage planner</h3>
            <button>Open calendar</button>
          </div>
          <div className={styles.progressPanel}>
            <div>
              <p>Product org</p>
              <div className={styles.progress}>
                <div style={{ width: "82%" }} />
              </div>
              <span>Safe · 82% staffed</span>
            </div>
            <div>
              <p>Design org</p>
              <div className={styles.progress}>
                <div style={{ width: "62%", background: "#f97316" }} />
              </div>
              <span>Risk · need backup</span>
            </div>
            <div>
              <p>Support org</p>
              <div className={styles.progress}>
                <div style={{ width: "95%", background: "#16a34a" }} />
              </div>
              <span>Fully covered</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

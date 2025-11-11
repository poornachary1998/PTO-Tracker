import PageHeader from "@/components/PageHeader";
import styles from "./page.module.scss";

const filterChips = ["All", "Product", "Design", "Engineering", "People Ops", "Finance"];

const statusTone = {
  active: "statusActive",
  pto: "statusPto",
  leave: "statusLeave",
  ramp: "statusRamp",
} as const;

const employees = [
  {
    name: "Avery Collins",
    id: "EMP-1082",
    team: "Product Design",
    manager: "Leah Patel",
    location: "Austin, TX",
    status: "Active",
    balance: "16d",
  },
  {
    name: "Jordan Kim",
    id: "EMP-1210",
    team: "Frontend",
    manager: "Victor Reyes",
    location: "Remote · NYC",
    status: "PTO",
    balance: "4d",
  },
  {
    name: "Priya Shah",
    id: "EMP-1188",
    team: "People Ops",
    manager: "Harper Voss",
    location: "Seattle, WA",
    status: "Leave",
    balance: "0d",
  },
  {
    name: "Mateo Ruiz",
    id: "EMP-1099",
    team: "Data",
    manager: "Jonah Reeves",
    location: "Remote · Madrid",
    status: "Active",
    balance: "11d",
  },
  {
    name: "Nia Brooks",
    id: "EMP-1242",
    team: "Customer Success",
    manager: "Carmen Leigh",
    location: "Atlanta, GA",
    status: "Ramp",
    balance: "3d",
  },
];

const newHires = [
  { name: "Maxine Roy", team: "Product Marketing", start: "Jul 8" },
  { name: "Theo Marsh", team: "Core Engineering", start: "Jul 15" },
  { name: "Hana Iruz", team: "Analytics", start: "Jul 22" },
];

const teamLoad = [
  { team: "Product", load: 78, risk: "Stable" },
  { team: "Design", load: 64, risk: "Add coverage" },
  { team: "Engineering", load: 91, risk: "High demand" },
  { team: "People Ops", load: 55, risk: "Comfortable" },
];

export default function EmployeesPage() {
  return (
    <section className={styles.wrapper}>
      <PageHeader
        overline="People directory"
        title="Employee roster & balances"
        subtitle="Monitor every teammate’s PTO bank, location, and reporting line. Stay ready for handoffs."
        actions={[
          { label: "Download CSV" },
          { label: "Add teammate", variant: "primary" },
        ]}
      />

      <div className={styles.metrics}>
        <div>
          <p>Headcount</p>
          <strong>128</strong>
          <span>+6 hires in pipeline</span>
        </div>
        <div>
          <p>Median balance</p>
          <strong>13 days</strong>
          <span>Goal: 10-15 days</span>
        </div>
        <div>
          <p>Open approvals</p>
          <strong>5</strong>
          <span>Avg SLA 18h</span>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.chips}>
          {filterChips.map((chip, index) => (
            <button key={chip} className={`${styles.chip} ${index === 0 ? styles.chipActive : ""}`}>
              {chip}
            </button>
          ))}
        </div>
        <select className={styles.select}>
          <option>Sort by balance</option>
          <option>Sort by name</option>
          <option>Sort by team</option>
        </select>
      </div>

      <div className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Team</th>
              <th>Manager</th>
              <th>Location</th>
              <th>Status</th>
              <th>PTO balance</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div>
                    <p className={styles.name}>{employee.name}</p>
                    <span className={styles.muted}>{employee.id}</span>
                  </div>
                </td>
                <td>{employee.team}</td>
                <td>{employee.manager}</td>
                <td>{employee.location}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[
                        statusTone[employee.status.toLowerCase() as keyof typeof statusTone] ??
                          "statusActive"
                      ]
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td>{employee.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.bottomGrid}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>New hires & ramp</h3>
            <button>View onboarding</button>
          </div>
          <ul className={styles.list}>
            {newHires.map((hire) => (
              <li key={hire.name}>
                <div>
                  <p className={styles.name}>{hire.name}</p>
                  <span className={styles.muted}>{hire.team}</span>
                </div>
                <span className={styles.muted}>Starts {hire.start}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Department load</h3>
            <button>Assign backups</button>
          </div>

          <div className={styles.loadList}>
            {teamLoad.map((team) => (
              <div key={team.team} className={styles.loadRow}>
                <div>
                  <p className={styles.name}>{team.team}</p>
                  <span className={styles.muted}>{team.risk}</span>
                </div>
                <div className={styles.progress}>
                  <div style={{ width: `${team.load}%` }} />
                </div>
                <span className={styles.muted}>{team.load}%</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

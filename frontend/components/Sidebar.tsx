"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

const navItems = [
  { label: "Overview", href: "/", icon: DashboardIcon },
  { label: "Employees", href: "/employees", icon: UsersIcon },
  { label: "Monthly Updates", href: "/monthly-updates", icon: CalendarIcon },
  { label: "PTO Planner", href: "/pto", icon: PlaneIcon },
  { label: "Announcements", href: "/updates", icon: BellIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>PTO</div>
        <div>
          <p className={styles.brandTitle}>PTO Tracker</p>
          <span className={styles.brandTag}>Employee Ops</span>
        </div>
      </div>

      <nav className={styles.navSection}>
        <p className={styles.navLabel}>Workspace</p>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.summaryCard}>
        <div>
          <p className={styles.summaryLabel}>Team availability</p>
          <p className={styles.summaryValue}>84%</p>
          <p className={styles.summaryTrend}>+3% vs last month</p>
        </div>
        <button className={styles.summaryAction}>Schedule sync</button>
      </div>
    </aside>
  );
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h6v7H4zm0 9h6v7H4zm10-9h6v11h-6zm0 13h6v3h-6z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 13a4 4 0 1 0-6 0 6 6 0 0 0-6 6h2a4 4 0 0 1 8 0h2a6 6 0 0 0-6-6 4 4 0 1 0 6 0zM15 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2v2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3V2h-2v2H9V2zM20 20H4V10h16z" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 13l8 3 2 7 3-7 5-4-6 1-4-10-2 9z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1z" />
    </svg>
  );
}

"use client";

import { usePathname } from "next/navigation";
import styles from "./TopBar.module.scss";

const titles: Record<string, string> = {
  "/": "Overview",
  "/employees": "Employees",
  "/monthly-updates": "Monthly Updates",
  "/pto": "PTO Planner",
  "/updates": "Announcements",
};

export default function TopBar() {
  const pathname = usePathname();
  const pageTitle = titles[pathname] ?? "Workspace";

  return (
    <header className={styles.topBar}>
      <div>
        <p className={styles.pageLabel}>Workspace · {pageTitle}</p>
        <h2 className={styles.pageTitle}>{pageTitle}</h2>
      </div>

      <div className={styles.actions}>
        <label className={styles.search}>
          <SearchIcon />
          <input placeholder="Search teammates, teams, requests" type="search" />
        </label>
        <button className={styles.ghostBtn}>Export</button>
        <button className={styles.primaryBtn}>New PTO</button>
        <div className={styles.avatar}>
          <span>AN</span>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3a7 7 0 1 0 4.32 12.53l4.1 4.1 1.42-1.42-4.1-4.1A7 7 0 0 0 10 3zm0 2a5 5 0 1 1-5 5 5 5 0 0 1 5-5z" />
    </svg>
  );
}

import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import styles from "./layout.module.scss";
import "./globals.scss";

export const metadata = {
  title: "PTO Tracker",
  description: "Modern PTO & employee operations dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.appShell}>
          <Sidebar />
          <div className={styles.mainContent}>
            <TopBar />
            <div className={styles.pageArea}>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

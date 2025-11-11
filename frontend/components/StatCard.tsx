import type { ReactNode } from "react";
import styles from "./StatCard.module.scss";

type Accent = "primary" | "success" | "warning" | "neutral";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  delta?: string;
  deltaLabel?: string;
  accent?: Accent;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  description,
  delta,
  deltaLabel,
  accent = "neutral",
  icon,
}: StatCardProps) {
  return (
    <article className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.meta}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {(delta || deltaLabel) && (
        <div className={styles.delta}>
          {delta && <span className={styles.deltaValue}>{delta}</span>}
          {deltaLabel && <span className={styles.deltaLabel}>{deltaLabel}</span>}
        </div>
      )}
    </article>
  );
}

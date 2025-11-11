import styles from "./PageHeader.module.scss";

type Action = {
  label: string;
  variant?: "primary" | "secondary";
};

type Badge = {
  label: string;
  tone?: "success" | "warning" | "default";
};

interface PageHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  badges?: Badge[];
  actions?: Action[];
}

export default function PageHeader({
  overline,
  title,
  subtitle,
  badges,
  actions,
}: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        {overline && <p className={styles.overline}>{overline}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {badges && badges.length > 0 && (
          <div className={styles.badges}>
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`${styles.badge} ${badge.tone ? styles[badge.tone] : ""}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {actions && actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((action) => (
            <button
              key={action.label}
              className={action.variant === "primary" ? styles.primary : styles.secondary}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

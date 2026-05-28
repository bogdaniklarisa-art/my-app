import type { UserStatus } from "@/types/user";
import styles from "./Badge.module.scss";

interface BadgeProps {
  status: UserStatus;
}

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`} role="status">
      {status}
    </span>
  );
}

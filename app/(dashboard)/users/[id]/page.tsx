import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchUserById } from "@/services/users";
import { UserProfile } from "@/components/features/UserDetails/UserProfile";
import { UserInfoSection } from "@/components/features/UserDetails/UserInfoSection";
import { Button } from "@/components/ui/Button/Button";
import styles from "./page.module.scss";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const user = await fetchUserById(id);
  return {
    title: user ? `${user.profile.fullName} — Lendsqr` : "User Not Found — Lendsqr",
  };
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const user = await fetchUserById(id);

  if (!user) {
    return (
      <div className={styles.page}>
        <Link href="/users" className={styles.backLink}>
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Users
        </Link>
        <div className={styles.notFound}>User not found.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href="/users" className={styles.backLink}>
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Users
        </Link>
      </div>

      <div className={styles.topBar}>
        <h1 className={styles.pageTitle}>User Details</h1>
        <div className={styles.actions}>
          <Button variant="danger" size="sm">
            Blacklist User
          </Button>
          <Button variant="outline" size="sm">
            Activate User
          </Button>
        </div>
      </div>

      <UserProfile user={user} />
      <UserInfoSection user={user} />
    </div>
  );
}

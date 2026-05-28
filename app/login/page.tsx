import Image from "next/image";
import { LoginForm } from "./LoginForm";
import styles from "./page.module.scss";

export const metadata = {
  title: "Login — Lendsqr",
};

function LendsqrLogo({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? "#213F7D" : "#FFFFFF";
  return (
    <svg width="144" height="30" viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Lendsqr logo">
      <rect width="30" height="30" rx="4" fill="#39CDCC" />
      <rect x="8" y="8" width="6" height="14" rx="1" fill="white" />
      <rect x="16" y="8" width="6" height="14" rx="1" fill="white" opacity="0.7" />
      <text x="38" y="21" fontFamily="Work Sans, sans-serif" fontWeight="700" fontSize="17" fill={textColor} letterSpacing="-0.5">lendsqr</text>
    </svg>
  );
}

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.left} aria-hidden="true">
        <div className={styles.logoWrap}>
          <LendsqrLogo />
        </div>
        <Image
          src="/auth-illustration.png"
          alt=""
          width={600}
          height={480}
          className={styles.illustration}
          priority
        />
      </div>

      <div className={styles.right}>
        <div className={styles.form}>
          <div className={styles.mobileLogo}>
            <LendsqrLogo dark />
          </div>
          <h1 className={styles.heading}>Welcome!</h1>
          <p className={styles.subheading}>Enter details to login.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

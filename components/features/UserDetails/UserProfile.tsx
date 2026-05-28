"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import type { User } from "@/types/user";
import styles from "./UserProfile.module.scss";

interface UserProfileProps {
  user: User;
}

const tabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;

type Tab = (typeof tabs)[number];

function StarRating({ tier }: { tier: 1 | 2 | 3 }) {
  return (
    <div className={styles.stars} aria-label={`Tier ${tier}`}>
      {Array.from({ length: 3 }, (_, i) => (
        <svg
          key={i}
          className={i < tier ? styles.star : styles.starEmpty}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>("General Details");
  const initials = user.profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar} aria-hidden="true">{initials}</div>
          <div className={styles.nameBlock}>
            <h2 className={styles.name}>{user.profile.fullName}</h2>
            <p className={styles.userId}>{user.id}</p>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.tierBlock}>
          <p className={styles.tierLabel}>User&apos;s Tier</p>
          <StarRating tier={user.tier} />
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.balanceBlock}>
          <p className={styles.balance}>{formatCurrency(user.accountBalance)}</p>
          <p className={styles.bankInfo}>
            {user.bank.accountNumber}/{user.bank.bankName}
          </p>
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="User details tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

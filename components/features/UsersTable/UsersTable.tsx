"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge/Badge";
import { FilterModal } from "@/components/features/FilterModal/FilterModal";
import type { User, UsersFilters } from "@/types/user";
import styles from "./UsersTable.module.scss";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onFilter: (filters: UsersFilters) => void;
  onResetFilters: () => void;
  onUserAction: (action: "view" | "blacklist" | "activate", userId: string) => void;
}

const columns = [
  { key: "organization", label: "Organization" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "dateJoined", label: "Date Joined" },
  { key: "status", label: "Status" },
] as const;

// Pre-computed widths to avoid hydration mismatch from Math.random()
const SKELETON_WIDTHS = [
  [72, 65, 80, 70, 75, 68],
  [60, 78, 65, 82, 70, 74],
  [85, 62, 72, 68, 80, 66],
  [70, 75, 60, 76, 65, 80],
  [78, 68, 85, 62, 72, 70],
  [65, 80, 70, 75, 60, 78],
  [82, 66, 74, 70, 85, 62],
  [68, 72, 78, 65, 80, 70],
  [75, 60, 76, 82, 66, 74],
];

function SkeletonRows() {
  return (
    <>
      {SKELETON_WIDTHS.map((widths, i) => (
        <tr key={i} className={styles.skeletonRow}>
          {columns.map((col, j) => (
            <td key={col.key}>
              <div className={styles.skeletonCell} style={{ width: `${widths[j]}%` }} />
            </td>
          ))}
          <td>
            <div className={styles.skeletonCell} style={{ width: 24, borderRadius: "50%" }} />
          </td>
        </tr>
      ))}
    </>
  );
}

function ActionMenu({ userId, onAction, onClose }: {
  userId: string;
  onAction: (action: "view" | "blacklist" | "activate", id: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.dropdown} role="menu">
      <Link
        href={`/users/${userId}`}
        className={styles.dropdownItem}
        role="menuitem"
        onClick={onClose}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        View Details
      </Link>
      <button
        className={styles.dropdownItem}
        role="menuitem"
        onClick={() => { onAction("blacklist", userId); onClose(); }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
        </svg>
        Blacklist User
      </button>
      <button
        className={styles.dropdownItem}
        role="menuitem"
        onClick={() => { onAction("activate", userId); onClose(); }}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Activate User
      </button>
    </div>
  );
}

export function UsersTable({ users, loading, onFilter, onResetFilters, onUserAction }: UsersTableProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table} aria-label="Users table">
          <thead className={styles.thead}>
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col">
                  <div
                    className={`${styles.thInner} ${col.key === "organization" ? styles.filterWrap : ""}`}
                    onClick={() => col.key === "organization" && setFilterOpen((v) => !v)}
                  >
                    {col.label}
                    <svg className={styles.filterIcon} viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" />
                    </svg>
                    {col.key === "organization" && filterOpen && (
                      <FilterModal
                        onApply={onFilter}
                        onReset={onResetFilters}
                        onClose={() => setFilterOpen(false)}
                      />
                    )}
                  </div>
                </th>
              ))}
              <th scope="col" aria-label="Actions" />
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {loading ? (
              <SkeletonRows />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No users match your filters. Try resetting the filter.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.dateJoined}</td>
                  <td>
                    <Badge status={user.status} />
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      className={styles.moreBtn}
                      aria-label={`Actions for ${user.username}`}
                      aria-expanded={activeMenu === user.id}
                      aria-haspopup="menu"
                      onClick={() => setActiveMenu((prev) => (prev === user.id ? null : user.id))}
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {activeMenu === user.id && (
                      <ActionMenu
                        userId={user.id}
                        onAction={onUserAction}
                        onClose={() => setActiveMenu(null)}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

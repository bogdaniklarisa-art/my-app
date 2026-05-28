"use client";

import { StatsCards } from "@/components/features/StatsCards/StatsCards";
import { UsersTable } from "@/components/features/UsersTable/UsersTable";
import { Pagination } from "@/components/features/Pagination/Pagination";
import { useUsers } from "@/hooks/useUsers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserStats, User } from "@/types/user";
import styles from "./page.module.scss";

interface UsersPageClientProps {
  stats: UserStats;
}

export function UsersPageClient({ stats }: UsersPageClientProps) {
  const {
    users,
    total,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    goToPage,
    applyFilters,
    resetFilters,
    changePageSize,
  } = useUsers({ pageSize: 10 });

  const { set: cacheUser } = useLocalStorage<User | null>("lendsqr_selected_user", null);

  function handleUserAction(action: "view" | "blacklist" | "activate", userId: string) {
    if (action === "view") {
      const user = users.find((u) => u.id === userId);
      if (user) cacheUser(user);
    }
  }

  if (error) {
    return (
      <div className={styles.errorState} role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Users</h1>
      <StatsCards stats={stats} />
      <UsersTable
        users={users}
        loading={loading}
        onFilter={applyFilters}
        onResetFilters={resetFilters}
        onUserAction={handleUserAction}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        total={total}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />
    </div>
  );
}

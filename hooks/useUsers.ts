"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchUsers } from "@/services/users";
import type { User, UsersFilters, PaginatedUsers } from "@/types/user";

interface UseUsersOptions {
  pageSize?: number;
}

export function useUsers({ pageSize = 10 }: UseUsersOptions = {}) {
  const [result, setResult] = useState<PaginatedUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<UsersFilters>({});
  const [activePageSize, setActivePageSize] = useState(pageSize);

  const load = useCallback(
    async (p: number, f: UsersFilters, size: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers(p, size, f);
        setResult(data);
      } catch {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    load(page, filters, activePageSize);
  }, [page, filters, activePageSize, load]);

  function applyFilters(f: UsersFilters) {
    setFilters(f);
    setPage(1);
  }

  function resetFilters() {
    setFilters({});
    setPage(1);
  }

  function goToPage(p: number) {
    setPage(p);
  }

  function changePageSize(size: number) {
    setActivePageSize(size);
    setPage(1);
  }

  const users: User[] = result?.data ?? [];
  const total = result?.total ?? 0;
  const totalPages = result?.totalPages ?? 1;

  return {
    users,
    total,
    loading,
    error,
    page,
    pageSize: activePageSize,
    totalPages,
    filters,
    goToPage,
    applyFilters,
    resetFilters,
    changePageSize,
    reload: () => load(page, filters, activePageSize),
  } as const;
}

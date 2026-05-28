"use client";

import { useState } from "react";

export function usePagination(totalPages: number, initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  function goTo(p: number) {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setPage(clamped);
  }

  function next() {
    if (page < totalPages) setPage((p) => p + 1);
  }

  function prev() {
    if (page > 1) setPage((p) => p - 1);
  }

  function getPageRange(): (number | "...")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);

    return pages;
  }

  return { page, goTo, next, prev, getPageRange } as const;
}

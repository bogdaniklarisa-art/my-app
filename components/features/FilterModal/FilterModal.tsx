"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/Input/Input";
import { Select } from "@/components/ui/Select/Select";
import { getOrganizations } from "@/services/users";
import type { UsersFilters } from "@/types/user";
import styles from "./FilterModal.module.scss";

interface FilterModalProps {
  onApply: (filters: UsersFilters) => void;
  onReset: () => void;
  onClose: () => void;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "blacklisted", label: "Blacklisted" },
];

export function FilterModal({ onApply, onReset, onClose }: FilterModalProps) {
  const [form, setForm] = useState<UsersFilters>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const organizations = getOrganizations();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function update(key: keyof UsersFilters, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleApply() {
    const cleaned = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== "" && v !== undefined)
    ) as UsersFilters;
    onApply(cleaned);
    onClose();
  }

  function handleReset() {
    setForm({});
    onReset();
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Filter users">
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.fields}>
          <Select
            label="Organization"
            options={organizations.map((o) => ({ value: o, label: o }))}
            placeholder="Select"
            value={form.organization ?? ""}
            onChange={(e) => update("organization", e.target.value)}
          />
          <Input
            label="Username"
            placeholder="User"
            value={form.username ?? ""}
            onChange={(e) => update("username", e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={form.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
          />
          <Input
            label="Date"
            type="date"
            value={form.date ?? ""}
            onChange={(e) => update("date", e.target.value)}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Phone Number"
            value={form.phoneNumber ?? ""}
            onChange={(e) => update("phoneNumber", e.target.value)}
          />
          <Select
            label="Status"
            options={statusOptions}
            placeholder="Select"
            value={form.status ?? ""}
            onChange={(e) => update("status", e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.filterBtn} onClick={handleApply}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}

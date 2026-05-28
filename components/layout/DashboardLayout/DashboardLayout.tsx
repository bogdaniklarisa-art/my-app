"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Navbar onMenuToggle={() => setSidebarOpen((v) => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}

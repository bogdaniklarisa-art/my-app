import { fetchUserStats } from "@/services/users";
import { UsersPageClient } from "./UsersPageClient";

export const metadata = {
  title: "Users — Lendsqr",
};

export default async function UsersPage() {
  const stats = await fetchUserStats();
  return <UsersPageClient stats={stats} />;
}

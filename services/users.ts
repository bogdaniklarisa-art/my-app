import { mockUsers, mockStats } from "@/data/mockUsers";
import type { User, UsersFilters, PaginatedUsers, UserStats } from "@/types/user";

const SIMULATED_DELAY = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyFilters(users: User[], filters: UsersFilters): User[] {
  return users.filter((user) => {
    if (filters.organization && !user.organization.toLowerCase().includes(filters.organization.toLowerCase())) return false;
    if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) return false;
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      const userDate = new Date(user.dateJoined).toDateString();
      if (filterDate !== userDate) return false;
    }
    return true;
  });
}

export async function fetchUsers(
  page: number = 1,
  pageSize: number = 10,
  filters: UsersFilters = {}
): Promise<PaginatedUsers> {
  await sleep(SIMULATED_DELAY);

  const filtered = applyFilters(mockUsers, filters);
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return { data, total, page, pageSize, totalPages };
}

export async function fetchUserById(id: string): Promise<User | null> {
  await sleep(SIMULATED_DELAY);
  return mockUsers.find((u) => u.id === id) ?? null;
}

export async function fetchUserStats(): Promise<UserStats> {
  await sleep(200);
  return mockStats;
}

export function getOrganizations(): string[] {
  return [...new Set(mockUsers.map((u) => u.organization))].sort();
}

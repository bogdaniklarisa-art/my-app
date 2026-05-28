import { fetchUsers, fetchUserById, getOrganizations } from "@/services/users";

describe("fetchUsers", () => {
  it("returns paginated results", async () => {
    const result = await fetchUsers(1, 10);
    expect(result.data).toHaveLength(10);
    expect(result.total).toBeGreaterThan(0);
    expect(result.totalPages).toBeGreaterThan(0);
    expect(result.page).toBe(1);
  });

  it("respects pageSize", async () => {
    const result = await fetchUsers(1, 20);
    expect(result.data).toHaveLength(20);
    expect(result.pageSize).toBe(20);
  });

  it("returns correct page slice", async () => {
    const page1 = await fetchUsers(1, 5);
    const page2 = await fetchUsers(2, 5);
    expect(page1.data[0].id).not.toBe(page2.data[0].id);
  });

  it("filters by status", async () => {
    const result = await fetchUsers(1, 100, { status: "active" });
    expect(result.data.every((u) => u.status === "active")).toBe(true);
  });

  it("filters by organization (case-insensitive)", async () => {
    const result = await fetchUsers(1, 100, { organization: "lendsqr" });
    result.data.forEach((u) => {
      expect(u.organization.toLowerCase()).toContain("lendsqr");
    });
  });

  it("returns empty data for impossible filter", async () => {
    const result = await fetchUsers(1, 10, { username: "zzzzz_impossible_xyz_000" });
    expect(result.data).toHaveLength(0);
    expect(result.total).toBe(0);
  });
});

describe("fetchUserById", () => {
  it("returns a user for a valid id", async () => {
    const user = await fetchUserById("usr_0001");
    expect(user).not.toBeNull();
    expect(user?.id).toBe("usr_0001");
  });

  it("returns null for a non-existent id", async () => {
    const user = await fetchUserById("usr_9999");
    expect(user).toBeNull();
  });
});

describe("getOrganizations", () => {
  it("returns a non-empty sorted list", () => {
    const orgs = getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);
    expect(orgs).toEqual([...orgs].sort());
  });

  it("returns unique values only", () => {
    const orgs = getOrganizations();
    expect(new Set(orgs).size).toBe(orgs.length);
  });
});

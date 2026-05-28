import type { User, UserStatus } from "@/types/user";

// Seeded PRNG (Mulberry32) — produces identical output on server and client
function makePrng(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = makePrng(0xdeadbeef);

const organizations = [
  "Lendsqr", "Lendstar", "Irorun", "Moniepoint", "PalmPay",
  "Kuda Bank", "Carbon", "Fairmoney", "Branch", "QuickCheck",
];

const firstNames = [
  "Adebayo", "Ngozi", "Chukwuemeka", "Fatima", "Oluwaseun",
  "Amara", "Tunde", "Grace", "Emeka", "Blessing",
  "Adeola", "Chisom", "Rotimi", "Halima", "Seun",
  "Taiwo", "Nkechi", "Babajide", "Amaka", "Toyin",
  "Ifeanyi", "Yetunde", "Damilola", "Chidinma", "Olumide",
  "Aisha", "Kenechukwu", "Folake", "Obinna", "Sade",
  "Abdullahi", "Ifeoma", "Gbenga", "Nneka", "Lanre",
  "Chiamaka", "Biodun", "Uchechi", "Femi", "Adaugo",
];

const lastNames = [
  "Adeyemi", "Okonkwo", "Ibrahim", "Balogun", "Eze",
  "Abubakar", "Okafor", "Nwosu", "Adeleke", "Chukwu",
  "Musa", "Osei", "Daniels", "Effiom", "Dokunmu",
  "Ogbonna", "Salami", "Obi", "Bankole", "Nwachukwu",
  "Yakubu", "Ighalo", "Owusu", "Lawal", "Dike",
  "Makinde", "Udoh", "Oduya", "Nzinga", "Onyeka",
];

const banks = [
  "Providus Bank", "GTBank", "First Bank", "Zenith Bank",
  "Access Bank", "UBA", "Fidelity Bank", "Sterling Bank",
  "Polaris Bank", "Wema Bank",
];

const genders = ["Male", "Female"] as const;
const maritalStatuses = ["Single", "Married", "Divorced"] as const;
const childrenOptions = ["None", "1", "2", "3", "4+"] as const;
const residenceTypes = [
  "Parent's Apartment", "Rented Apartment", "Own House", "Company Quarters",
];
const educationLevels = ["B.Sc", "M.Sc", "HND", "OND", "SSCE", "Ph.D"];
const employmentStatuses = ["Employed", "Self-Employed", "Unemployed", "Student"];
const sectors = ["FinTech", "Banking", "Telecoms", "Education", "Healthcare", "Retail", "Government", "NGO"];
const durations = ["1 year", "2 years", "3 years", "5 years", "Less than 1 year"];
const statuses: UserStatus[] = ["active", "inactive", "pending", "blacklisted"];
const statusWeights = [0.45, 0.25, 0.2, 0.1];

function weightedRandom(weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = rng() * total;
  for (let i = 0; i < weights.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return i;
  }
  return weights.length - 1;
}

function pick<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randomPhone(): string {
  const prefixes = ["0701", "0703", "0706", "0708", "0802", "0803", "0806", "0808", "0810", "0813"];
  return `${pick(prefixes)}${String(Math.floor(rng() * 9000000) + 1000000)}`;
}

function randomBvn(): string {
  return String(Math.floor(rng() * 90000000000) + 10000000000);
}

function randomAccountNumber(): string {
  return String(Math.floor(rng() * 9000000000) + 1000000000);
}

const dateRange = { start: new Date("2019-01-01").getTime(), end: new Date("2024-01-01").getTime() };

function randomDate(): string {
  const ts = dateRange.start + rng() * (dateRange.end - dateRange.start);
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function randomIncome(): string {
  const min = Math.floor(rng() * 8 + 1) * 50000;
  const max = min + Math.floor(rng() * 5 + 1) * 100000;
  return `₦${min.toLocaleString()}- ₦${max.toLocaleString()}`;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "_");
}

function generateUser(index: number): User {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const org = pick(organizations);
  const username = `${slugify(firstName)}_${index}`;
  const email = `${slugify(firstName)}.${slugify(lastName)}${index}@${slugify(org)}.com`;
  const statusIndex = weightedRandom(statusWeights);
  const status = statuses[statusIndex];
  const gender = pick(genders);
  const bank = pick(banks);
  const loanRepayment = String(Math.floor(rng() * 80000) + 10000);
  const tier = pick([1, 2, 3] as const);

  const guarantorFirst1 = pick(firstNames);
  const guarantorLast1 = pick(lastNames);
  const guarantorFirst2 = pick(firstNames);
  const guarantorLast2 = pick(lastNames);

  return {
    id: `usr_${String(index).padStart(4, "0")}`,
    organization: org,
    username,
    email,
    phoneNumber: randomPhone(),
    dateJoined: randomDate(),
    status,
    tier,
    accountBalance: Math.floor(rng() * 900000) + 10000,
    profile: {
      fullName,
      bvn: randomBvn(),
      gender,
      maritalStatus: pick(maritalStatuses),
      children: pick(childrenOptions),
      typeOfResidence: pick(residenceTypes),
    },
    education: {
      levelOfEducation: pick(educationLevels),
      employmentStatus: pick(employmentStatuses),
      sectorOfEmployment: pick(sectors),
      durationOfEmployment: pick(durations),
      officeEmail: `${slugify(firstName)}@${slugify(org)}.com`,
      monthlyIncome: randomIncome(),
      loanRepayment,
    },
    socials: {
      twitter: rng() > 0.3 ? `@${username}` : undefined,
      facebook: rng() > 0.4 ? fullName : undefined,
      instagram: rng() > 0.3 ? `@${username}` : undefined,
    },
    guarantors: [
      {
        fullName: `${guarantorFirst1} ${guarantorLast1}`,
        phoneNumber: randomPhone(),
        email: `${slugify(guarantorFirst1)}.${slugify(guarantorLast1)}@gmail.com`,
        relationship: pick(["Sister", "Brother", "Parent", "Friend", "Spouse"]),
      },
      {
        fullName: `${guarantorFirst2} ${guarantorLast2}`,
        phoneNumber: randomPhone(),
        email: `${slugify(guarantorFirst2)}.${slugify(guarantorLast2)}@gmail.com`,
        relationship: pick(["Sister", "Brother", "Parent", "Friend", "Spouse"]),
      },
    ],
    bank: {
      accountNumber: randomAccountNumber(),
      bankName: bank,
    },
  };
}

export const mockUsers: User[] = Array.from({ length: 500 }, (_, i) => generateUser(i + 1));

export const mockStats = {
  totalUsers: 2453,
  activeUsers: 2453,
  usersWithLoans: 12453,
  usersWithSavings: 102453,
};

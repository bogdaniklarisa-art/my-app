export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  profile: UserProfile;
  education: UserEducation;
  socials: UserSocials;
  guarantors: Guarantor[];
  bank: BankDetails;
  tier: 1 | 2 | 3;
  accountBalance: number;
}

export interface UserProfile {
  fullName: string;
  avatar?: string;
  bvn: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married" | "Divorced";
  children: string;
  typeOfResidence: string;
}

export interface UserEducation {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface UserSocials {
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface BankDetails {
  accountNumber: string;
  bankName: string;
}

export interface UsersFilters {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: UserStatus | "";
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export type UserProfile = {
  name: string;
  company: string;
  age: number;
};

export type UserRole = "admin" | "owner" | "member" | "guest";

export type User = {
  id: string;
  email: string;
  username: string;
  profile: UserProfile;
  roles: UserRole[];
};

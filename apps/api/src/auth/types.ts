export interface IdentityUser {
  id: string;
  email: string;
  createdAt: Date;
}

export interface AuthSession {
  user: IdentityUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type IdentityKind = "supabase" | "memory";

export interface IdentityProvider {
  readonly kind: IdentityKind;
  register(email: string, password: string): Promise<AuthSession>;
  login(email: string, password: string): Promise<AuthSession>;
  getUser(accessToken: string): Promise<IdentityUser | null>;
  refresh(refreshToken: string): Promise<AuthSession | null>;
  revoke(accessToken: string): Promise<void>;
  deleteAccount(userId: string): Promise<void>;
}

import type { BirthDetails, Profile } from "@astronex/shared";
import { and, desc, eq } from "drizzle-orm";
import type { Db } from "../db/client";
import { profiles } from "../db/schema";
import type { FieldCipher } from "../lib/crypto";
import { notFound } from "../lib/errors";

type ProfileRow = typeof profiles.$inferSelect;

export interface LoadedProfile {
  profile: Profile;
  birth: BirthDetails;
}

export class ProfileService {
  constructor(
    private readonly db: Db,
    private readonly cipher: FieldCipher,
  ) {}

  private hydrate(row: ProfileRow): LoadedProfile {
    const birth = this.cipher.decryptJson<BirthDetails>(row.birthEncrypted);
    return {
      birth,
      profile: {
        id: row.id,
        relation: row.relation,
        name: birth.name,
        birthDate: birth.date,
        birthTime: birth.timeUnknown ? null : (birth.time ?? null),
        placeName: birth.place.name,
        createdAt: row.createdAt.toISOString(),
      },
    };
  }

  async list(userId: string): Promise<Profile[]> {
    const rows = await this.db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .orderBy(desc(profiles.createdAt));
    return rows.map((r) => this.hydrate(r).profile);
  }

  async count(userId: string): Promise<number> {
    return this.db.$count(profiles, eq(profiles.userId, userId));
  }

  async get(userId: string, id: string): Promise<LoadedProfile> {
    const [row] = await this.db
      .select()
      .from(profiles)
      .where(and(eq(profiles.id, id), eq(profiles.userId, userId)))
      .limit(1);
    if (!row) throw notFound("Profile");
    return this.hydrate(row);
  }

  async create(userId: string, relation: Profile["relation"], birth: BirthDetails): Promise<Profile> {
    const [row] = await this.db
      .insert(profiles)
      .values({ userId, relation, birthEncrypted: this.cipher.encryptJson(birth) })
      .returning();
    return this.hydrate(row!).profile;
  }

  async remove(userId: string, id: string): Promise<void> {
    const deleted = await this.db
      .delete(profiles)
      .where(and(eq(profiles.id, id), eq(profiles.userId, userId)))
      .returning({ id: profiles.id });
    if (deleted.length === 0) throw notFound("Profile");
  }
}

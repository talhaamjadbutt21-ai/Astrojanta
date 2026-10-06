import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export function newSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

const VERSION = "v1";

/** AES-256-GCM authenticated encryption for small PII payloads stored in the database. */
export class FieldCipher {
  private readonly key: Buffer;

  constructor(base64Key: string | undefined, allowDevKey: boolean) {
    if (base64Key) {
      this.key = Buffer.from(base64Key, "base64");
    } else if (allowDevKey) {
      this.key = createHash("sha256").update("sebt-ai-insecure-development-key").digest();
    } else {
      throw new Error("DATA_ENCRYPTION_KEY is required");
    }
    if (this.key.length !== 32) throw new Error("DATA_ENCRYPTION_KEY must decode to 32 bytes");
  }

  encrypt(plaintext: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", this.key, iv);
    const data = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    return [
      VERSION,
      iv.toString("base64url"),
      cipher.getAuthTag().toString("base64url"),
      data.toString("base64url"),
    ].join(":");
  }

  decrypt(payload: string): string {
    const [version, iv, tag, data] = payload.split(":");
    if (version !== VERSION || !iv || !tag || !data) throw new Error("Unsupported ciphertext format");
    const decipher = createDecipheriv("aes-256-gcm", this.key, Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([decipher.update(Buffer.from(data, "base64url")), decipher.final()]).toString("utf8");
  }

  encryptJson(value: unknown): string {
    return this.encrypt(JSON.stringify(value));
  }

  decryptJson<T>(payload: string): T {
    return JSON.parse(this.decrypt(payload)) as T;
  }
}

import crypto from "node:crypto";
import { AuthTokenPayload, AuthUser } from "../domain/types/auth.types";

const AUTH_SECRET = process.env.AUTH_TOKEN_SECRET ?? "impulsa-tecnica-auth";
const EIGHT_HOURS_IN_SECONDS = 60 * 60 * 8;

const encodeSegment = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const decodeSegment = <T,>(value: string): T =>
  JSON.parse(Buffer.from(value, "base64url").toString("utf-8")) as T;

const sign = (value: string) =>
  crypto.createHmac("sha256", AUTH_SECRET).update(value).digest("base64url");

export const createAuthToken = (user: AuthUser) => {
  const header = encodeSegment({ alg: "HS256", typ: "SIM" });
  const payload = encodeSegment({
    ...user,
    exp: Math.floor(Date.now() / 1000) + EIGHT_HOURS_IN_SECONDS,
  });

  const signature = sign(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
};

export const verifyAuthToken = (token: string): AuthTokenPayload | null => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    return null;
  }

  const expectedSignature = sign(`${header}.${payload}`);

  if (
    expectedSignature.length !== signature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    )
  ) {
    return null;
  }

  const decodedPayload = decodeSegment<AuthTokenPayload>(payload);

  if (decodedPayload.exp <= Math.floor(Date.now() / 1000)) {
    return null;
  }

  return decodedPayload;
};

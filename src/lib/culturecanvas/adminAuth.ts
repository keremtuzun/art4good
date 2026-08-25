import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "culturecanvas_admin";

export function adminToken(secret: string) {
  return createHash("sha256").update(`culturecanvas:v1:${secret}`).digest("hex");
}

export function isAdminTokenValid(candidate: string | undefined, secret: string) {
  if (!candidate) return false;
  const expected = adminToken(secret);
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

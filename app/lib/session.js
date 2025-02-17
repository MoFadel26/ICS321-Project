//Create by Omar Aljohani
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

//const secretKey = process.env.SESSION_SECRET;
const secretKey = "NSImZyLYefvbJgrjXE3Sn9Uk7TnbHpk4jNJ76/55uCk=";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(user) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  user.expiresAt = expiresAt;
  console.log(user);
  const session = await encrypt(user);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  return payload;
}

export async function updateSession() {
  const payload = await getSession();

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)(
    await cookies()
  ).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function isLoggedIn() {
  const session = (await cookies()).get("session")?.value;
  return session == undefined ? false : true;
}

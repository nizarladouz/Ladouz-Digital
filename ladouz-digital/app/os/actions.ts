"use server";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION } from "./session";

const HASH = process.env.LD_OS_CODE_HASH ?? "688070aadfd9f656dd18e103423c997179c2f4b7c3d3f19a674212ad74c402bb";

export async function anmelden(form: FormData) {
  const code = String(form.get("code") ?? "").trim().toUpperCase();
  if (createHash("sha256").update(code).digest("hex") !== HASH) redirect("/os?fehler=1");
  (await cookies()).set("ld_os", SESSION, { httpOnly: true, secure: true, sameSite: "lax", path: "/os", maxAge: 60 * 60 * 24 * 30 });
  redirect("/os");
}

export async function abmelden() {
  (await cookies()).delete({ name: "ld_os", path: "/os" });
  redirect("/os");
}

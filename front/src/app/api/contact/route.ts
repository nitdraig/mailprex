import { NextRequest, NextResponse } from "next/server";

const CONTACT_FIELDS = [
  "fullname",
  "email",
  "message",
  "phone",
  "service",
  "captchaToken",
] as const;

function resolveSendUrl(): string {
  const explicit = process.env.MAILPREX_API_SEND_URL?.trim();
  if (explicit) {
    return explicit;
  }

  const apiUrl = (process.env.API_URL || "http://localhost:5000").trim();
  return `${apiUrl.replace(/\/$/, "")}/email/send`;
}

export async function POST(request: NextRequest) {
  const formToken = process.env.MAILPREX_FORM_TOKEN?.trim();
  const emailDestiny = process.env.MAILPREX_EMAIL_DESTINY?.trim();

  if (!formToken || !emailDestiny) {
    return NextResponse.json(
      { message: "Contact form is not configured on the server" },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const payload: Record<string, string> = {
    formToken,
    emailDestiny,
    webName: process.env.MAILPREX_WEB_NAME?.trim() || "Mailprex Landing",
  };

  for (const field of CONTACT_FIELDS) {
    const value = body[field];
    if (typeof value === "string" && value.trim().length > 0) {
      payload[field] = value.trim();
    }
  }

  if (!payload.fullname || !payload.email || !payload.message) {
    return NextResponse.json(
      { message: "fullname, email, and message are required" },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(resolveSendUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: unknown = null;
    try {
      data = await upstream.json();
    } catch {
      data = null;
    }

    if (!upstream.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
          ? (data as { message: string }).message
          : "Failed to send message";

      return NextResponse.json({ message }, { status: upstream.status });
    }

    return NextResponse.json(data ?? { message: "Form sent successfully" });
  } catch (error) {
    console.error("Contact proxy failed:", error);
    return NextResponse.json(
      { message: "Failed to reach Mailprex API" },
      { status: 502 }
    );
  }
}

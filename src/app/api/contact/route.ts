import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // No provider configured yet: log instead of failing, so the form works out of the box.
  // Set RESEND_API_KEY to start actually delivering these to siteConfig.email.
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY not set — logging submission instead of sending email.", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [siteConfig.email],
      reply_to: email,
      subject: `New message from ${name}`,
      text: message,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import notificationService from "@/api/notification/notificationService";
import type { ContactPayload } from "@/api/notification/INotificationService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactPayload;
    const { name, phone, message } = body;

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await notificationService.sendContactNotification(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send notification." }, { status: 500 });
  }
}

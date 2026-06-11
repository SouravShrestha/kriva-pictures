import type { INotificationService, ContactPayload } from "./INotificationService";
import { env } from "@/lib/env";

const TELEGRAM_API = `https://api.telegram.org/bot${env.telegramBotToken}/sendMessage`;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const notificationService: INotificationService = {
  async sendContactNotification(payload: ContactPayload): Promise<void> {
    const { name, email, phone, message } = payload;

    const text = [
      `✨ <b>New Enquiry - Kriva Pictures</b>`,
      ``,
      `👉 <b>Name:</b> ${escapeHtml(name)}`,
      `📞 <b>Phone:</b> ${escapeHtml(phone)}`,
      `📧 <b>Email:</b> ${email ? escapeHtml(email) : "Not provided"}`,
      ``,
      `💭 <b>Message:</b>`,
      escapeHtml(message),
    ].join("\n");

    const chatIds = env.telegramChatId
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    await Promise.all(
      chatIds.map(async (chatId) => {
        const response = await fetch(TELEGRAM_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        });

        if (!response.ok) {
          const error = await response.text();
          console.error(`Telegram API error for chat_id ${chatId}:`, error);
          throw new Error(`Telegram API error: ${error}`);
        }
      })
    );
  },
};

export default notificationService;


import type { INotificationService, ContactPayload } from "./interfaces/INotificationService";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

const notificationService: INotificationService = {
  async sendContactNotification(payload: ContactPayload): Promise<void> {
    const { name, email, phone, message } = payload;

    const text = [
      `✨ <b>New Enquiry - Kriva Pictures</b>`,
      ``,
      `👉 <b>Name:</b> ${name}`,
      `📞 <b>Phone:</b> ${phone}`,
      `📧 <b>Email:</b> ${email || "Not provided"}`,
      ``,
      `💭 <b>Message:</b>`,
      message,
    ].join("\n");

    const chatIds = (process.env.TELEGRAM_CHAT_ID ?? "")
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

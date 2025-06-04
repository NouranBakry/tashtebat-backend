// src/subscribers/handle-reset.ts
import { SubscriberArgs } from "@medusajs/medusa";
import { MedusaContainer } from "@medusajs/types";

type ResetPasswordEvent = {
  entity_id: string;
  token: string;
  actor_type: string;
};

const handler = async ({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<ResetPasswordEvent>) => {
  const notificationService = container.resolve("notificationService") as any;

  const urlPrefix =
    actor_type === "customer"
      ? "https://storefront.com"
      : "https://admin.com/app";

  console.log("📩 Sending reset password notification...", { email, token });

  await notificationService.createNotifications({
    to: email,
    channel: "email",
    template: "reset-password-template",
    data: {
      url: `${urlPrefix}/reset-password?token=${token}&email=${email}`,
    },
  });
};

// 👇 Attach config exactly like this
handler.config = {
  event: "auth.password_reset",
};

// 👇 VERY IMPORTANT: this MUST be a default export of the function directly
export default handler
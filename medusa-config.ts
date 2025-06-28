import { loadEnv, defineConfig } from "@medusajs/framework/utils";
import path from "path";
import resetPasswordTokenHandler from "./src/subscribers/handle-reset";

loadEnv(process.env.NODE_ENV || "development", process.cwd());
console.log(process.env.DATABASE_URL);
console.log("subscriber here: ", resetPasswordTokenHandler);
console.log(
  "🔧 Registering vendor module from:",
  path.join(__dirname, "src/modules/vendor")
);

import fs from "fs";

const vendorPath = path.join(__dirname, "src/modules/vendor");
console.log("🧪 Checking vendor path:", vendorPath);
console.log("📂 Exists?", fs.existsSync(vendorPath));
console.log(
  "📄 Has index.ts?",
  fs.existsSync(path.join(vendorPath, "index.ts"))
);
export default defineConfig({
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
    },
    redisUrl: process.env.REDIS_URL,
    redisPrefix: process.env.REDIS_URL || "medusa:",
    databaseDriverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  },
  modules: [
    {
      resolve: "./src/modules/vendor",
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
  ],
});

import "./src/loaders/reflect-metadata"
import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import path from "path";
import resetPasswordTokenHandler  from "./src/subscribers/handle-reset"

import * as dotenv from "dotenv"


dotenv.config()


loadEnv(process.env.NODE_ENV || 'development', process.cwd())
console.log(process.env.DATABASE_URL)
console.log("subscriber here: ", resetPasswordTokenHandler)
export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    entities: [  
      "src/modules/vendor/*.ts",
      "dist/modules/vendor/*.js",
      "node_modules/@medusajs/medusa/dist/models/*.js"
    ],
    synchronize: false,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    vendor : {
      resolve: path.resolve(__dirname, "src/modules/vendor"),
    },
  },
  eventBus: {
    resolve: "@medusajs/event-bus-local",
    options: {
      subscribers: [resetPasswordTokenHandler],
    },
  },
})


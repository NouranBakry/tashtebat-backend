import {
    LoaderOptions,
  } from "@medusajs/framework/types"
  
  export default async function helloWorldLoader({
    container,
  }: LoaderOptions) {
    const logger = container.resolve("logger")
  
    logger.info("[HELLO VENDOR] Just started the Medusa application!")
  }
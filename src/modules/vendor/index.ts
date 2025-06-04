// src/modules/vendor/index.ts
import VendorService from "./service"
import { Vendor } from "./model"

console.log("🚀 Vendor entity registered:", Vendor)
import { getMetadataArgsStorage } from "typeorm"
console.log("🧱 Loaded entities:", getMetadataArgsStorage().tables.map(t => {
    return typeof t.target === "function" ? t.target.name : t.target
  }))
export const entities = [Vendor]

const moduleDefinition = {
  id: "vendor",
  key: "vendor",
  registrationName: "vendorService",
  service: VendorService,
  entities: [Vendor],
  models: [Vendor],
}

export default moduleDefinition
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import VendorService from "../../../modules/vendor/service"

console.log("🚀 vendor route file loaded")

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    try {
      const vendorService = req.scope.resolve("vendorService") as VendorService
      const vendors = await vendorService.list()
      console.log(vendors)
      res.json(vendors)
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors", error })
    }
  }
  
  export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
      const vendorService = req.scope.resolve("vendorService") as VendorService
      const body = req.body as { name?: string }
  
      if (!body || typeof body.name !== "string") {
        console.error("Invalid request body:", body)
        return res.status(400).json({ message: "Invalid input: 'name' is required" })
      }
  
      const newVendor = await vendorService.create({ name: body.name })
      console.log("✅ Created vendor:", newVendor)
      res.status(201).json(newVendor)
  
    } catch (error: any) {
      console.error("❌ Failed to create vendor:", error)
      res.status(500).json({ message: "Failed to create vendor", error: error.message || error })
    }
  }
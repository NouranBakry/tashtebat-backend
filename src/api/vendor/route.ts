import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import VendorService from "../../modules/vendor/service";

console.log("🚀 vendor route file loaded");

export async function GET(req: MedusaRequest, res: MedusaResponse) {
   try {
     const vendorService: VendorService = req.scope.resolve("VendorService");
     const vendors = await vendorService.listVendors();
     res.json({ vendors });
   } catch (error) {
     // Log the error for debugging
     console.error("Error retrieving vendors:", error);
     res
       .status(500)
       .json({ message: "An unknown error occurred.", code: "unknown_error" });
   }
}

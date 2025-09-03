import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import VendorService from "../../modules/vendor/service";

console.log("🚀 vendor route file loaded");

// import { z } from "zod";

// export const createVendorSchema = z.object({
//   name: z.string().min(1, "Name is required"),
// });

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const vendorService: VendorService = req.scope.resolve("VendorService");
  const vendors = await vendorService.listVendors();

  res.json({
    vendors,
  });
}

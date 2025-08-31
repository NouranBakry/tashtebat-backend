import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import VendorService from "../../modules/vendor/service";

console.log("🚀 vendor route file loaded");

import { z } from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Validate the entire body and get the validated object
    const validatedBody = createVendorSchema.parse(req.body);

    const vendorService: VendorService = req.scope.resolve("VendorService");

    // Pass the entire validated object to the service method
    const vendor = await vendorService.createVendors(validatedBody);

    res.status(201).json({ vendor });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    } else {
      res.status(500).json({ message: "Failed to create vendor." });
    }
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const vendorService: VendorService = req.scope.resolve("VendorService");
  const vendors = await vendorService.listVendors();

  res.json({
    vendors,
  });
}

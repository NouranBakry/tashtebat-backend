import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import VendorService from "../../modules/vendor/service";
import { createVendorWorkflow } from "../../workflows/create-vendor";

console.log("🚀 vendor route file loaded");

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: vendor } = await createVendorWorkflow(req.scope).run({
    input: {
      name: "New Vendor",
    },
  });

  res.json({
    vendor,
  });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const vendorService: VendorService = req.scope.resolve("vendorService");
  const vendors = await vendorService.listVendors();

  res.json({
    vendors,
  });
}

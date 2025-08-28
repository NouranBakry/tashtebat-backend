import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import VendorService from "../../modules/vendor/service";
import { createVendorWorkflow } from "../../workflows/create-vendor";

console.log("🚀 vendor route file loaded");

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const name  = req.body;

  // Validate that a name was provided
  if (!name) {
    res.status(400).json({ message: "Name is required in the request body." });
    return;
  }
  
  try {
    const vendorService: VendorService = req.scope.resolve("VendorService");
    
    // Call the service's create method, passing the name from the request
    const vendor = await vendorService.createVendors(name);
  
    res.status(201).json({
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create vendor." });
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const vendorService: VendorService = req.scope.resolve("VendorService");
  const vendors = await vendorService.listVendors();

  res.json({
    vendors,
  });
}

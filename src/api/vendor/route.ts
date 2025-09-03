import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import getVendorListWorkflow from "../../workflows/list-vendors";
console.log("🚀 vendor route file loaded");

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const result = await getVendorListWorkflow(req.scope).run();
  res.send(result);
}

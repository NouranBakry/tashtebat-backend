import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { VENDOR_MODULE } from "../modules/vendor";

const getVendorListStep = createStep(
  "get-vendor-list",
  async (_, { container }) => {
    const vendorService = container.resolve(VENDOR_MODULE);

    const [vendors] = await vendorService.listVendors();

    return new StepResponse([vendors]);
  }
);

const vendorListWorkflow = createWorkflow("vendor-list", function () {
  const vendors = getVendorListStep();

  return new WorkflowResponse({
    vendors,
  });
});

export default vendorListWorkflow;

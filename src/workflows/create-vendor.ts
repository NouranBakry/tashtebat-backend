import { 
    createStep, 
    createWorkflow, 
    StepResponse, 
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
  import { VENDOR_MODULE } from "../modules/vendor"
  import VendorService from '../modules/vendor/service';

  type CreateVendorWorkflowInput = {
    name: string
  }
  
  const createVendorStep = createStep(
    "create-vendor",
    async ({ name }: CreateVendorWorkflowInput, { container }) => {
      const vendorService: VendorService = container.resolve(VENDOR_MODULE)
  
      const vendor = await vendorService.createVendors({
        name,
      })
  
      return new StepResponse(vendor, vendor)
    },
    async (vendor, { container }) => {
      const VendorService: VendorService = container.resolve(VENDOR_MODULE)
  
      if (vendor) {
        await VendorService.deleteVendors(vendor.id)
      }
    }
  )
  
  export const createVendorWorkflow = createWorkflow(
    "create-vendor",
    (vendorInput: CreateVendorWorkflowInput) => {
      const vendor = createVendorStep(vendorInput)
  
      return new WorkflowResponse(vendor)
    }
  )

 
import { EntityManager } from "typeorm"
import { Vendor } from "./model"

console.log(" Service file is loaded ")
export default class VendorService {
  private manager: EntityManager

  constructor({ manager }: { manager: EntityManager }) {
    this.manager = manager
  }

  async create(data: { name: string }) {
    const vendor = this.manager.create(Vendor, data)
    console.log(vendor)
    return this.manager.save(vendor)
  }

  async list() {
    console.log(Vendor)
    return this.manager.find(Vendor)
  }

  async delete(id: string) {
    return this.manager.delete(Vendor, id)
  }
}
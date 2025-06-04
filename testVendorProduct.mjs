import "reflect-metadata"
import { DataSource } from "typeorm"
import { Vendor } from "./dist/modules/vendor/model.js"
import { Product } from "./dist/modules/vendor/product.js"

async function runTest() {
  const dataSource = new DataSource({
    type: "postgres",
    url: "postgres://postgres:postgres@localhost:5432/medusa-tashtebat-backend",
    entities: [Vendor, Product],
    synchronize: true,
  })

  await dataSource.initialize()
  console.log("Database connected!")

  // Create a Vendor
  const vendorRepo = dataSource.getRepository(Vendor)
  const productRepo = dataSource.getRepository(Product)

  const vendor = vendorRepo.create({
    id: "vendor1",
    name: "Vendor 1"
  })

  await vendorRepo.save(vendor)
  console.log("Vendor saved:", vendor)

  // Create a Product linked to that Vendor
  const product = productRepo.create({
    id: "product1",
    name: "Product 1",
    vendor: vendor // Link to vendor
  })

  await productRepo.save(product)
  console.log("Product saved:", product)

  // Query back the Vendor with its products
  const vendorWithProducts = await vendorRepo.findOne({
    where: { id: "vendor1" },
    relations: ["products"],
  })

  console.log("Vendor with products:", vendorWithProducts)

  await dataSource.destroy()
  console.log("Connection closed.")
}

runTest().catch(console.error)
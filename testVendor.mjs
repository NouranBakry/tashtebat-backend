import "reflect-metadata"
import { DataSource, EntitySchema } from "typeorm"

// Define Vendor entity schema without decorators
const VendorSchema = new EntitySchema({
  name: "Vendor",
  tableName: "vendor",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    }
  },
})

// Setup DataSource with the schema
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "medusa-tashtebat-backend",
  synchronize: true,
  logging: false,
  entities: [VendorSchema],
})

async function runTest() {
  try {
    await AppDataSource.initialize()
    console.log("Database connected!")

    const vendorRepo = AppDataSource.getRepository("Vendor")
    const newVendor = vendorRepo.create({ name: "Test Vendor" })
    await vendorRepo.save(newVendor)
    console.log("Vendor saved:", newVendor)

    const allVendors = await vendorRepo.find()
    console.log("All vendors:", allVendors)

    await AppDataSource.destroy()
    console.log("Connection closed.")
  } catch (err) {
    console.error("Error:", err)
  }
}

runTest()
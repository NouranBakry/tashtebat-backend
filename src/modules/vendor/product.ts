import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
// Notice we only import the type here to avoid runtime import cycles
import type { Vendor } from "./model"

@Entity()
export class Product {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @ManyToOne(() => {
    // dynamic require breaks circular dependency at runtime
    const { Vendor } = require("./model")
    return Vendor
  }, vendor => vendor.products)
  @JoinColumn({ name: "vendor_id" })  // specify FK column explicitly
  vendor: Vendor

  @Column({ nullable: true })
  vendor_id: string
}
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
//import { TestEntity } from "./testEntity"
import type { Product } from "./product"

@Entity()
export class Vendor { 
  @PrimaryColumn()
  id: string

  @Column() 
  name: string

  @OneToMany(() => {
    const { Product } = require("./product")
    return Product
  }, (product: Product) => product.vendor)
  products: Product[]
}

//export { TestEntity }
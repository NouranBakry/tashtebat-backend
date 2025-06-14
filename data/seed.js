const { Medusa } = require("@medusajs/medusa");

const seed = async () => {
  const medusa = new Medusa({ 
    // When run inside Docker, you may need this to resolve correctly
    baseUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  });

  // 1. Create a region
  const { region } = await medusa.admin.regions.create({
    name: "EU",
    currency_code: "eur",
    tax_rate: 0,
    payment_providers: ["manual"],
    fulfillment_providers: ["manual"],
    countries: ["de"],
  });

  // 2. Create a store (optional, normally exists)
  await medusa.admin.store.update({
    name: "Demo Store",
    default_currency_code: "eur",
  });

  // 3. Create a product
  await medusa.admin.products.create({
    title: "Demo Product",
    description: "A simple seeded product",
    type: {
      value: "category",
    },
    variants: [
      {
        title: "Default Variant",
        prices: [{ amount: 2000, currency_code: "eur" }],
        options: [],
      },
    ],
    options: [],
  });

  // 4. Add shipping option (optional)
  await medusa.admin.shippingOptions.create({
    name: "Standard Shipping",
    region_id: region.id,
    provider_id: "manual",
    data: {},
    price_type: "flat_rate",
    amount: 1000,
    is_return: false,
  });

  console.log("✅ Seeding done!");
};

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
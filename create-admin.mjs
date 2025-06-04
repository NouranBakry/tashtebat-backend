import pkg from '@medusajs/medusa';
const { Medusa } = pkg;

async function createAdmin() {
  const medusa = new Medusa({ 
    // your medusa config here if needed
  });

  try {
    const admin = await medusa.admins.create({
      email: "nouranaymanbakry@gmail.com",
      password: "password"
    });
    console.log("Admin created:", admin);
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    process.exit();
  }
}

createAdmin();
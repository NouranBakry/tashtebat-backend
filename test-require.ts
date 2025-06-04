try {
    const vendor = require("./src/modules/vendor")
    console.log("Vendor module loaded:", vendor)
  } catch (e) {
    console.error("Failed to load vendor module:", e)
  }
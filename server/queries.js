const db = require("./db.js");

module.exports = {
  getProducts: async function () {
    try {
      const result = await db.query("SELECT * FROM products;");
    } catch (err) {
      console.error(err);
    }
  },
};

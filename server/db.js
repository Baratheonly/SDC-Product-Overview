const Client = require("pg").Client;
require("dotenv").config();

async function database() {
  console.log("Seeding fashion catalog data...");
  const client = new Client({
    database: "SDC",
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  });

  try {
    const connect = await client.connect();
  } catch (err) {
    console.error(err);
  }
}

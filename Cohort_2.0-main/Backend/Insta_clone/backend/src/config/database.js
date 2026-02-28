const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");
  } catch (error) {
    console.log("❌ DB Connection Error:", error.message);
    process.exit(1);
  }
}

module.exports = connectToDb;
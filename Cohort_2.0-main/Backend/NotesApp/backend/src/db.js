const mongoose = require("mongoose");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connect to db");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToDb;

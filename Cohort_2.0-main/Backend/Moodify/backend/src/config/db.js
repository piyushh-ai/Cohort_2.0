const { default: mongoose } = require("mongoose");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


const conntectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to db");
  });
};


module.exports = conntectToDb
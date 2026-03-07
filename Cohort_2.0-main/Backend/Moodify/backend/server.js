require("dotenv").config();
const app = require("../backend/src/app");
const conntectToDb = require("./src/config/db");

conntectToDb()

app.listen(3000, () => {
  console.log("server running on port 3000");
});

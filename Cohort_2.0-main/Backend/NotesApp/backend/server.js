require("dotenv").config();
const app = require("./src/App");
const connectToDb = require("./src/db")

connectToDb()

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on https://localhost:${port}`);
});

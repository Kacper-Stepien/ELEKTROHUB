const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("🟢 DB connection successful!");
  })
  .catch((err) => {
    console.log(`🔴 DB connection failed: ${err}`);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 App running on port ${PORT}...`);
});

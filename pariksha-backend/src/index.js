import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("ERROR : ", err);
      process.exit(1);
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log(`\nServer live at Port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed.", err);
  });

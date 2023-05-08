const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());
dotenv.config();

//routes
const UserRoute = require("./routes/users");
const AuthRoute = require("./routes/auth");
const ProductRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");

//connecting to mongo db database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConneciton successfully"))
  .catch((err) => {
    console.log(err);
  });

//app using routes
app.use("/api/users", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/products", ProductRoute);
app.use("/api/carts", CartRoute);
app.use("/api/orders", OrderRoute);

PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

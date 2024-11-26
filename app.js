require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./routers/product.js");
const userRouter = require("./routers/user.js");
const shippingAddressRouter = require("./routers/shippingAddress.js");
const warrantyCardRouter = require("./routers/warrantyCard.js");
const orderRouter = require("./routers/order.js");
const orderProductRouter = require("./routers/orderProduct.js");
const orderStatusRouter = require("./routers/orderStatus.js");
const fileRouter = require("./routers/file.js");
const googleAuthRouter = require("./routers/googleAuth.js")
app.use(express.json());
app.use(cors());
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/shipping-addresses", shippingAddressRouter);
app.use("/warranty-cards", warrantyCardRouter);
app.use("/orders", orderRouter);
app.use("/order-products", orderProductRouter);
app.use("/order-statuses", orderStatusRouter);
app.use("/files", fileRouter);
app.use("/google-auth", googleAuthRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//app.use("/products", productRouter);

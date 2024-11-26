const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const orderProductSchema = new Schema({
  order_id: {
    type: String,
    default: null,
    required: true,
  },
  product_id: {
    type: String,
    default: null,
    required: true,
  },
  quantity: {
    type: Number,
    default: null,
    required: true,
  },
  is_active: { type: Boolean, default: null, require: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
});
const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);

module.exports = OrderProduct;

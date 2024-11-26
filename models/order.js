const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const orderSchema = new Schema({
  tracking_number: {
    type: String,
    default: null,
  },
  tracking_url: {
    type: String,
    default: null,
  },
  order_number: {
    type: String,
    default: null,
  },
  delivered_by: {
    type: String,
    default: null,
  },
  delivery_status: {
    type: String,
    default: null,
  },
  shipping_address_id: { type: String, default: null, require: true },
  user_id: { type: String, default: null, require: true },
  is_active: { type: Boolean, default: null, require: true },
  created_by: { type: String, default: null, require: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

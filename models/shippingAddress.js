const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const shippingAddressSchema = new Schema({
  first_name: {
    type: String,
    default: null,
    required: true,
  },
  last_name: {
    type: String,
    default: null,
    required: true,
  },
  phone: {
    type: String,
    default: null,
    required: true,
  },
  address: {
    type: String,
    default: null,
    required: true,
  },
  district: {
    type: String,
    default: null,
    required: true,
  },
  province: {
    type: String,
    default: null,
    required: true,
  },
  zip_code: {
    type: String,
    default: null,
    required: true,
  },
  user_id: {
    type: String,
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

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

module.exports = ShippingAddress;

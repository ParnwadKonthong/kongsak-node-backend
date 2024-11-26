require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const ShippingAddress = require("../models/shippingAddress");
const WarrantyCard = require("../models/warrantyCard");
const Order = require("../models/order");
const OrderProduct = require("../models/orderProduct");
const OrderStatus = require("../models/orderStatus");
const File = require("../models/file");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// Product
const fetchAllProducts = async () => {
  try {
    const products = await Product.find();
    return products.map((product) => ({
      ...product.toObject(),
      id: product._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    return { ...product.toObject(), id: product._id };
  } catch (err) {
    throw err;
  }
};
const getProductsBySearchString = async (searchString, params) => {
  const products = await Product.find({
    name: { $regex: new RegExp(searchString, "i") },
    ...params,
  });
  return products.map((product) => ({
    ...product.toObject(),
    id: product._id,
  }));
};
const getProductsByParams = async (params) => {
  try {
    const products = await Product.find(params);

    return products.map((product) => ({
      ...product.toObject(),
      id: product._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createProduct = async (payload) => {
  try {
    const createdProduct = await Product.create(payload);

    return { ...createdProduct.toObject(), id: createdProduct._id };
  } catch (err) {
    throw err;
  }
};
const updateProduct = async (payload) => {
  if (!payload.id) throw new Error("Missing 'id' property in payload");
  const updatedProduct = await Product.findByIdAndUpdate(payload.id, payload, {
    new: true,
  });
  if (!updatedProduct) throw new Error("Product not found");

  return { ...updatedProduct.toObject(), id: updatedProduct._id };
};
const deleteProductById = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) throw new Error("Product not found");

  return { ...deleteProductById, id: deletedProduct._id };
};
// User
const fetchAllUsers = async () => {
  try {
    const users = await User.find();

    return users.map((user) => ({ ...user.toObject(), id: user._id }));
  } catch (err) {
    throw err;
  }
};
const getUsersByParams = async (params) => {
  try {
    const users = await User.find(params);

    return users.map((user) => ({ ...user.toObject(), id: user._id }));
  } catch (err) {
    throw err;
  }
};
const getUsersBySearchString = async (searchString, params) => {
  const users = await User.find({
    first_name: { $regex: new RegExp(searchString, "i") },
    ...params,
  });
  return users.map((user) => ({
    ...user.toObject(),
    id: user._id,
  }));
};
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("Product not found");

    return { ...user.toObject(), id: user._id };
  } catch (err) {
    throw err;
  }
};
const createUser = async (payload) => {
  try {
    const createdUser = await User.create(payload);

    return { ...createdUser.toObject(), id: createdUser._id };
  } catch (err) {
    throw err;
  }
};
const updateUser = async (payload) => {
  if (!payload.id) throw new Error("Missing 'id' property in payload");
  const updatedUser = await User.findByIdAndUpdate(payload.id, payload, {
    new: true,
  });
  if (!updatedUser) throw new Error("User not found");

  return { ...updatedUser, id: updatedUser._id };
};
const deleteUserById = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new Error("User not found");

  return { ...deletedUser, id: deletedUser._id };
};
// Shipping Address
const fetchAllShippingAddresses = async () => {
  try {
    const shippingAddresses = await ShippingAddress.find();
    return shippingAddresses.map((address) => ({
      ...address.toObject(),
      id: address._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getShippingAddressById = async (id) => {
  try {
    const shippingAddress = await ShippingAddress.findById(id);

    if (!shippingAddress) {
      throw new Error("Shipping address not found");
    }

    return { ...shippingAddress.toObject(), id: shippingAddress._id };
  } catch (err) {
    throw err;
  }
};
const getShippingAddressesByParams = async (params) => {
  try {
    const shippingAddresses = await ShippingAddress.find(params);
    return shippingAddresses.map((address) => ({
      ...address.toObject(),
      id: address._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createShippingAddress = async (payload) => {
  try {
    const createdShippingAddress = await ShippingAddress.create(payload);
    return {
      ...createdShippingAddress.toObject(),
      id: createdShippingAddress._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateShippingAddress = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true }
    );
    if (!updatedShippingAddress) throw new Error("Shipping address not found");

    return {
      ...updatedShippingAddress.toObject(),
      id: updatedShippingAddress._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteShippingAddressById = async (id) => {
  try {
    const deletedShippingAddress = await ShippingAddress.findByIdAndDelete(id);
    if (!deletedShippingAddress) throw new Error("Shipping address not found");

    return {
      ...deletedShippingAddress.toObject(),
      id: deletedShippingAddress._id,
    };
  } catch (err) {
    throw err;
  }
};
// Warranty Card
const fetchAllWarrantyCards = async () => {
  try {
    const warrantyCard = await WarrantyCard.find().sort({ _id: -1 });
    return warrantyCard.map((wc) => ({
      ...wc.toObject(),
      id: wc._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getWarrantyCardById = async (id) => {
  try {
    const warrantyCard = await WarrantyCard.findById(id);

    if (!warrantyCard) {
      throw new Error("Shipping address not found");
    }

    return { ...warrantyCard.toObject(), id: warrantyCard._id };
  } catch (err) {
    throw err;
  }
};
const getWarrantyCardsByParams = async (params) => {
  try {
    const warrantyCards = await WarrantyCard.find(params).sort({ _id: -1 });
    return warrantyCards.map((wc) => ({
      ...wc.toObject(),
      id: wc._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getWarrantyCardsBySearchString = async (searchString, params) => {
  const hexRegex = /^[0-9a-fA-F]+$/;
  const regex = new RegExp(searchString, 'i');
  const queryBy_id = hexRegex.test(searchString) ? [{ _id: new mongoose.Types.ObjectId(searchString) }, { created_by: { $regex: regex } }] : [{ created_by: { $regex: regex } }];
  const warrantyCards = await WarrantyCard.find({
    $or: queryBy_id,
    ...params,
  });
  return warrantyCards.map((wc) => ({
    ...wc.toObject(),
    id: wc._id,
  }));
};
const createWarrantyCard = async (payload) => {
  try {
    const createdWarrantyCard = await WarrantyCard.create(payload);
    return {
      ...createdWarrantyCard.toObject(),
      id: createdWarrantyCard._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateWarrantyCard = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedWarrantyCard = await WarrantyCard.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true }
    );
    if (!updatedWarrantyCard) throw new Error("Shipping address not found");

    return {
      ...updatedWarrantyCard.toObject(),
      id: updatedWarrantyCard._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteWarrantyCardById = async (id) => {
  try {
    const deletedWarrantyCard = await WarrantyCard.findByIdAndDelete(id);
    if (!deletedWarrantyCard) throw new Error("Shipping address not found");

    return {
      ...deletedWarrantyCard.toObject(),
      id: deletedWarrantyCard._id,
    };
  } catch (err) {
    throw err;
  }
};
// Order
const fetchAllOrders = async () => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    return orders.map((order) => ({
      ...order.toObject(),
      id: order._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderById = async (id) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Shipping address not found");
    }

    return { ...order.toObject(), id: order._id };
  } catch (err) {
    throw err;
  }
};
const getOrdersByParams = async (params) => {
  try {
    const orders = await Order.find(params).sort({ _id: -1 });
    return orders.map((order) => ({
      ...order.toObject(),
      id: order._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrdersBySearchString = async (searchString, params) => {
  const hexRegex = /^[0-9a-fA-F]+$/;
  const regex = new RegExp(searchString, 'i');
  const queryBy_id = hexRegex.test(searchString) ? [{ _id: new mongoose.Types.ObjectId(searchString) }, { created_by: { $regex: regex } }] : [{ created_by: { $regex: regex } }];
  const orders = await Order.find({
    $or: queryBy_id,
    ...params,
  });
  return orders.map((order) => ({
    ...order.toObject(),
    id: order._id,
  }));
};
const createOrder = async (payload) => {
  try {
    const createdOrder = await Order.create(payload);
    return {
      ...createdOrder.toObject(),
      id: createdOrder._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateOrder = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedOrder = await Order.findByIdAndUpdate(payload.id, payload, {
      new: true,
    });
    if (!updatedOrder) throw new Error("Shipping address not found");

    return {
      ...updatedOrder.toObject(),
      id: updatedOrder._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteOrderById = async (id) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) throw new Error("Shipping address not found");

    return {
      ...deletedOrder.toObject(),
      id: deletedOrder._id,
    };
  } catch (err) {
    throw err;
  }
};
// Order Product
const fetchAllOrderProducts = async () => {
  try {
    const orderProducts = await OrderProduct.find();
    return orderProducts.map((orderProduct) => ({
      ...orderProduct.toObject(),
      id: orderProduct._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderProductById = async (id) => {
  try {
    const orderProduct = await OrderProduct.findById(id);

    if (!orderProduct) {
      throw new Error("Shipping address not found");
    }

    return { ...orderProduct.toObject(), id: orderProduct._id };
  } catch (err) {
    throw err;
  }
};
const getOrderProductsByParams = async (params) => {
  try {
    const orderProducts = await OrderProduct.find(params);
    return orderProducts.map((orderProduct) => ({
      ...orderProduct.toObject(),
      id: orderProduct._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderProductsByCreatedDates = async (startDate, endDate) => {
  try {
    const orderProducts = await OrderProduct.find({
      created_at: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return orderProducts.map((orderProduct) => ({
      ...orderProduct.toObject(),
      id: orderProduct._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createOrderProduct = async (payload) => {
  try {
    const createdOrderProduct = await OrderProduct.create(payload);
    return {
      ...createdOrderProduct.toObject(),
      id: createdOrderProduct._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateOrderProduct = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedOrderProduct = await OrderProduct.findByIdAndUpdate(
      payload.id,
      payload,
      { new: true }
    );
    if (!updatedOrderProduct) throw new Error("Shipping address not found");

    return {
      ...updatedOrderProduct.toObject(),
      id: updatedOrderProduct._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteOrderProductById = async (id) => {
  try {
    const deletedOrderProduct = await OrderProduct.findByIdAndDelete(id);
    if (!deletedOrderProduct) throw new Error("Shipping address not found");

    return {
      ...deletedOrderProduct.toObject(),
      id: deletedOrderProduct._id,
    };
  } catch (err) {
    throw err;
  }
};
// Order Status
const fetchAllOrderStatuses = async () => {
  try {
    const orderStatuses = await OrderStatus.find();
    return orderStatuses.map((orderStatus) => ({
      ...orderStatus.toObject(),
      id: orderStatus._id,
    }));
  } catch (err) {
    throw err;
  }
};
const getOrderStatusById = async (id) => {
  try {
    const orderStatus = await OrderStatus.findById(id);

    if (!orderStatus) {
      throw new Error("Shipping address not found");
    }

    return { ...orderStatus.toObject(), id: orderStatus._id };
  } catch (err) {
    throw err;
  }
};
const getOrderStatusesByParams = async (params) => {
  try {
    const orderStatuses = await OrderStatus.find(params);
    return orderStatuses.map((orderStatus) => ({
      ...orderStatus.toObject(),
      id: orderStatus._id,
    }));
  } catch (err) {
    throw err;
  }
};
const createOrderStatus = async (payload) => {
  try {
    const createdOrderStatus = await OrderStatus.create(payload);
    return {
      ...createdOrderStatus.toObject(),
      id: createdOrderStatus._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateOrderStatus = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedOrderStatus = await OrderStatus.findByIdAndUpdate(
      payload.id,
      payload,
      {
        new: true,
      }
    );
    if (!updatedOrderStatus) throw new Error("Shipping address not found");

    return {
      ...updatedOrderStatus.toObject(),
      id: updatedOrderStatus._id,
    };
  } catch (err) {
    throw err;
  }
};
const deleteOrderStatusById = async (id) => {
  try {
    const deletedOrderStatus = await OrderStatus.findByIdAndDelete(id);
    if (!deletedOrderStatus) throw new Error("Order status not found");

    return {
      ...deletedOrderStatus.toObject(),
      id: deletedOrderStatus._id,
    };
  } catch (err) {
    throw err;
  }
};
// File
const createFile = async (payload) => {
  try {
    const createdFile = await File.create(payload);
    return {
      ...createdFile.toObject(),
      id: createdFile._id,
    };
  } catch (err) {
    throw err;
  }
};
const updateFile = async (payload) => {
  try {
    if (!payload.id) throw new Error("Missing 'id' property in payload");
    const updatedFile = await File.findByIdAndUpdate(payload.id, payload, {
      new: true,
    });
    if (!updatedFile) throw new Error("File not found");

    return {
      ...updatedFile.toObject(),
      id: updatedFile._id,
    };
  } catch (err) {
    throw err;
  }
};
const getFilesByParams = async (params) => {
  try {
    const files = await File.find(params);
    return files.map((file) => ({
      ...file.toObject(),
      id: file._id,
    }));
  } catch (err) {
    throw err;
  }
};
const deleteFileById = async (id) => {
  try {
    const deletedFile = await File.findByIdAndDelete(id);
    if (!deletedFile) throw new Error("File not found");

    return {
      ...deletedFile.toObject(),
      id: deletedFile._id,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  // Product
  fetchAllProducts,
  getProductById,
  getProductsByParams,
  getProductsBySearchString,
  createProduct,
  updateProduct,
  deleteProductById,
  // User
  fetchAllUsers,
  getUserById,
  getUsersByParams,
  getUsersBySearchString,
  createUser,
  updateUser,
  deleteUserById,
  // Shipping Address
  fetchAllShippingAddresses,
  getShippingAddressById,
  getShippingAddressesByParams,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddressById,
  // Warranty Card
  fetchAllWarrantyCards,
  getWarrantyCardById,
  getWarrantyCardsByParams,
  getWarrantyCardsBySearchString,
  createWarrantyCard,
  updateWarrantyCard,
  deleteWarrantyCardById,
  // Order
  fetchAllOrders,
  getOrderById,
  getOrdersByParams,
  getOrdersBySearchString,
  createOrder,
  updateOrder,
  deleteOrderById,
  // Order Product,
  fetchAllOrderProducts,
  getOrderProductById,
  getOrderProductsByParams,
  createOrderProduct,
  updateOrderProduct,
  deleteOrderProductById,
  getOrderProductsByCreatedDates,
  // Order Status,
  fetchAllOrderStatuses,
  getOrderStatusById,
  getOrderStatusesByParams,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatusById,
  // File
  createFile,
  getFilesByParams,
  updateFile,
  deleteFileById,
};

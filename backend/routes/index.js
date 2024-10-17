const express = require('express');
const auth = require('./auth.js');
const userRoutes = require('./user.js');
const categoryRoutes = require('./category.js');
const productRoutes = require('./product.js');
const orderRoutes = require('./order.js');
const paymentRoutes = require('./stripe.js');

const selectionRoute = (app) => {
    app.use('/', auth);
    app.use("/api", userRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api", productRoutes);
    app.use("/api", orderRoutes);
    app.use("/api", paymentRoutes);
    app.use("/api/images", express.static("tshirts"));
}

module.exports = selectionRoute;
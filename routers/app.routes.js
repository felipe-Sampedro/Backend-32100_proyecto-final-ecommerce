const express = require("express");
const productsRoutes = require("./products/products.routes");
const carRoutes = require("./cart/cart.routes");
const usersRoutes = require("./users/users.routes");
const authRoutes = require("./auth/auth.routes");
const filesRoutes = require("./files/files.routes");
const auth = require("../middlewares/auth");
const path = require("path");

const router = express.Router();

router.use("/products", productsRoutes);
router.use("/cart", carRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use(filesRoutes);

const ProductsMongoDao = require('../models/daos/products/products.mongo.dao');
const { jwtAuth } = require("../middlewares/jwt.middleware");
const productsApi = new ProductsMongoDao();

router.get("/", async (req, res) => {
  const user = req.user;
  const { username, email, password} = req.body
  // if (user) {
  if (username && email && password) {
    console.log('entro aqui22222');
    console.log(user);
    return res.redirect("/api/index");
  } else {
    console.log('entro aqui');
    console.log(user);
    // return res.sendFile(path.resolve(__dirname, "../public/login.html"));
    return res.sendFile(path.resolve(__dirname, "../public/login.html"));
  }
});

// router.get("/index", auth, async (req, res) => {
router.get("/index", jwtAuth, async (req, res) => {
  // const user = await req.user.name;
  const { username, email, password} = req.body
  const products = await productsApi.getAll();
  res.render("index", { sessionUser: username, logout: false, products: products });
});

router.get("/logout", auth, async (req, res, next) => {
  const user = await req.user.name;
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.clearCookie("my-session");
        res.redirect("/");
      } else {
        res.clearCookie("my-session");
        res.render("index", { sessionUser: user, logout: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/error", (req, res) => {
  res.status(500).redirect("error.html");
});

router.get("/unauthorized", (req, res) => {
  res.status(401).sendFile("unauthorized.html");
});

module.exports = router;

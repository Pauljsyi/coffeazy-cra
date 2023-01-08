const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

module.exports.findAllProducts = (req, res) => {
  Product.find()
    .then((items) => res.render("imagesPage", { items: items }))
    .catch((err) => {
      console.log(err);
      res.status(500).send("AN ERROR OCCURED", err);
    });
};

module.exports.uploadNewProducts = (req, res, next) => {
  console.log("this is coming from product.controller req: ", req.body);
  const obj = {
    product_name: req.body.product_name,
    price: req.body.price,
    description: req.body.description,
    image: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.body.product_name)
      ),
      contentType: "image/jpeg",
    },
  };
  Product.create(obj)
    .then((item) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const productsServices = require("../services/products.services");
const upload = require("../middleware/upload.js");

// Create and Save a new Product
exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        //err: file type /file size
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : "",
            };

            productsServices.createProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Success",
                    data: results,
                });
            });
        }
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res, next) => {
    var model = {
        productName: req.query.productName,
    };

    productsServices.getProducts(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

// Find a single product with an id
exports.findOne = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };

    productsServices.getProductById(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

// Update a Product
exports.updateOne = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");

            const path =
                req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                productId: req.params.id,
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : "",
            };

            console.log(model);

            productsServices.updateProduct(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Success",
                    data: results,
                });
            });
        }
    });
};

// Delete a Product
exports.deleteOne = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };

    productsServices.deleteProduct(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};
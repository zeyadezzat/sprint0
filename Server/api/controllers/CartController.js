var mongoose = require('mongoose'),
    auth = require('basic-auth'),
    Validation = require('../utils/Validations'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product');

module.exports.getCart = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId.',
            data: null
        });
    }

    User.findById(req.params.userId).exec(function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }

        res.status(200).json({
            err: null,
            msg: 'Cart retrieved successfully.',
            data: user.cart
        });
    });
};

module.exports.postCart = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId.',
            data: null
        });
    }

    if (req.body.products === undefined || req.body.totalPrice === undefined) {
        return res.status(422).json({
            err: null,
            msg: 'products and totalPrice are required fields.',
            data: null
        });
    }

    User.findByIdAndUpdate(req.params.userId, { $set: { cart: req.body } }, function (err, user) {
        if (err)
            return next(err);

        if (!user) 
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });

        res.status(201).json({
            err: null,
            msg: 'Cart updated successfully.',
            data: null
        });
    })
};
const {Request, Response, Router} = require("express");
const Joi = require('joi')
const {guard} = require("../helper/Auth");
const {addressModel} = require('../model/address.model');
const {Constant} = require('../constant');

const {passwordRegex, emailRegex} = Constant;

//init router instance.
const router = Router();


let addAddress = (req, res) => {
    const schema = Joi.object().keys({
        address1: Joi.string().required(),
        address2: Joi.string(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        pin_zip: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) { res.status(400).json({status: 400, success: false, message: err.details[0].message}) }
            else {
                newData.createdBy = req["body"].loggedInUser._id;
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await addressModel(newData).save().catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Role type Successfully saved.", data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};

let updateAddress = (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        pin_zip: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) res.status(400).json({status: 400, success: false, message: err.details[0].message})
            else {
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await addressModel.findByIdAndUpdate(newData.id, newData).catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Role type Successfully updated.", data: data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};


//all sub-route's.
router.post('/add', guard, addAddress);
router.put('/update', guard, updateAddress);

exports.addressRouter = router;
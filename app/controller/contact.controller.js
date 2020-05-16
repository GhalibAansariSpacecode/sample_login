const {Request, Response, Router} = require("express");
const Joi = require('joi')
const {guard} = require("../helper/Auth");
const {contactModel} = require('../model/contact.model');
const {Constant} = require('../constant');

const {passwordRegex, emailRegex} = Constant;

//init router instance.
const router = Router();


let addContact = (req, res) => {
    const schema = Joi.object().keys({
        country_code: Joi.number().required(),
        contact_number: Joi.number().required(),
        contact_person: Joi.string().required(),
        contact_email: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) { res.status(400).json({status: 400, success: false, message: err.details[0].message}) }
            else {
                newData.createdBy = req["body"].loggedInUser._id;
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await contactModel(newData).save().catch((err) => {   //roleType saved in database
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Contact Successfully saved.", data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};

let updateContact = (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        country_code: Joi.number().required(),
        contact_number: Joi.number().required(),
        contact_person: Joi.string().required(),
        contact_email: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) res.status(400).json({status: 400, success: false, message: err.details[0].message})
            else {
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await contactModel.findByIdAndUpdate(newData.id, newData).catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Contact Successfully updated.", data: data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};


//all sub-route's.
router.post('/add', guard, addContact);
router.put('/update', guard, updateContact);

exports.contactRouter = router;
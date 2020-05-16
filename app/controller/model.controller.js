const {Router} = require("express");
const Joi = require('joi')
const {guard} = require("../helper/Auth");
const {modelModel} = require('../model/model.model');
const {Constant} = require('../constant');

const {passwordRegex, emailRegex} = Constant;

//init router instance.
const router = Router();


let addModel = (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) { res.status(400).json({status: 400, success: false, message: err.details[0].message}) }
            else {
                newData.createdBy = req["body"].loggedInUser._id;
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await modelModel(newData).save().catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Model Successfully saved.", data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};

let updateModel = (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) res.status(400).json({status: 400, success: false, message: err.details[0].message})
            else {
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await modelModel.findByIdAndUpdate(newData.id, newData).catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Model Successfully updated.", data: data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};


//all sub-route's.
router.post('/add', guard, addModel);
router.put('/update', guard, updateModel);

exports.modelRouter = router;
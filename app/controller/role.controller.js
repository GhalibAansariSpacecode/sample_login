const {Request, Response, Router} = require("express");
const Joi = require('joi')
const {guard} = require("../helper/Auth");
const {roleModel} = require('../model/role.model');
const {Constant} = require('../constant');

const {passwordRegex, emailRegex} = Constant;

//init router instance.
const router = Router();


let addRole = (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        role_type_id: Joi.string().required(),
        model_ids: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) { res.status(400).json({status: 400, success: false, message: err.details[0].message}) }
            else {
                newData.createdBy = req["body"].loggedInUser._id;
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await roleModel(newData).save().catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Role Successfully saved.", data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};

let updateRole = (req, res) => {
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        role_type_id: Joi.string().required(),
        model_ids: Joi.string().required(),
        loggedInUser: Joi.any(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) res.status(400).json({status: 400, success: false, message: err.details[0].message})
            else {
                newData.modifiedBy = req["body"].loggedInUser._id;
                let data = await roleModel.findByIdAndUpdate(newData.id, newData).catch((err) => {
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"] || err['message']})
                });
                await res.status(200).json({status: 200, success: true, message: "Role Successfully updated.", data: data})
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};


//all sub-route's.
router.post('/add', guard, addRole);
router.put('/update', guard, updateRole);

exports.roleRouter = router;
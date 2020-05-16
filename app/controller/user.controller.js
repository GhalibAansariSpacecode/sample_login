const {Request, Response, Router} = require("express");
const {userModel} = require('../model/user.model');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const {guard} = require("../helper/Auth");
const AES = require('crypto-js/aes');
const {Constant} = require('../constant');

let users = [];
const {passwordRegex, emailRegex} = Constant;

//init router instance.
const router = Router();

/**
 * Admin Registration api.
 * @param req {email, password}
 * @param res {success or fails message}
 */
let userRegistration = (req, res) => {
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email({minDomainAtoms: 2}).regex(emailRegex),
        password: Joi.string().required().regex(passwordRegex).label('Password should have 8 digit and alphanumeric.'),
        salt: Joi.string().required(),
    });
    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) { res.status(400).json({status: 400, success: false, message: err.details[0].message}) }
            else {
                let data = await new userModel(newData).save().catch((err) => {   //user saved in database
                    return res.status(400).json({status: 400, success: false, message: err["errmsg"]})
                });
                res.status(200).json({
                    status: 200, success: true, message: "Registration Successful. Please login.",
                })
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};


/**
 * Add new user api.
 * @param req {name, email, password, salary, parrent_id, bonus_type}
 * @param res {success or fails message}
 */
let addUser = (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email({minDomainAtoms: 2}).regex(emailRegex),
        password: Joi.string().required().regex(passwordRegex).label('Password should have 8 digit and alphanumeric.'),
        salary: Joi.number().required(),
        loggedInUser: Joi.any()
    });
    const newData = req.body;
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) { res.status(400).json({status: 400, success: false, message: err.details[0].message}) }
            else {
                await new userModel(newData).save()
                .then((datax) => {
                    res.status(200).json({
                        status: 200, success: true, message: "User Created Sucessfully.", data: {...datax._doc}
                    })
                })
                .catch((err) => {   //user saved in database
                    return res.status(400).json({status: 400, success: false, message: err.errmsg || err})
                });
            }
        })
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message,})
    }
};


/**
 * login api.
 * @param req   {email,     password}
 * @returns {encrypted_jwt_token}
 */
let userLogin = async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email({minDomainAtoms: 2}).regex(emailRegex),
        password: Joi.string().required().regex(passwordRegex),
    });

    const newData = req["body"];
    try {
        Joi.validate(newData, schema, async (err, value) => {
            if (err) {
                res.status(400).json({status: 400, success: false, message: err.details[0].message,})
            } else {
                userModel.findOne({email: newData.email})
                    .then((data) => {
                        if (data.email === newData.email && newData.password === data.password) {
                            let jct_token_encrypt = jwt.sign({email: data.email, _id: data._id}, 'secrets', {expiresIn: daysInSeconds(600 / (24 * 60))});
                            let jwt_token = AES.encrypt(jct_token_encrypt, 'secret_key_jwt_token').toString();
                            res.status(200).json({
                                status: 200, success: true, message: "Login Successfully", data: {token: jwt_token},
                            })
                        } else {
                            res.status(401).json({
                                status: 401, success: false, message: "Email or Password is Invalid."
                            })
                        }
                    })
                    .catch(() => {
                        res.status(401).json({status: 401, success: false, message: "Email or Password is Invalid.",})
                    })
            }
        });
    } catch (err) {
        res.status(400).json({status: 400, success: false, message: err.message})
    }
};

//seconds in days calculation.
function daysInSeconds(days) {
    // const oneMinute = 1000 * 60;
    const oneHour = 60 * 60;
    const oneDay = oneHour * 24;
    return oneDay * days;
}

//all sub-route's.
router.post('/registration', userRegistration);
router.post('/login', userLogin);
// router.post('/adduser', guard, addUser);


exports.userRouter = router;
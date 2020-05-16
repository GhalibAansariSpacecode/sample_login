const {NextFunction, Request, Response} = require("express");
const AES = require('crypto-js/aes');
const CryptoJS  = require('crypto-js');
const jwt = require('jsonwebtoken')
const {Constant} = require('../constant');


/**
 * guard function stops unAuthorize user from access.
 * @param req   {jwt_encrypted_token,   data}
 * @param res
 * @param next
 */
function guard(req, res, next) {
    try {
        let jwt_token_header = req["headers"]['authorization'];   //get encrypted token_header from front_end.
        let jwt_token_decrypt = AES.decrypt(jwt_token_header, Constant.secret_key);  //decrypt token_header.
        let jwt_token = jwt_token_decrypt.toString(CryptoJS.enc.Utf8);  //covert to string.
        req["body"].loggedInUser = jwt.verify(jwt_token, Constant.jwt_key);   //verify jwt.
        next();
    } catch (err) {
        res.status(401).json({status: 401, success: false, message: "Login please."})
    }
}

exports.guard = guard;
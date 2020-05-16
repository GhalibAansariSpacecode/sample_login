const {roleRouter} = require("../controller/role.controller");
const {contactRouter} = require("../controller/contact.controller");
const {modelRouter} = require("../controller/model.controller");
const {Router} = require('express')
const {userRouter} = require('../controller/user.controller')
const {roleTypeRouter} = require('../controller/role_type.controller')

// Init router and path
const router = Router();

//routers here.
router.use('/user', userRouter);
router.use('/roleType', roleTypeRouter);
router.use('/model', modelRouter);
router.use('/contact', contactRouter);
router.use('/role', roleRouter);
//404 router here.
router.use('*', function (req, res) { res.status(404).json({status: 404, success: false, message: "Page not found."}) });   //404 pages here.

// Export the base-router
exports.mainRouter = router;
// return router;
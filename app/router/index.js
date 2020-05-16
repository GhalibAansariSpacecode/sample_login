const {Router} = require('express')
const {userRouter} = require('../controller/user.controller')
const {roleTypeRouter} = require('../controller/role_type.controller')

// Init router and path
const router = Router();

//user router here.
router.use('/user', userRouter);
router.use('/roleType', roleTypeRouter);
//404 router here.
router.use('*', function (req, res) { res.status(404).json({status: 404, success: false, message: "Page not found."}) });   //404 pages here.

// Export the base-router
exports.mainRouter = router;
// return router;
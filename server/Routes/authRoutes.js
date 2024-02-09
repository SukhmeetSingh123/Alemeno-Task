const express = require('express');
const authController=require('../Controller/authController');
const fetchUserMiddleware=require('../Middleware/fetchUserMiddleware')
const router = express.Router();
const { body } = require('express-validator');

router.post('/login', 
[
    body('email', "enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()
],
authController.loginUser);

router.post('/createUser', 
[
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "password must be atleast 5 character").isLength({ min: 5 })
 ],
 authController.createUser);

 router.get('/getLogedInUserDetail', fetchUserMiddleware, authController.logedInUserDetail);
 router.put('/updateLogedInUserDetail/:courseId', fetchUserMiddleware, authController.updateLogedInUserDetail);
module.exports = router;
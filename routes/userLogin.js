const express = require('express');
const router = express.Router();

const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');

router.route('/register').post(register)
router.route('/login').post(login)





module.exports = router
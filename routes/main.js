const express = require('express');
const router = express.Router();

const {login, dashboard, register} = require('../controllers/main');

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/dashboard').get(dashboard)




module.exports = router
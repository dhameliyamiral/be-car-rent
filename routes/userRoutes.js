const express = require('express');
const router = express.Router();
const {userRegApi} = require('../controller/userRegApi');
const {userLoginApi} = require('../controller/userLoginApi')
router.post('/registrations',userRegApi);
router.post('/login',userLoginApi)
module.exports = router;
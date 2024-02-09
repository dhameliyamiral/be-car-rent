const express = require('express');
const router = express.Router();
const {userRegApi} = require('../controller/userRegApi');
router.post('/registrations',userRegApi);
module.exports = router;
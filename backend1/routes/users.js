const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/signup/',userCtrl.signUp);
router.post('/login/',userCtrl.login);
router.get('/:id/',userCtrl.isAdmin);


module.exports = router;

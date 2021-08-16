const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth');


const likeCtrl = require('../controllers/likes');

router.post('/',auth, likeCtrl.like);
router.get('/:id/',auth, likeCtrl.getLikes);


module.exports = router;

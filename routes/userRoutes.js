const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, getBalance, storeBox } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/12', storeBox);
router.post('/balance', getBalance); 

    router.get('/app/:id', getUser);
   


module.exports = router;

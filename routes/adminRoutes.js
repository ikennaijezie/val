const express = require('express');
const router = express.Router();
const { getAllUsers, loginAdmin, getUser, getBalance, storeBox } = require('../controllers/adminController');


router.post('/login', loginAdmin);
router.get('/alluser', getAllUsers);

// router.post('/12', storeBox);
// router.post('/balance', getBalance); 

//     router.get('/app/:id', getUser);
   


module.exports = router;

const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware"); 
const { authorizeRoles } = require("../middlewares/roleMiddleware"); 
const router = express.Router();

router.get('/admin',authenticate,authorizeRoles("admin"), (req, res) => {
    res.send('Admin page');
});

router.get('/manager',authenticate,authorizeRoles("admin","manager"), (req, res) => {
    res.send('manager page');
});

router.get('/user',authenticate,authorizeRoles("admin","manager","user"), (req, res) => {
    res.send('User page');
});


module.exports = router;

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a User using: Post "api/auth". Doesn't require auth
router.post('/',(req,res)=>{
    // body me jo apne likha usko read kiya 
    console.log(req.body);
    const user = User(req.body)
    user.save()
    res.send(req.body)
})

module.exports = router
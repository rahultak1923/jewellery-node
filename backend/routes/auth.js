const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: Post "api/auth". Doesn't require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password atlest 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    // body me jo apne likha usko read kiya 
    const errors = validationResult(req);
    //    agar koi filed empty hai to uska error show karna 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //    user create karte time already user hoga to error show ho jayega 
    try {
        let = user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "sorry a user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })

        //    .then(user=>res.json(user)).catch(err=>{console.log(err)
        //      res.json({error:"please enter a unique email", message: err.message})})
        res.json(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

})

module.exports = router
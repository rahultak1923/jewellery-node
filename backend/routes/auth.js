const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // password ke hass ke liye 
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const { useId } = require('react');

const JWT_SECRET = 'Rahulisagood$oy'

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

        // password ko has me convert kiya and salt create kiya 
        const salt = await bcrypt.genSalt(10);
        // secpass me password de diya jiska hass banana hai 
        const secPass =await bcrypt.hash( req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        //    .then(user=>res.json(user)).catch(err=>{console.log(err)
        //      res.json({error:"please enter a unique email", message: err.message})})
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData)
        // res.json(user)
        res.json({authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

// 2 Authenticate a User using: Post "api/auth/login". Doesn't require auth

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res)=>{
    // If there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {email, password}= req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: "Please try to login with correct credentials"})
        }
        // password ko compare kar ne ke liye passwordCompare 
        const passwordCompare = await bcrypt.compare(password , user.password)
        // agar password match nhi hua to 
        if(!passwordCompare){
            return res.status(400).json({errors: "Please try to login with correct credentials"})
        }

        // agar password match ho gaya to 
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// 3 Git loggedin User Details using : Post "api/auth/getuser". Doesn't require auth

// middeleware ka use karenge jaha jaha user ko login ki jarurat hogi waha waha middeleware ka use karenge 
router.post('/getuser', fetchuser, async (req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// 4 Git loggedin User Details using : Post "api/auth/getuser". Doesn't require auth

router.get('/alluser', async(req, res)=>{
    const user = await User.find(req.user)
    res.send(user)
})
module.exports = router
const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Jewellery = require('../models/Jewellery');
const { body, validationResult } = require('express-validator');


// 1 Get All the jewellery : Get "api/jewellery/fetchalljewellery". Login required
router.get('/fetchalljewellery', fetchuser, async (req,res)=>{
    try {
        const jewellery = await Jewellery.find({user: req.user.id});
        res.json(jewellery)  
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
    
})

// 2 Get All the jewellery : Get "api/jewellery/addjewellery". Login required 
router.post('/addjewellery', fetchuser,[
    body('jewelleryname', 'Enter a valid jewelleryname').isLength({ min: 3 }),
    body('description', "description atlest 5 characters").isLength({ min: 5 }),
    body('price', 'Enter a right price').isNumeric(),
    body('quantity', 'enter a right quantity').isInt(),
], async (req,res)=>{
    try {
    const {jewelleryname,description, price, quantity} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const jewellery = new Jewellery({
        jewelleryname, description, price, quantity, user: req.user.id
    })
    const savedJewellery = await jewellery.save()
    res.json(savedJewellery)
}  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
}
})

// 3 Update an existing note using : put "api/jewellery/updatejewellery". Login required 
router.put('/updatejewellery/:id', fetchuser, async(req,res)=>{
    const {jewelleryname,description, price, quantity} = req.body;
    // create a new jewellery
    const newJewellery = {};
    if(jewelleryname){newJewellery.jewelleryname = jewelleryname};
    if(description){newJewellery.description = description};
    if(price){newJewellery.price = price};
    if(quantity){newJewellery.quantity = quantity};

    // jewellery ko find karo and update karo 
    let jewellery = await Jewellery.findById(req.params.id);
    if(!jewellery){return res.status(404).send("not found")}
    // ye user vo hi hai jo is jewellery ko update kar raha hai ye usi ke hi jewellery add hai 

    if(jewellery.user.toString() != req.user.id){
        return res.status(401).send("not allowed")
    }
    // jewellery ko update
    jewellery = await Jewellery.findByIdAndUpdate(req.params.id, {$set: newJewellery},{new: true})
    res.json({jewellery})
})

// 4 delete an existing note using : delete "api/jewellery/deletejewellery". Login required 
router.delete('/deletejewellery/:id', fetchuser, async(req,res)=>{
    // jewellery ko find karo and delete karo 
    let jewellery = await Jewellery.findById(req.params.id);
    if(!jewellery){return res.status(404).send("not found")}
    // ye user vo hi hai jo is jewellery ko delete kar raha hai ye usi ke hi jewellery add hai 

    if(jewellery.user.toString() != req.user.id){
        return res.status(401).send("not allowed")
    }
    // jewellery ko update
    jewellery = await Jewellery.findByIdAndDelete(req.params.id)
    res.json({"Sucess": "Note has been Delted", jewellery:jewellery})
})


module.exports = router
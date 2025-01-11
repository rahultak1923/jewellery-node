const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Jewellery = require('../models/Jewellery');



// 1 Get All the jewellery : Get "api/jewellery/fetchalljewellery". Login required
router.get('/fetchalljewellery', fetchuser, async (req,res)=>{
    const jewellery = await Jewellery.find({user: req.user.id});
    res.json(jewellery)
})



module.exports = router
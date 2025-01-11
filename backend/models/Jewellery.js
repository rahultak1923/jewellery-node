const { type } = require('@testing-library/user-event/dist/type')
const mongoose = require('mongoose')
const {Schema} = mongoose;

const JewellerySchema = new mongoose.Schema({
    // images add karne ka bi schema banana hai 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: String,
        required: true,
    },
    quantity:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('jewellery',JewellerySchema);
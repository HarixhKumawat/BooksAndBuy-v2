const {Schema,model} = require('mongoose');

module.exports.book = model('Book', Schema({
    name:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genres:{
        type:[String],
        required:true
    },
    description:{
        type:Number,
        required:true
    },
    buys:{
        type:Number,
        required:true
    }
},{timestamp:true}));
const {Schema,model} = require('mongoose');

module.exports.user = model('User', Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    books:{
        type:[Schema.Types.ObjectId]
    }
},{timestamp:true}));
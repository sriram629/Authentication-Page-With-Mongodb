const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email: String,
    phoneNo : Number,
    password: String,
    verificationCode:String,
    activationCode:String,
    ActivationCode:String,
    active: {
        type: Boolean,
        default: false 
    }
    
})

const FormDataModel = mongoose.model('login_register_form', FormDataSchema);

module.exports = FormDataModel;

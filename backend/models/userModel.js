const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    _id: { 
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default: 'user',
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    cart:{
        type:Array,
        default:[],
    },
    address:{
      type:String,
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }],
    refreshToken:{
        type: String,
    },
    applyAsVendor: [{
        shopName: {
            type: String,
        },shopDesc: {
            type: String,
        },KRACert: {
            type: String,
        },
    }   
    ],
    isApprovedVendor: {
        type: Boolean,
        default: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,	
    passwordResetExpires: Date,

    },
    {
        timestamps:true,
    }
);

userSchema.pre('save', async function(next){
    // If password is not modified, then don't hash it.

    // if(!this.isModified('password')){
    //     next();
    // }
    // const salt = await bcrypt.genSaltSync(10);
    // this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

// userSchema.methods.isPasswordMatched = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password);
// }
 
userSchema.methods.createPasswordResetToken = async function(){	
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // Ten minutes
    return resettoken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);
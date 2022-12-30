const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10
const secretToken = 'secretToken'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    id: {
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 4
    },
    role:{
        type: Number
    },
    location:{
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    following: {
        type: Array
    },
    follower:{
        type: Array
    },
    token:{
        type: String
    },
    
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    return next(err);
                }
                user.password = hash
                next();
            })
        })
    }else{
        next()
    }
})

userSchema.statics.saveNewPassword = function(newPassword, cb){
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) {
            return cb(err);
        }
        bcrypt.hash(newPassword, salt, function(err, hash){
            if(err){
                return cb(err);
            }
            return cb(null,hash);
        })
    })
}

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this

    var token = jwt.sign(user._id.toHexString(), secretToken)
    user.token = token
    user.save((err,user)=>{
        if(err) return cb(err)
        return cb(null,user)
    })    
}

userSchema.statics.findByToken = function(token, cb){
    var user = this
    jwt.verify(token,secretToken,function(err, decoded){
        user.findOne({"_id": decoded, "token": token}, function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })  
}

const User = mongoose.model('User', userSchema);

module.exports = { User }
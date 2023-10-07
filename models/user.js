const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {ObjectID} = require('mongodb');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [
            true, 'Name required'
        ],
        trim: true
    },
    lastName: {
        type: String,
        required: [
            true, 'Name required'
        ],
        trim: true
    },
    email: {
        type: String,
        required: [
            true, 'Email required'
        ],
        unique: true,
        trim: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    mobileNumber:{
        type: Number,
        required: [
            true, 'Email required'
        ],
        unique: true,
        trim: true,
        validator: [validator.isMobileNumber, 'Please provide a valid Mobile Number']
    },
    password: {
        type: String,
        required: [
            true, 'Password required'
        ],
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "Password"');
            }
        }
    },
    address:[{
        country:{
            type: String,
            required: [
                true, 'Country is required'
            ],
            trim: true
        },
        state:{
            type: String,
            required: [
                true, 'State is required'
            ],
            trim: true
        },
        pincode:{
            type: Number,
            required: [
                true, 'Pincode is required'
            ],
            trim: true
        },
        Lane_1:{
            type: String,
            required: [
                true, 'Lane_1 is required'
            ],
            trim: true
        },
        Lane_2:{
            type: String,
            required: [
                true, 'Lane_2 is required'
            ],
            trim: true
        },
    }],
    role: {
        type: String,
        default: 'customer',
        enum: [
            'customer', 'vendor', 'admin'
        ],
        trim: true
    },
    services: [
        {
            serviceID: {
                type: ObjectID,
                trim: true
            }
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    userToken: {
        type: String,
        // required: [true, 'Token required']
    },
    tokenExpiresIn: {
        type: String,
        default: new Date() + 10 * 60 * 1000 // time,
    }
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

userSchema.methods.matchPassword = async function(password, encryptedPass){
    return await bcrypt.compare(password, encryptedPass);
}

const User = mongoose.model('Users', userSchema);
module.exports = User;

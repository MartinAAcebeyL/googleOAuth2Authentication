const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please fill a valid email address']
    },
    password: { type: String },
    date: { type: Date },
    isInstitute: { type: Boolean, default: false },
    loginType: { type: String, default: "email" },
    access_token: { type: String },
    refresh_token: { type: String },
    id_token: { type: String },
    googleID: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    deletedAt: { type: Date, required: false, default: null }
})

const user = mongoose.model('User', userShema);
module.exports = user;
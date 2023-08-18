const mongoose=require('mongoose');
const db=require('../models/db');
require('dotenv').config();

const companySchema=new mongoose.Schema({
    companyName: String,
    ownerName: String,
    rollNo: String,
    ownerEmail: String,
    clientID: String,
    clientSecret: String,
})

module.exports = mongoose.model("company", companySchema);
// mongo/fileModel.js

// const { json } = require('express');
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
   SrNo: Number,
  Date: Number,
  Name: String,
  Email: String,
  LBACode: String,
  Plan: String,
  PlanMRP: Number,
  PlanRate: Number,
  OnboardingStatus: String,
  PaymentStatus: String,
  Coupon: String

});


// const fileSchema = new mongoose.Schema({
//   uploadedDate: String,
//   data:JSON

// });

const File = mongoose.model('File', fileSchema);

module.exports = File;

// controllers/excelController.js

const multer = require('multer');
const XLSX = require('xlsx');
const File = require('../mongo/fileModel');

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function uploadExcel(req, res) {
  try {
    // Parse the uploaded Excel file

    console.log('Files:', req.file); // Log the req.file object

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const base64String = req.file.buffer.toString('base64');

    console.log('Base64 String:', base64String);

    const binaryData = Buffer.from(base64String, 'base64');

      const workbook = XLSX.read(binaryData, { type: 'buffer' });

    // const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log('data',data);
    //  const fileDetails=data.toString;


    
     //Store each object from 'data' array individually
     for (let row of data) {
      const { 'Sr No': srNo, Date, Name, Email, 'LBA Code': lbaCode, Plan, 'Plan MRP': planMRP, 'Plan Rate': planRate, 'Onboarding Status': onboardingStatus, 'Payment Status': paymentStatus, Coupon } = row;

      await File.create({
        SrNo: srNo,
      Date: Date,
      Name: Name,
      Email: Email,
      LBACode: lbaCode,
      Plan: Plan,
      PlanMRP: planMRP,
      PlanRate: planRate,
      OnboardingStatus: onboardingStatus,
      PaymentStatus: paymentStatus,
      Coupon: Coupon
      });
    }

    // Iterate through each row of Excel data and store in MongoDB
    // for (let row of data) {
    //   // const { 'Sr No.': srNo, Date, Name, Email, 'LBA Code': lbaCode, Plan, 'Plan MRP': planMRP, 'Plan Rate': planRate, 'Onboarding Status': onboardingStatus, 'Payment Status': paymentStatus, Coupon } = row;

    //   await File.create({
    //       uploadedDate: Date.now().toString(),
    //      data:row
    //   });
    // }

    res.send('Excel file uploaded and data stored successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading Excel file.');
  }
}

module.exports = { upload, uploadExcel };

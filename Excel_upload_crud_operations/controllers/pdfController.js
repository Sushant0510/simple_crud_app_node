// controllers/pdfController.js

const multer = require('multer');
const PDFParser = require('pdf-parse');
const File = require('../mongo/fileModel');

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function uploadPDF(req, res) {
  try {
    // Parse the uploaded PDF file
    const dataBuffer = req.file.buffer;
    const pdfText = await PDFParser(dataBuffer);
    const pdfContent = pdfText.text;

    // Store data in MongoDB
    await File.create({
      fileName: req.file.originalname,
      fileType: 'PDF',
      fileData: dataBuffer,
    });

    res.send('PDF file uploaded and data stored successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading PDF file.');
  }
}

module.exports = { upload,uploadPDF };

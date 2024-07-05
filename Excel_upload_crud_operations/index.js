// index.js

const express = require('express');
const mongoose = require('mongoose');
const { upload, uploadExcel } = require('./controllers/excelController');
const pdfController = require('./controllers/pdfController');
const File = require('./mongo/fileModel');
const XLSX = require('xlsx');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (adjust connection string as needed)
mongoose.connect('mongodb://localhost:27017/filesData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Node project');
});

// Routes for Excel and PDF file uploads
app.post('/uploadExcel', upload.single('file'), uploadExcel);
app.post('/uploadPDF', upload.single('file'),pdfController.uploadPDF);

// Endpoint to retrieve all files from MongoDB
app.get('/files/:id', async (req, res) => {
  try {
    // const files = await File.find({});

    console.log('Fetching file with Sr no:', req.params.id); // Log the file ID being fetched
    
    // const file = await File.findById(req.params.id);
    

    
    // const base64String = file.fileData.toString('base64');

    // console.log('Base64 String:', base64String);

    // const binaryData = Buffer.from(base64String, 'base64');

  // // Read the binary data using XLSX
  // const workbook = XLSX.read(file.fileData, { type: 'buffer' });
  
  // // Get the first sheet name
  // const sheetName = workbook.SheetNames[0];
  
  // // Get the worksheet
  // const worksheet = workbook.Sheets[sheetName];
  
  // // Convert worksheet to JSON
  // const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
  // return file;
    

  const result = await File.findOne({ SrNo: req.params.id });

    if (!result) {
      console.log(`No data found for Sr No. ${req.params.id}`);
      return null;
    }

    console.log('Found data:', result);
    // return result;
        res.json(result);

  }
  
  //   console.error('Error fetching data:', error);
  //   throw error; // Propagate the error up to the caller
  // }

  //   res.json(file);
  // } 
  catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving files.');
  }
});


// UPDATE file by Sr No.
app.put('/files/:id', async (req, res) => {
  try {
    const updatedData = req.body; // Assuming the request body contains updated data

    const result = await File.findOneAndUpdate({ SrNo: req.params.id }, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run validators to ensure updated data is valid
    });

    if (!result) {
      return res.status(404).json({ error: `No data found for Sr No. ${req.params.id}` });
    }

    console.log('Updated data:', result);
    return res.json(result);
  } catch (err) {
    console.error('Error updating data:', err);
    return res.status(500).send('Error updating file.');
  }
});

// DELETE file by Sr No.
app.delete('/files/:id', async (req, res) => {
  try {
    const result = await File.findOneAndDelete({ SrNo: req.params.id });

    if (!result) {
      return res.status(404).json({ error: `No data found for Sr No. ${req.params.id}` });
    }

    console.log('Deleted data:', result);
    return res.json({ message: `Deleted file with Sr No. ${req.params.id}` });
  } catch (err) {
    console.error('Error deleting data:', err);
    return res.status(500).send('Error deleting file.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

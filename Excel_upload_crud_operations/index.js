// index.js

const express = require("express");
const mongoose = require("mongoose");
const { upload, uploadExcel } = require("./controllers/excelController");
const pdfController = require("./controllers/pdfController");
const File = require("./mongo/fileModel");
// const XLSX = require('xlsx');
const router = require("./routes/ExcelData.route.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (adjust connection string as needed)
mongoose.connect("mongodb://localhost:27017/filesData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Node project");
});

// Routes for Excel and PDF file uploads
// app.post("/uploadExcel", upload.single("file"), uploadExcel);
// app.post("/uploadPDF", upload.single("file"), pdfController.uploadPDF);

app.use("/api/uploadExcel", router);

// Endpoint to retrieve all files from MongoDB
// app.get('/files/:id', );

// UPDATE file by Sr No.
// app.put('/files/:id', );

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

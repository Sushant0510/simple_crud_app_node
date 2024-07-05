// controllers/excelController.js

const multer = require("multer");
const XLSX = require("xlsx");
const File = require("../mongo/fileModel");

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getDataById = async (req, res) => {
  try {
    // const files = await File.find({});

    console.log("Fetching file with Sr no:", req.params.id); // Log the file ID being fetched

    const result = await File.findOne({ SrNo: req.params.id });

    if (!result) {
      console.log(`No data found for Sr No. ${req.params.id}`);
      return null;
    }

    console.log("Found data:", result);
    // return result;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving files.");
  }
};

const getData = async (req, res) => {
  try {
    const result = await File.find({});

    res.status.json(result);
  } catch (error) {
    res.status(500).json("no data found");
  }
};

const uploadExcel = async (req, res) => {
  try {
    // Parse the uploaded Excel file

    console.log("Files:", req.file); // Log the req.file object

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const base64String = req.file.buffer.toString("base64");
    console.log("Base64 String:", base64String);
    const binaryData = Buffer.from(base64String, "base64");
    const workbook = XLSX.read(binaryData, { type: "buffer" });
    // const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log("data", data);
    //  const fileDetails=data.toString;

    //Store each object from 'data' array individually
    for (let row of data) {
      const {
        "Sr No": srNo,
        Date,
        Name,
        Email,
        "LBA Code": lbaCode,
        Plan,
        "Plan MRP": planMRP,
        "Plan Rate": planRate,
        "Onboarding Status": onboardingStatus,
        "Payment Status": paymentStatus,
        Coupon,
      } = row;

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
        Coupon: Coupon,
      });
    }

    // res.send("Excel file uploaded and data stored successfully.");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading Excel file.");
  }
};

//update data
const updateData = async (req, res) => {
  try {
    const updatedData = req.body; // Assuming the request body contains updated data

    const result = await File.findOneAndUpdate(
      { SrNo: req.params.id },
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators to ensure updated data is valid
      }
    );

    if (!result) {
      return res
        .status(404)
        .json({ error: `No data found for Sr No. ${req.params.id}` });
    }

    console.log("Updated data:", result);
    return res.json(result);
  } catch (err) {
    console.error("Error updating data:", err);
    return res.status(500).send("Error updating file.");
  }
};

// DELETE file by Sr No.
const deleteData = async (req, res) => {
  try {
    const result = await File.findOneAndDelete({ SrNo: req.params.id });

    if (!result) {
      return res
        .status(404)
        .json({ error: `No data found for Sr No. ${req.params.id}` });
    }

    console.log("Deleted data:", result);
    return res.json({ message: `Deleted file with Sr No. ${req.params.id}` });
  } catch (err) {
    console.error("Error deleting data:", err);
    return res.status(500).send("Error deleting file.");
  }
};

module.exports = {
  upload,
  uploadExcel,
  updateData,
  deleteData,
  getDataById,
  getData,
};

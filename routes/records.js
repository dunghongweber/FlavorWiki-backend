const express = require("express");
const Record = require("../models/recordModel");

//get controller
const {
  getRecords,
  getRecordById,
  createRecord,
  deletRecord,
  updateRecord,
  deleteAll,
} = require("../controllers/recordController");

const router = express.Router();

//get all records
router.get("/", getRecords);

//get record by id
router.get("/:id", getRecordById);

//create a new record
router.post("/create", createRecord);

//update record by id
router.patch("/:id", updateRecord);

//delete record by id
router.delete("/:id", deletRecord);

//delete record by ids list
router.delete("/", deleteAll);

module.exports = router;

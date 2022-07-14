const Record = require("../models/recordModel");
const mongoose = require("mongoose");

/**
 * Get all records from database
 * @param {HTTP GET} req
 * @param {JSON} res
 */
const getRecords = async (req, res) => {
  const records = await Record.find({});

  //error if get no data
  if (!records) {
    return res.status(404).json({ err: "Couldn't find any data!" });
  }

  res.status(200).json(records);
};

/**
 * get a single record by provided ID
 * @param {HTTP GET} req
 * @param {JSON} res
 */
const getRecordById = async (req, res) => {
  const { id } = req.params;

  //use mongoose to check if id is valid mongodb id type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Wrong ID format. Record not found" });
  }

  const singleRecord = await Record.findById(id);

  //error if cannot find a record
  if (!singleRecord) {
    return res.status(404).json({ err: "Record not found" });
  }

  res.status(200).json(singleRecord);
};

/**
 * Create a new record, if successful then return the newly created record as json
 * @param {HTTP POST} req
 * @param {JSON} res
 */
const createRecord = async (req, res) => {
  const { name, email, phone } = req.body;

  //add record to db
  try {
    const newRecord = await Record.create({ ...req.body });
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

/**
 * delete a record by ID
 * @param {HTTP DELETE} req
 * @param {JSON} res
 */
const deletRecord = async (req, res) => {
  const { id } = req.params;

  //if ID is wrong format, return err message
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Wrong ID Format. Record not found." });
  }

  const deleteRecord = await Record.findOneAndDelete({ _id: id });

  //if no record get deleted
  if (!deleteRecord) {
    return res.status(400).json({ err: "No such record" });
  }

  res.status(200).json(deleteRecord);
};

/**
 * Update an existing record by ID
 * @param {HTTP PATCH} req
 * @param {JSON} res
 */
const updateRecord = async (req, res) => {
  const { id } = req.params; //get id from url parameters

  //if ID is wrong format, return err message
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Wrong ID Format. Record not found." });
  }

  const updateRecord = await Record.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  //if error, return err message
  if (!updateRecord) {
    return res.status(400).json({ err: "No such record" });
  }

  //this only return the record we found, not the updated record
  res.status(200).json(updateRecord);
};

/**
 * Delete Selected Records
 * @param {HTTP DELETE} req
 * @param {msg} res
 */
const deleteAll = async (req, res) => {
  const { deleteIDs } = req.body;

  deleteIDs.forEach((element) => {
    //if ID is wrong format, return err message
    if (!mongoose.Types.ObjectId.isValid(element)) {
      return res
        .status(404)
        .json({ err: "Wrong ID Format. Cannot perform delete." });
    }
  });

  const deleteRecords = await Record.deleteMany({ _id: { $in: deleteIDs } });

  if (!deleteRecords) {
    return res.status(400).json({ err: "Cannot perform delete" });
  }

  res.status(200).json({ msg: deleteIDs });
};

module.exports = {
  getRecords,
  getRecordById,
  createRecord,
  deletRecord,
  updateRecord,
  deleteAll,
};

var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/create-abl");
const GetAbl = require("../abl/get-abl");
const ListAll = require("../abl/list-all-abl");
const DeleteAbl = require("../abl/delete-abl");
const UpdateAbl = require("../abl//update-abl");
const ArchiveAbl = require("../abl/archive-abl");
const UnarchiveAbl = require("../abl/unarchive-abl");
const AddMemberAbl = require("../abl/add-member-abl");
const RemoveMemberAbl = require("../abl/remove-member-abl");
const AddItemAbl = require("../abl/add-item-abl");
const RemoveItemAbl = require("../abl/remove-item-abl");
const CheckItemAbl = require("../abl/check-item-abl");

// get shopping list by its ID
router.get("/get/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetAbl(req, res);
});

// returns a list of all shopping lists
router.get("/list", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ListAll(req, res);
});


//create a new shopping lists
router.post("/create", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CreateAbl(req, res);
});

//archive a shopping lists
router.post("/archive/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ArchiveAbl(req, res);
});

//unarchive a shopping lists
router.post("/unarchive/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  UnarchiveAbl(req, res);
});

//add item to a shopping lists
router.post("/addItem/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  AddItemAbl(req, res);
});

//check item in a shopping lists
router.post("/checkItem/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CheckItemAbl(req, res);
});

//remove item from a shopping lists
router.post("/removeItem/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  RemoveItemAbl(req, res);
});

// add member to a shopping lists
router.post("/addMember/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  AddMemberAbl(req, res);
});

// remove member from a shopping lists
router.post("/removeMember/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  RemoveMemberAbl(req, res);
});

//update a certain shopping lists by its ID
router.put("/update/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  UpdateAbl(req, res);
});


//delete a certain shopping lists by its ID
router.delete("/delete/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;

const express = require("express");
const app = express();

const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

let dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

function UpdateAbl(req, res) {
  const id = req.params.id;

  let body = req.body;

  let updatedFields = {
    name: body.name,
    owner: body.owner,
    members: body.members || [],
    items: body.items || [],
    isArchived: body.isArchived || false,
  };

  const shoppingList = dao.get(id);

  if (shoppingList) {
    dao.update(id, updatedFields);
    const successMessage = `Shopping list "${shoppingList.name}" has been successfully updated.`;
    res.json({ success: true, message: successMessage, shoppingList: updatedFields });
  } else {
    res.status(400).json({ error: "Shopping list does not exist" });
  }
}

module.exports = UpdateAbl;

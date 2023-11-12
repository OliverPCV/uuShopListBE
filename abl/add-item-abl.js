const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const shoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let dao = new shoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

// Add Item ABL (AddItemAbl.js):
function AddItemAbl(req, res) {
  const { id } = req.params;
  const { itemName, isCompleted } = req.body;

  if (!itemName) {
    return res
      .status(400)
      .json({ error: "Invalid input: itemName parameter is missing." });
  }

  try {
    const shoppingList = dao.get(id);

    if (!shoppingList) {
      return res.status(404).json({ error: "ShoppingList not found." });
    }

    // Check if the item is already in the list
    if (shoppingList.items.some(existingItem => existingItem.name === itemName)) {
      return res.status(400).json({ error: "Item already exists." });
    }

    const newItem = {
      name: itemName,
      isCompleted: isCompleted || false, // Default to false if not provided
    };

    shoppingList.items.push(newItem);
    dao.update(id, { items: shoppingList.items });

    const successMessage = `Item "${newItem.name}" has been successfully added to the shopping list.`;
    res.send({ success: true, message: successMessage, item: newItem, shoppingList });
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }
}

module.exports = AddItemAbl;

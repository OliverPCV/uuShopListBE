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

function RemoveItemAbl(req, res) {
  const { id } = req.params;
  const { itemName } = req.body;

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

    // Check if the item is in the list before removing
    const existingItem = shoppingList.items.find(
      (item) => item.name === itemName
    );
    if (!existingItem) {
      return res.status(400).json({ error: "Item not found." });
    }

    shoppingList.items = shoppingList.items.filter(
      (item) => item.name !== itemName
    );

    dao.update(id, { items: shoppingList.items });

    const successMessage = `Item "${existingItem.name}" has been successfully removed from the shopping list.`;
    res.send({
      success: true,
      message: successMessage,
      removedItem: existingItem,
      shoppingList,
    });
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }
}

module.exports = RemoveItemAbl;
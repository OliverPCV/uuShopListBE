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

// Create ABL (CreateAbl.js):
function CreateAbl(req, res) {
  let body = req.body;

  if (!body.name) {
    return res
      .status(400)
      .json({ error: "Invalid input: name parameter is missing." });
  }

  let shoppingList = {
    name: body.name,
    owner: body.owner,
    members: [],
    items: [],
    isArchived: false
  };

  const shoppingLists = dao._listAll();
  const duplicate = shoppingLists.find(
    (existingShoppingList) =>
      existingShoppingList.name === shoppingList.name &&
      JSON.stringify(existingShoppingList.items) ===
        JSON.stringify(shoppingList.items)
  );

  if (duplicate) {
    res.status(400);
    return res.json({ error: "ShoppingList already exists." });
  }

  try {
    shoppingList = dao.create(shoppingList);
    const successMessage = `Shopping list "${shoppingList.name}" has been successfully created.`;
    res.send({ success: true, message: successMessage, shoppingList });
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }
}

module.exports = CreateAbl;

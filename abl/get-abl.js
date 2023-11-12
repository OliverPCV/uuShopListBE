const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

let dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);


function GetAbl(req, res) {
  const shoppingList = dao.get(req.params.id);
  if (shoppingList) {
    res.json(shoppingList);
  } else {
    res.status(400).json({ error: "shoppingList does not exist" });
  }
}

module.exports = GetAbl;

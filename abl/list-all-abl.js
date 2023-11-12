const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

let dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

function ListAllAbl(req, res) {
  const shoppingList = dao.list();

  res.json(shoppingList);
}

module.exports = ListAllAbl;

const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");
let dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

function DeleteAbl(req, res) {
  const shoppingList = dao.get(req.params.id);

  const updatedObject = { ...shoppingList, ...req.params };
  if (shoppingList) {
    dao.delete(shoppingList);
  } else {
    res.status(400).json({ error: "ShoppingList does not exist" });
  }

  res.json(`ShoppingList with id ${req.params.id} has been deleted`);
}
module.exports = DeleteAbl;

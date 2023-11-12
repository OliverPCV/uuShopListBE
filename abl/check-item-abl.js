const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

const dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

function CheckItemAbl(req, res) {
  const { id } = req.params;
  const { itemName } = req.body;

  if (!itemName) {
    return res
      .status(400)
      .json({ error: "Invalid input: itemName parameter is missing." });
  }

  try {
    const shoppingList = dao.get(id);

    if (shoppingList) {
      const updatedItems = shoppingList.items.map((item) => {
        if (item.name === itemName) {
          return { ...item, isCompleted: !item.isCompleted }; // Toggle between true and false
        }
        return item;
      });

      dao.update(id, { items: updatedItems });

      const successMessage = `Item "${itemName}" in shopping list "${shoppingList.name}" has been successfully checked/unchecked.`;
      res.json({
        success: true,
        message: successMessage,
        shoppingList: { ...shoppingList, items: updatedItems },
      });
    } else {
      res.status(400).json({ error: "Shopping list does not exist." });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = CheckItemAbl;

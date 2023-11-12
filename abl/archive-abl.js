const ShoppingListDao = require("../dao/shoppingList-dao");
const path = require("path");

const dao = new ShoppingListDao(
  path.join(__dirname, "..", "storage", "shoppingLists.json")
);

function ArchiveAbl(req, res) {
  const id = req.params.id;

  try {
    const shoppingList = dao.get(id);

    if (shoppingList) {
      if (!shoppingList.isArchived) {
        dao.update(id, { isArchived: true });
        const successMessage = `Shopping list "${shoppingList.name}" has been successfully archived.`;
        res.json({
          success: true,
          message: successMessage,
          shoppingList: { ...shoppingList, isArchived: true },
        });
      } else {
        res.status(400).json({ error: "Shopping list is already archived." });
      }
    } else {
      res.status(400).json({ error: "Shopping list does not exist." });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = ArchiveAbl;

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

// Remove Member ABL (RemoveMemberAbl.js):
function RemoveMemberAbl(req, res) {
  const { id } = req.params;
  const { member } = req.body;

  if (!member) {
    return res
      .status(400)
      .json({ error: "Invalid input: member parameter is missing." });
  }

  try {
    const shoppingList = dao.get(id);

    if (!shoppingList) {
      return res.status(404).json({ error: "ShoppingList not found." });
    }

    // Check if the member is in the list before removing
    if (!shoppingList.members.includes(member)) {
      return res.status(400).json({ error: "Member not found." });
    }

    shoppingList.members = shoppingList.members.filter(
      (existingMember) => existingMember !== member
    );

    dao.update(id, { members: shoppingList.members });

    const successMessage = `Member "${member}" has been successfully removed from the shopping list.`;
    res.send({ success: true, message: successMessage, shoppingList });
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }
}

module.exports = RemoveMemberAbl;

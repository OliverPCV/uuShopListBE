function checkOwner(req, res, next) {
  const userName = req.user.name; // Assuming user name is stored in the request object
  const shoppingListId = req.params.id; // Assuming shopping list ID is in the route parameters

  const shoppingList = dao.get(shoppingListId);

  if (shoppingList && shoppingList.owner === userName) {
    // User is the owner, allow the action
    next();
  } else {
    // User is not the owner, deny access
    res
      .status(403)
      .json({ error: "Permission denied. User is not the owner." });
  }
}

function checkMember(req, res, next) {
  const userName = req.user.name;
  const shoppingListId = req.params.id;

  const shoppingList = dao.get(shoppingListId);

  if (shoppingList && shoppingList.members.includes(userName)) {
    // User is a member, allow the action
    next();
  } else {
    // User is not a member, deny access
    res.status(403).json({ error: "Permission denied. User is not a member." });
  }
}

module.exports = { checkOwner, checkMember };

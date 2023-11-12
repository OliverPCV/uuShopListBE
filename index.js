const ShoppingListController = require("./controllers/shoppingList");
const GetAllShoppingListsAbl = require("./abl//list-all-abl");
var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//default port
const port = 8000;

// controllers
app.use("/shoppingList", ShoppingListController);


app.listen(port);

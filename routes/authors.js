const express = require("express");
const router = express.Router();

const Author = require("../models/author");

// All Authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// New Author Form
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author
router.post("/", async (req, res) => {
  const { name } = req.body;
  const author = new Author({
    name,
  });
  try {
    await author.save();
    // res.redirect(`authors/${author.id}`)
    res.redirect(`authors`);
  } catch {
    const errorMessage = "Error creating new author";
    res.render("authors/new", {
      author,
      errorMessage,
    });
  }
});
module.exports = router;

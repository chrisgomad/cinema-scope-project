const { Item } = require("../models");
const express = require("express");
const router = express.Router();

// Alex - get all items (use http://localhost:3000/api/items to test)
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    if (!items) {
      throw new Error('no items found');
    }
    res.json(items);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      throw new Error('no item found');
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    if (!newItem) {
      throw new Error('New item not created');
    }
    res.json(newItem);
  } catch (error) {
    next(error);
  }
});
// Alex - corrected some code to use the correct status code
router.delete("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      throw new Error('Item not found');
    }
    await item.destroy();
    res.status(204).send(); // Use 204 to indicate success with no content to send back
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      throw new Error('Item not found');
    }
    const updateItem = await item.update(req.body);
    res.json(updateItem);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
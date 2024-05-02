const express = require('express');
const router = express.Router();
const { Order } = require('../models');

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving orders.' });
  }
});

// Route to get one order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the order.' });
  }
});

module.exports = router;

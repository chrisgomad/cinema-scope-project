//MichaelH - GET Routes to get a single user & all users

const express = require('express');
const router = express.Router();
const { User } = require('../models')

// Route to get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving users.' });
    }
  });
  
  // Route to get one user
  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving the user.' });
    }
  });
  
  module.exports = router;
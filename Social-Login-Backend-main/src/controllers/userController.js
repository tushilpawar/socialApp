const User  = require('../models/userModel'); // Assuming 'User' is the Sequelize model
const hashPassword = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

const userController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, mobileNumber, password } = req.body;
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        firstName,
        lastName,
        mobileNumber,
        password: hashedPassword,
        createdBy: 'system',
        updatedBy: 'system'
      });
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { mobileNumber, password } = req.body;
      const user = await User.findOne({ where: { mobileNumber } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid mobile number or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid mobile number or password' });
      }
      const token = generateToken(user.id);
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ where: { mobileNumber: req.params.mobileNumber } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { first_name, last_name, mobile_number } = req.body;
      const [updated] = await User.update(
        {
          firstName:first_name,
          lastName: last_name,
          mobileNumber: mobile_number,
          updatedBy: 'system'
        },
        {
          where: { id: req.params.id }
        }
      );
      if (!updated) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully', response: {
        firstName:first_name,
          lastName: last_name,
          mobileNumber: mobile_number,
      } });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  }
};

module.exports = userController;

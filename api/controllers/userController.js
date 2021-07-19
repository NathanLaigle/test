const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/User');

exports.get = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next({ message: 'Could not find users', error: error });
  }
};

exports.post = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    next({ message: 'Invalid data', error: error });
  }
  try {
    const userId = await bcrypt.hash(req.body.email, 10);
    const userPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      id: userId,
      email: req.body.email,
      password: userPassword,
    });
    res.json({
      message: 'User created',
      user: user,
    });
  } catch (error) {
    next({ error: error });
  }
};

exports.delete = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    next({ message: 'Invalid data', error: error });
  }
  try {
    await User.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    next({ error: error });
  }
};

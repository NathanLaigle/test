const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/User');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @description get all users
 */
exports.get = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    res.json(users);
  } catch (error) {
    next({ message: 'Could not find users', error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @description Create a user
 */
exports.post = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    next({ message: 'Invalid data', error: error });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      pseudo: req.body.pseudo,
      password: hashedPassword,
    });
    user.password = '***';
    res.json({
      message: 'User created',
      user: user,
    });
  } catch (error) {
    next({ error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @description Delete a user
 */
exports.delete = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    next({ message: 'Invalid data', error: error });
  }
  try {
    await User.destroy({
      where: {
        email: req.body.email,
      },
    });
    res.json({ message: 'User deleted' });
  } catch (error) {
    next({ error: error });
  }
};

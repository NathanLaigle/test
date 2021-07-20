const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const { secret } = require('../utils/auth');
const User = require('../models/User');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @description return a jwt token
 */
module.exports = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next({ message: 'Invalid Data', error: error });
  }
  try {
    const user = await User.findByPk(req.body.email);
    if (!user) {
      return next({
        message: 'Could not login',
        error: 'Could not find a user with the email ' + req.body.email + '',
      });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return next({
        message: 'Could not login',
        error: 'Password given is invalid',
      });
    }
    const token = jwt.sign({ email: user.email, pseudo: user.pseudo }, secret);
    res.json({
      email: user.email,
      token: token,
    });
  } catch (error) {
    next({ error: error });
  }
};

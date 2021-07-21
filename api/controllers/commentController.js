const { validationResult } = require('express-validator');

const Comment = require('../models/Comment');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @description get all comments
 */
exports.get = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    next({
      message: 'Could not find comments',
      error: error,
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @description get all comments related to an app
 */
exports.getAppComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        AppId: req.params.AppId,
      },
    });
    res.json(comments);
  } catch (error) {
    next({
      message: 'Could not find comments',
      error: error,
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next({
        message: 'Could not post a comment',
        error: error,
      });
    }
    const comment = await Comment.create({
      rating: req.body.rating,
      title: req.body.title || null,
      content: req.body.content || null,
      UserEmail: req.userEmail,
      AppId: req.body.AppId,
    });
    res.json({
      message: 'Comment posted',
      comment: comment,
    });
  } catch (error) {
    next({
      message: 'Could not post a comment',
      error: error,
    });
  }
};

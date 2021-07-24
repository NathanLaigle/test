const jwt = require('jsonwebtoken');

exports.secret = 'jeSuisUneSuperClefSecrete$%45';

exports.isAuth = (req, res, next) => {
  if (!req.get('Authorization')) {
    res.json({
      message: 'Authentication failed',
      error:
        'No token found in the Authorisation header. Must be of type : Bearer {{token}}',
    });
  }
  const token = req.get('Authorization').split(' ')[1];
  try {
    const decodedToken = jwt.decode(token, this.secret);
    if (!decodedToken) {
      throw new Error();
    }
    req.userEmail = decodedToken.email;
    next();
  } catch (error) {
    res.json({
      message: 'Authentication failed',
      error: 'Invalid token',
    });
  }
};

exports.isAllowedPost = (req, res, next) => {
  if (req.userEmail != req.body.email) {
    res.json({
      message: 'Authorisation denied',
      error:
        'You are not authorised to make this request. You are probably trying to update or delete content that you do not own.',
    });
  }
  next();
};

exports.isAllowedGet = (req, res, next) => {
  if (req.userEmail != req.params.email) {
    res.json({
      message: 'Authorisation denied',
      error:
        'You are not authorised to make this request. You are probably trying to update or delete content that you do not own.',
    });
  }
  next();
};

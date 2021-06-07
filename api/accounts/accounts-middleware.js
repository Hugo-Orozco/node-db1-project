const accounts = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { body } = req;
  if (Object.keys(body).length === 0 || body.name === undefined || body.budget === undefined) {
    return next({ status: 400, message: 'name and budget are required' });
  }
  else {
    if (typeof body.name !== 'string') {
      return next({ status: 400, message: 'name of account must be a string' });
    }
    body.name = body.name.trim();
    if (body.name.length < 3 || body.name.length > 100) {
      return next({ status: 400, message: 'name of account must be between 3 and 100' });
    }
    if (typeof body.budget !== 'number') {
      return next({ status: 400, message: 'budget of account must be a number' });
    }
    // body.budget = Number(body.budget);
    if (body.budget < 0 || body.budget > 1000000) {
      return next({ status: 400, message: 'budget of account is too large or too small' });
    }
    req.body = body;
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { body } = req;
  return db('accounts')
    .where({ name: body.name })
    .first()
    .then(data => {
      if (data) {
        next({ status: 400, message: 'that name is taken' });
      }
      else {
        req.body = body;
        next();
      }
    });
};

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  accounts.getById(id)
    .then(data => {
      if (!data) {
        next({ status: 404, message: 'account not found' });
      }
      else {
        req.account = data;
        next();
      }
    })
    .catch(err => {
      next(err);
    });
};

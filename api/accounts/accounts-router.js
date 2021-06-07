const router = require('express').Router();

const accounts = require('./accounts-model');

const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  accounts.getAll()
    .then(data => {
      res.json(data);
    });
});

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { account } = req;
  res.json(account);
});

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const { body } = req;
  accounts.create(body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const { body } = req;
  accounts.updateById(id, body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  accounts.deleteById(id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;

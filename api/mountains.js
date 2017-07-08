const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validMountain(mountain) {
  const hasTitle = typeof mountain.title == 'string' && mountain.title.trim() != '';
  const hasRange = typeof mountain.range == 'string' && mountain.range.trim() != '';
  const hasRating = !isNaN(mountain.rating);
  const hasElevation = !isNaN(mountain.elevation);
  return hasTitle && hasElevation && hasRange && hasRating;
}

router.get('/', (req, res) => {
  queries.getAll().then(mountains => {
    res.json(mountains);
  });
});

router.get('/:id', isValidId, (req, res) =>{
  queries.getOne(req.params.id).then(mountain => {
    if(mountain) {
      res.json(mountain);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if(validMountain(req.body)) {
    queries.create(req.body).then(mountains => {
      res.json(mountains[0]);
    });
  } else {
    next(new Error('Invalid mountain'));
  }
});

router.put('/:id', (req, res, next) => {
  if(validMountain(req.body)) {
    queries.update(req.params.id, req.body).then(mountains => {
      res.json(mountains[0]);
    });
  } else {
    next(new Error('Invalid mountain'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;

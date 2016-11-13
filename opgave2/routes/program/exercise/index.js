var router = require('express').Router();
var Exercise = require('../../../models/exercise');
var isAuthenticated = require('../../../utils/is_authenticated');

router.get('/:id', isAuthenticated, (req, res) => {
  const exerciseId = req.params.id;

  Exercise.findOne({_id: exerciseId}, (error, exercise) => {
    if (exercise === null) {
      res.status(404).send({error: {status: 404, message: 'Not found'}});
      return;
    }

    res.send({exercise});
  });
});


module.exports = router;

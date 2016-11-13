var router = require('express').Router({mergeParams: true});
var Exercise = require('../../../models/exercise');
var isAuthenticated = require('../../../utils/is_authenticated');

router.get('/', isAuthenticated, (req, res) => {
  var programId = req.params.programId;
  Exercise.find({program_id: programId}, (err, exercises) => {
    res.send({exercises: exercises});
  });
});

// Create
router.post('/', isAuthenticated, (req, res) => {
  var name = req.body.name;
  var description = req.body.description;
  var sets = req.body.sets;
  var repetition = req.body.repetition;

  if (!name || !sets || !repetition) {
    res.status(422).send({error: {status: 422, message: 'Missing params'}});
    return;
  }

  var exercise = new Exercise();
  exercise.program_id = req.params.programId;

  exercise.name = req.body.name || exercise.name;
  exercise.description = req.body.description || exercise.description;
  exercise.sets = req.body.sets || exercise.sets;
  exercise.repetition = req.body.repetition || exercise.repetition;
  exercise.done = req.body.done || exercise.done;

  exercise.save(() => {
    res.send({exercise: exercise});
  });
});

// Read
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

// Update
router.patch('/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;

  Exercise.findOne({_id: id}, (error, exercise) => {

    if (exercise === null) {
      res.status(404).send({error: {status: 404, message: 'Not found'}});
      return;
    }

    exercise.name = req.body.name || exercise.name;
    exercise.description = req.body.description || exercise.description;
    exercise.sets = req.body.sets || exercise.sets;
    exercise.repetition = req.body.repetition || exercise.repetition;
    exercise.done = req.body.done || exercise.done;

    exercise.save(() => {
      res.send(exercise);
    });
  });
});

// Delete
router.delete('/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  Exercise.findOne({_id: id}).remove().exec();
  res.status(204).send("No Content");
});

module.exports = router;

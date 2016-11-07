var Program = require('../../models/program');
var Exercise = require('../../models/exercise');
var router = require('express').Router({mergeParams: true});

router.post('/new', (req, res) => {
  const programId = req.params.id;

  var exercise = new Exercise();
  exercise.program_id = programId;
  exercise.name = req.body.name;
  exercise.description = req.body.description;
  exercise.sets = req.body.sets;
  exercise.repetition = req.body.repetition;

  console.log(exercise);

  exercise.save((err, item) => {
    console.log(err);
    res.redirect('/program/' + programId);
  });
});

router.post('/:exerciseId/delete', (req, res) => {
  const exerciseId = req.params.exerciseId;
  const programId = req.params.id;

  Exercise
    .find({_id: exerciseId}).remove().exec();

  res.redirect('/program/' + programId);
});

router.get('/:exerciseId/markAsDone', (req, res) => {
  const exerciseId = req.params.exerciseId;
  const programId = req.params.id;

  Exercise.findOne({_id: exerciseId}, (error, exercise) => {
    exercise.done = true;
    exercise.save(() => {
      res.redirect('/program/' + programId);
    });
  });
});

module.exports = router;

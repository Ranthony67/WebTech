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
  const exercise_id = req.params.exerciseId;
  const program_id = req.params.id;

  Exercise
    .find({_id: exercise_id}).remove().exec();

  res.redirect('/program/' + program_id);
});

router.get('/:exerciseId/markAsDone', (req, res) => {
  const exercise_id = req.params.exerciseId;
  const program_id = req.params.id;

  Exercise.findOne({_id: exercise_id}, (error, exercise) => {
    exercise.done = true;
    exercise.save(() => {
      res.redirect('/program/' + program_id);
    });
  });
});

module.exports = router;

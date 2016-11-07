var Program = require('../../models/program');
var Exercise = require('../../models/exercise');
var router = require('express').Router({ mergeParams: true });

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


module.exports = router;

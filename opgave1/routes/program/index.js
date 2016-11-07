var Program = require('../../models/program');
var Exercise = require('../../models/exercise');
var router = require('express').Router();

router.post('/', function (req, res) {
  new Program().save((err, item) => {

    var exercise = new Exercise();
    exercise.program_id = item._id;

    exercise.save();

    res.redirect('/program/' + item._id);
  });
});

router.get('/:id', function (req, res) {
  const program_id = req.params.id;

  Program
    .findOne({_id: program_id}, (error, program)=> {
      Exercise.find({program_id: program_id}, (err, exercises) => {
        console.log("[Program] Found " + exercises.length + " exercises");
        res.render('program/show', {program, exercises});
      });
    });
});


module.exports = router;

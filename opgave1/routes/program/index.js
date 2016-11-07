var Program = require('../../models/program');
var Exercise = require('../../models/exercise');
var router = require('express').Router();

// Makes nested routes possible
router.use('/:id/exercise', require('../exercise'));

router.post('/', function (req, res) {
  new Program().save((err, item) => {
    res.redirect('/program/' + item._id);
  });
});

router.get('/:id', function (req, res) {
  const program_id = req.params.id;

  Program
    .findOne({_id: program_id}, (error, program) => {
      Exercise.find({program_id: program_id}, (err, exercises) => {
        res.render('program/show', {program, exercises});
      });
    });
});

router.get('/:id/markAsDone', (req, res) => {
  const programId = req.params.id;

  Program.findOne({_id: programId}, (error, program) => {
    program.done = true;
    program.save(() => {
      res.redirect('/');
    });
  });
});


router.post('/:id/delete', (req, res) => {
  const programId = req.params.id;

  Program
    .findOne({_id: programId}, (error, program)=> {
      Exercise
        .find({program_id: programId}).remove().exec();
    }).remove().exec();
  res.redirect('/');
});

module.exports = router;

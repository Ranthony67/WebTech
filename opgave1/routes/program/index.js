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


router.post('/:id/delete', (req, res) => {
  const program_id = req.params.id;

  Program
    .findOne({_id: program_id}, (error, program)=> {
      Exercise
        .find({program_id: program_id}).remove().exec();
    }).remove().exec();
  res.redirect('/');
});

module.exports = router;

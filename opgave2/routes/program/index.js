var router = require('express').Router();
var Program = require('../../models/program');
var isAuthenticated = require('../../utils/is_authenticated');

router.use('/:programId/exercises', require('./exercise'));

router.post('/', isAuthenticated, (req, res) => {
  var program = new Program();
  program.done = false;

  program.save((error, program) => {
    res.send({program: program});
  });
});

router.get('/', isAuthenticated, (req, res) => {
  Program.find({}, (err, programs) => {
    res.send({programs: programs});
  });
});

router.get('/:id', isAuthenticated, (req, res) => {
  const programId = req.params.id;

  Program.findOne({_id: programId}, (error, program) => {
    if (program === null) {
      res.status(404).send({error: {status: 404, message: 'Not found'}});
      return;
    }

    res.send({program: program});
  });
});

router.put('/:id', isAuthenticated, (req, res) => {
  const programId = req.params.id;

  Program.findOne({_id: programId}, (error, item) => {

    if (item === null) {
      res.status(404).send({error: {status: 404, message: 'Not found'}});
      return;
    }

    item.done = req.body.done;

    item.save().exec();
    res.send(item);
  });
});

router.delete('/:id', isAuthenticated, (req, res) => {
  const programId = req.params.id;
  Program.findOne({_id: programId}).remove().exec();
  res.status(204).send("No Content");
});

module.exports = router;

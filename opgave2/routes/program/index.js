var router = require('express').Router();
var Program = require('../../models/program');
var isAuthenticated = require('../../utils/is_authenticated');

router.use('/:id/exercises', require('./exercise'));

router.post('/', isAuthenticated, function (req, res) {
  new Program().save((error, item) => {
    res.send({id: item._id});
  });
});

router.get('/', isAuthenticated, function (req, res) {
  Program.find({}, (err, programs) => {
    res.send({programs: programs});
  });
});

router.get('/:id', isAuthenticated, (req, res) => {
  const programId = req.params.id;

  Program.findOne({_id: programId}, (error, item) => {
    if (item === null) {
      res.status(404).send({error: {status: 404, message: 'Not found'}});
      return;
    }

    res.send({item});
  });
});

router.put('/:id', isAuthenticated, function (req, res) {
  const programId = req.params.id;

  Program.findOne({_id: programId}, (error, item)=> {

    if (item === null) {
      res.status(404).send({error: {status: 404, message: 'Not found'}});
      return;
    }

    item.done = req.body.done;

    item.save().exec();
    res.send(item);
  });
});

router.post('/:id/delete', isAuthenticated, function (req, res) {
  const programId = req.params.id;
  Program.findOne({_id: programId}).remove().exec();
  res.status(204).send("No Content");
});

module.exports = router;

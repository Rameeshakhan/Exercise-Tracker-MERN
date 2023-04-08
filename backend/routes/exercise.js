const router = require('express').Router();
const { Error } = require('mongoose');
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) =>{
    Exercise.find() // mongoose command
     .then(exercises => res.json(exercises))
     .catch(err => res.status(400).json("Error: " +err));
});

router.route("/add").post((req, res) =>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
     .then(() => res.json("Exercise Added"))
     .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').get((req,res) =>{ // object id by mongo db 
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req,res) =>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise Deleted. "))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration= req.body.duration;
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json("Exercise Updated! "))
        .catch(err => res.status(400).json("Error: " + Error))
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
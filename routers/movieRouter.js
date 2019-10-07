var Actor = require("../models/actor");
var Movie = require("../models/movie");
const mongoose = require("mongoose");
module.exports = {
  getAll: function(req, res) {
    Movie.find()
      .populate("actors")
      .exec((err, docs) => {
        if (err) return res.status(400).json(err);
        res.json(docs);
      });
  },
  createOne: function(req, res) {
    let newMovieDetails = req.body;
    newMovieDetails._id = new mongoose.Types.ObjectId();
    Movie.create(newMovieDetails, function(err, movie) {
      if (err) return res.status(400).json(err);
      res.json(movie);
    });
  },
  getOne: function(req, res) {
    Movie.findOne({ _id: req.params.id })
      .populate("actors")
      .exec(function(err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        res.json(movie);
      });
  },
  updateOne: function(req, res) {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function(
      err,
      movie
    ) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();
      res.json(movie);
    });
  },
  deleteOnebyID: (req, res) => {
    Movie.findByIdAndDelete({ _id: req.params.id }, req.body, (err, movie) => {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();
      res.json(movie);
    });
  },
  addActor: function(req, res) {
    //find an actor with the id passed by the user. the actorID must be in the url and sent via a GET request
    Movie.findOne({ _id: req.params.id }, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();
      //if doc is found, then get the movie id from the request body and find the movie with the id
      Actor.findOne({ _id: req.body.id }, function(err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        //once movie is found, add it to the actor's movie list
        movie.actors.push(actor._id);
        movie.save(function(err) {
          if (err) return res.status(500).json(err);
          res.json(movie);
        });
      });
    });
  },
  deleteActorById: (req, res) => {
    Movie.updateOne(
      { _id: req.params.id, actors: { $in: req.params.actorId } },
      { $pull: { actors: req.params.actorId } },
      (err, movie) => {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        console.log(movie);
        res.status(200).json(movie);
      }
    );
  },
  getMoviesInYears: (req, res) => {
    Movie.find(
      { year: { $lte: req.params.year2, $gte: req.params.year1 } },
      (err, docs) => {
        if (err) return res.status(400).json(err);
        if (!docs) return res.status(404).json();
        console.log(docs);
        res.status(200).json(docs);
      }
    );
  },
  deleteMovieBeforeYear: (req, res) => {
    Movie.deleteMany({ year: { $lte: req.params.aYear } }, (err, docs) => {
      if (err) return res.status(400).json(err);
      if (!docs) return res.status(404).json();
      console.log(docs);
      res.status(200).json(docs);
    });
  }
};

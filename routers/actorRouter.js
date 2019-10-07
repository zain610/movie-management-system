const mongoose = require("mongoose");
const Actor = require("../models/actor");
const Movie = require("../models/movie");

module.exports = {
  getAll: (req, res) => {
    Actor.find()
      .populate("movies")
      .exec((err, docs) => {
        if (err) {
          return res.json(err);
        } else {
          res.json(docs);
        }
      });
  },
  createOne: function(req, res) {
    let newActorDetails = req.body;
    newActorDetails._id = new mongoose.Types.ObjectId();
    Actor.create(newActorDetails, function(err, actor) {
      if (err) return res.json(err);
      res.json(actor);
    });
  },
  getOne: function(req, res) {
    Actor.findOne({ _id: req.params.id })
      //populate replaces the ID in the array with movie object of that id.
      .populate("movies")
      .exec(function(err, actor) {
        if (err) return res.json(err);
        if (!actor) return res.json();
        res.json(actor);
      });
  },
  updateOne: function(req, res) {
    Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function(
      err,
      actor
    ) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      res.json(actor);
    });
  },
  deleteOne: function(req, res) {
    Actor.findOneAndRemove({ _id: req.params.id }, function(err) {
      if (err) return res.status(400).json(err);
      res.json();
    });
  },
  addMovie: function(req, res) {
    //find an actor with the id passed by the user. the actorID must be in the url and sent via a GET request
    Actor.findOne({ _id: req.params.id }, function(err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      //if actor is found, then get the movie id from the request body and find the movie with the id
      Movie.findOne({ _id: req.body.id }, function(err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        //once movie is found, add it to the actor's movie list
        actor.movies.push(movie._id);
        actor.save(function(err) {
          if (err) return res.status(500).json(err);
          res.json(actor);
        });
      });
    });
  },
  deleteActorAndMovies: (req, res) => {
    Actor.findOneAndDelete({ _id: req.params.id }, (err, actor) => {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
      //actor is found and then delete all movies the actor is in.
      Movie.deleteMany({ _id: { $in: actor.movies } }, (err, result) => {
        if (err) return res.status(400).json(err);
        console.log(result);
        res.status(200).json(result);
      });
    });
  },
  deleteMovieById: (req, res) => {
    Actor.updateOne(
      { _id: req.params.id, movies: { $in: req.params.movieId } },
      { $pull: { movies: req.params.movieId } },
      (err, actor) => {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();
        console.log(actor);
        res.status(200).json(actor);
      }
    );
  },
  deleteYoungActors: (req, res) => {
    Actor.deleteMany({ bYear: { $lte: 2004 } }, (err, docs) => {
      if (err) return res.status(400).json(err);
      if (!docs) return res.status(404).json;
      console.log(docs);
      res.status(200).json(docs);
    });
  }
};

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const cors = require("cors");

const actors = require("./routers/actorRouter");
const movies = require("./routers/movieRouter");

const app = express();
//Any request other than for CRUD operations should go to dist/movieAng
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
//enable Cross Origin Request Support for all routes. Unsafe to do this in production
// app.use(cors());

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/movies", function(err) {
  if (err) {
    return console.log("Mongoose - connection error:", err);
  }
  console.log("Connect Successfully");
});

//Configuring Endpoints
//Actor RESTFul endpoionts
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
app.get("/actors", actors.getAll);
app.post("/actors", actors.createOne);
app.get("/actors/:id", actors.getOne);
app.put("/actors/:id", actors.updateOne);
app.post("/actors/:id/movies", actors.addMovie);
app.delete("/actors/:id", actors.deleteOne);
app.delete("/actors/:id/movies", actors.deleteActorAndMovies);
app.put("/actors/:id/:movieId", actors.deleteMovieById);
app.post("/actors/deleteYoungActors/", actors.deleteYoungActors);
//Movie RESTFul  endpoints
app.get("/movies", movies.getAll);
app.post("/movies", movies.createOne);
app.get("/movies/:id", movies.getOne);
app.put("/movies/:id", movies.updateOne);
app.delete("/movies/:id", movies.deleteOnebyID);
app.post("/movies/:id/actors", movies.addActor);
app.put("/movies/:id/:actorId", movies.deleteActorById);
app.get("/movies/:year1/:year2", movies.getMoviesInYears);
app.delete("/deleteMoviesBeforeYear/:aYear", movies.deleteMovieBeforeYear);

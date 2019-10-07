import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  
  section = 1;
  
  title: string;
  year: number;
  movieId: string;
  
  aYear: number;
  selectedMovie:any
  selectedActor:any
  
  constructor(private dbService: DatabaseService ) { }
  
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;

    });
  }
  //Get All Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    })
  }
  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
      this.section =  1;
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  deleteMovieBeforeYear(aYear: number) {
    this.dbService.deleteMovieBeforeYear(this.aYear).subscribe(result => {
      this.onGetMovies();
    })
  }
  
  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Add Actor to movie
  onAddActorToMovie() {
    const movieId = this.selectedMovie
    const actorId = this.selectedActor
    let obj = {id:actorId}
    this.dbService.addActorToMovie(movieId, obj).subscribe(result => {
      console.log(result)
      this.onGetMovies();
      this.section = 1
    })
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
    //get all actors
    this.onGetActors();
  }
  
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  
  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }
  getSelectedMovie(item) {
    this.dbService.getMovie(item._id).subscribe(result => {
      console.log(result)
      this.selectedMovie = result
    })
  }

  
  
  
}

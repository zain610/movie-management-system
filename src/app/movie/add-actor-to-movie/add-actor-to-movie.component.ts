import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-actor-to-movie',
  templateUrl: './add-actor-to-movie.component.html',
  styleUrls: ['./add-actor-to-movie.component.css']
})
export class AddActorToMovieComponent implements OnInit {
  moviesDB: any[]
  actorsDB: any[]


  selectedMovie: any
  selectedActor: any


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

    //Add Actor to movie
    onAddActorToMovie() {
      const movieId = this.selectedMovie
      const actorId = this.selectedActor
      console.log(movieId, actorId)
      let obj = {id:actorId}
      this.dbService.addActorToMovie(movieId, obj).subscribe(result => {
        console.log(result)
        this.onGetMovies();
        this.router.navigate(['/movies/listmovies']);

      })
    }
  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.onGetMovies();
    //get all actors
    this.onGetActors();
  }
  getSelectedMovie(item) {
    this.dbService.getMovie(item._id).subscribe(result => {
      console.log(result)
      this.selectedMovie = result
    })
  }

}

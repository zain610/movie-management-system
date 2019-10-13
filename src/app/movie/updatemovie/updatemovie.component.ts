import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {

  moviesDB: any[]

  title: string
  year: number
  movieId: string


    //Get all Movies
    onGetMovies() {
      this.dbService.getMovies().subscribe((data: any[]) => {
        this.moviesDB = data;
        
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
        this.router.navigate(["/movies/listmovies"])
      });
    }

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.onGetMovies()
  }

}

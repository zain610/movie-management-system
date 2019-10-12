import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css']
})
export class ListmoviesComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];

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
  
  constructor(private dbService: DatabaseService ) { }
  
  ngOnInit() {
    this.onGetMovies()
    this.onGetActors()
  }
  
}

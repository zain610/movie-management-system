import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  moviesDB: any[] = [];
  
  
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
      
    });
  }
    //Delete Movie
    onDeleteMovie(item) {
      this.dbService.deleteMovie(item._id).subscribe(result => {
        this.onGetMovies();
      });
    }
  
  
  constructor(private dbService: DatabaseService, private router: Router) { }
  
  ngOnInit() {
    this.onGetMovies();
    
  }
  
}

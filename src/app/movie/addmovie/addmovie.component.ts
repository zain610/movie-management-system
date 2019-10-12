import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  
  moviesDB: any[] = [];
  title: string
  year: number
  
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
      
    });
  }
  onSaveMovie(item) {
    let obj = { title: this.title, year: this.year}
    this.dbService.createMovie(obj).subscribe((data: any[]) => {
      this.moviesDB = data
      this.router.navigate(["/movies/listmovies"]);
    })
  }
  
  
  constructor(private dbService: DatabaseService, private router: Router) { }
  
  ngOnInit() {
    this.onGetMovies();
  }
  
}

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  constructor(private dbService: DatabaseService ) { }
  
  
  // deleteMovieBeforeYear(aYear: number) {
  //   this.dbService.deleteMovieBeforeYear(this.aYear).subscribe(result => {
  //     this.onGetMovies();
  //   })
  // }
  
  
  
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
  }
  
  
  
  
  
}

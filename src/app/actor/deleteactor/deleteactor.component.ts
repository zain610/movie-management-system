import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteactor',
  templateUrl: './deleteactor.component.html',
  styleUrls: ['./deleteactor.component.css']
})
export class DeleteactorComponent implements OnInit {
  actorsDB: any[]
  
  
  
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }
  
  constructor(private dbService: DatabaseService, private router: Router) { }
  
  ngOnInit() {
    this.onGetActors()
  }
  
}

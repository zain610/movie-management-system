import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addactor',
  templateUrl: './addactor.component.html',
  styleUrls: ['./addactor.component.css']
})
export class AddactorComponent implements OnInit {
  actorsDB: any[];
  fullName: string;
  bYear: number;


    //Get all Actors
    onGetActors() {
      this.dbService.getActors().subscribe((data: any[]) => {
        this.actorsDB = data;
      });
    }
    //Create a new Actor, POST request
    onSaveActor() {
      let obj = { name: this.fullName, bYear: this.bYear };
      this.dbService.createActor(obj).subscribe(result => {
        this.onGetActors();
        this.router.navigate(["/actors/listactors"]);
      });
    }

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.onGetActors()
  }

}

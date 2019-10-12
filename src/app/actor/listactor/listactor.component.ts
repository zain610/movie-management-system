import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DatabaseService } from "../../database.service";



@Component({
  selector: 'app-listactor',
  templateUrl: './listactor.component.html',
  styleUrls: ['./listactor.component.css']
})
export class ListactorComponent implements OnInit {
  private actorsDB: any[] = [];

    //Get all Actors
    onGetActors() {
      this.dbService.getActors().subscribe((data: any[]) => {
        this.actorsDB = data;
      });
    }

  constructor(private dbService: DatabaseService, private router: Router) {
    
  }
  ngOnInit() {
    this.onGetActors();
  }

}

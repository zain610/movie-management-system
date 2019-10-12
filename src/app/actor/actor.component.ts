import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  constructor(private dbService: DatabaseService, private router: Router) {}

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {

  }
}
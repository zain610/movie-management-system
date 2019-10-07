import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieAng';
  section = 2;

  changeSection(sectionNumber: number) {
    this.section = sectionNumber
  }
}

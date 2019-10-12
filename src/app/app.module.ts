import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ActorComponent } from "./actor/actor.component";
import { MovieComponent } from './movie/movie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';
import { ListactorComponent } from './actor/listactor/listactor.component';
import { AddactorComponent } from './actor/addactor/addactor.component';
import { UpdateactorComponent } from './actor/updateactor/updateactor.component';
import { DeleteactorComponent } from './actor/deleteactor/deleteactor.component';
import { ListmoviesComponent } from './movie/listmovies/listmovies.component';
import { AddmovieComponent } from './movie/addmovie/addmovie.component';
import { UpdatemovieComponent } from './movie/updatemovie/updatemovie.component';
import { DeletemovieComponent } from './movie/deletemovie/deletemovie.component';
import { AddActorToMovieComponent } from './movie/add-actor-to-movie/add-actor-to-movie.component';

//declare the routes from root to actor and movie
const appRoutes: Routes = [
  {path:"", redirectTo: "/actors", pathMatch: "full"},
  {path: "actors", component: ActorComponent, children: [
    { path: "", redirectTo: "/actors/listactors", pathMatch: "full" },
    { path: "listactors", component: ListactorComponent },
    { path: "addactor", component: AddactorComponent },
    { path: "updateactor", component: UpdateactorComponent },
    { path: "deleteactor", component: DeleteactorComponent },
  ]},
  {path:"movies", component: MovieComponent, children: [
    { path: "", redirectTo: "/movies/listmovies", pathMatch: "full"},
    { path: "listmovies", component: ListmoviesComponent},
    {path: "addmovie", component: AddmovieComponent},
    {path: "updatemovie", component: UpdatemovieComponent},
    {path: "deletemovie", component: DeletemovieComponent},
    {path: "addActorToMovie", component: AddActorToMovieComponent}
  ]},
  {path:"viewsnotfound", component: ViewnotfoundComponent},
  {path:"**", component: ViewnotfoundComponent}
]
@NgModule({
  declarations: [AppComponent, ActorComponent, MovieComponent, ViewnotfoundComponent, ListactorComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    ListmoviesComponent,
    AddmovieComponent,
    UpdatemovieComponent,
    DeletemovieComponent,
    AddActorToMovieComponent],
    imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)],
    providers: [DatabaseService],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"
}),
};
const baseURL = "http://localhost:8080"

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  // Actor Database Methods
  getActors() {
    return this.http.get(baseURL+"/actors");
  }
  getActor(id: string) {
    let url = baseURL+"/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post(baseURL+"/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = baseURL+"/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = baseURL+"/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  // Movie Database Methods
  getMovies() {
    return this.http.get(baseURL+"/movies")
  }
  getMovie(id: String) {
    return this.http.get(baseURL+"/movies/"+id)
  }
  createMovie(data) {
    return this.http.post(baseURL+"/movies", data, httpOptions);
  }
  updateMovie(id, data) {
    let url = baseURL+"/movies/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteMovie(id) {
    let url = baseURL+"/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieBeforeYear(aYear) {
    let url = baseURL+"/deleteMoviesBeforeYear/"+aYear;
    return this.http.delete(url, httpOptions);
  }
  addActorToMovie(id, data) {
    // app.post("/movies/:id/actors", movies.addActor);
    let url = baseURL+"/movies/"+id+"/actors";
    return this.http.post(url, data, httpOptions)
  }
}
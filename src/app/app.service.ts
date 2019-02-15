import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly apikey = 'bfd1f6f3';
  readonly api = `https://www.omdbapi.com/?apikey=${this.apikey}&type=movie&r=json`;

  constructor(private http: HttpClient) { }

  getMovies(titleValue: any): Observable<any> {
    return this.http.get(`${this.api}&s=${titleValue}*`);
  }

  getMoviesAtPage(titleValue: any, pageValue: number): Observable<any> {
    return this.http.get(`${this.api}&s=${titleValue}*&page=${pageValue}`);
  }

  getDetails(value: any): Observable<any> {
    return this.http.get(`${this.api}&i=${value}`);
  }

}

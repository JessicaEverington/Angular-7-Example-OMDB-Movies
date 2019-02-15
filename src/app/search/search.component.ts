import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  history_key = 'search_history';

  movies: any[] = [];
  searchFormControl = new FormControl();
  value: any;
  msg = '';
  isDone = true;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.showHistory();

    this.searchFormControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(newValue => {
        this.isDone = false;
        this.value = newValue;

        this.refresh();
      }
      );
  }

  refresh() {
    this.appService.getMovies(this.value).subscribe(data => {
      if (data.Response !== 'False') {
        const items = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            items.push(data[key]);
          }
        }
        this.msg = `Showing results for ${this.value} ...`;
        this.movies = items[0];
        this.isDone = true;
      } else {
        this.isDone = true;
        this.movies.length = null;
        if (this.value === '') {
          this.msg = `Please enter something to search for!`;
        } else {
          this.msg = `Oh no! Could not find any related movies to ${this.value}!`;
        }
      }
    })
  }

  showHistory() {
    try {
      const history = JSON.parse(localStorage.getItem(this.history_key))
      if (history.length > 0) {
        this.msg = `Showing history (last 5)...`;
        this.movies = history;
      }
    } catch (e) {
      console.log(e)
    }
  }

  gotoDetails(data) {
    try {
      let history = JSON.parse(localStorage.getItem(this.history_key))
      history.splice(0, 0, data);
      history = history.slice(0, 5);

      localStorage.setItem(this.history_key, JSON.stringify(history));
    } catch (e) {
      localStorage.setItem(this.history_key, JSON.stringify([data]));

      console.log(e)
    }

    this.router.navigate(['/details', data.imdbID]);
  }

}

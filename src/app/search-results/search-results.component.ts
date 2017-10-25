import { Observable } from 'rxjs/Observable';
import { SearchResult } from './../models/search-result';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers'
import * as Actions from '../store/actions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  results: Observable<SearchResult[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.results = this.store.select('foodState','results')
    this.loading = this.store.select('foodState','loading')
   }

  ngOnInit() {
  }

}

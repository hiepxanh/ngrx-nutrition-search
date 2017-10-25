import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switch'
import 'rxjs/add/operator/map'
import { Store } from "@ngrx/store";

import * as Actions from '../store/actions'
import * as fromRoot from '../store/reducers'

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @ViewChild('input') input:ElementRef;
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    Observable.fromEvent(this.input.nativeElement, 'keyup') // Create an observable from input keyup events
    .map((e:any) => e.target.value) // mapping the raw value to the actual user input
    .filter((query:string) => query.length > 1) // do nothing if user enters nothing 
    .debounceTime(250) // only check the events every 250ms
    .map(query => query.trim())
    .do((query:string) => this.store.dispatch(new Actions.Search(query))) // make a search with the query
    .switch() // if there is another user input, cancel previous stream 
    .subscribe();
  }

}

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Food } from '../models/food';

import { Store } from "@ngrx/store";
import * as fromRoot from "../store/reducers";
import * as Actions from "../store/actions";

@Component({
  selector: 'app-food-result',
  templateUrl: './food-result.component.html',
  styleUrls: ['./food-result.component.css']
})
export class FoodResultComponent implements OnInit {
  food: Observable<Food>;
  loading: Observable<boolean>;


   constructor(
     private route: ActivatedRoute, 
     private router: Router,
     private store: Store<fromRoot.AppState>
    ) {
      this.food = this.store.select('foodState','selectedFood')
      this.loading = this.store.select('foodState','loading')
  }

  ngOnInit() {
    this.route.params
    .map(params => params.id)
    .do((id) => this.store.dispatch(new Actions.FetchFood(id)))
    .subscribe();
  }

  addToList() {
    this.store.dispatch(new Actions.AddFood());
    this.router.navigate(['my-foods']);
  }
}

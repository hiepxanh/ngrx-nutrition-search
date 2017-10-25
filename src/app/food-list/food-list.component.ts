import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Food } from "../models/food";;

import { Store } from "@ngrx/store";
import * as Actions from "../store/actions";
import * as fromRoot from "../store/reducers";
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foodList: Observable<Food[]>;

  constructor(
    private store: Store<fromRoot.AppState>
  ) { }

  ngOnInit() {
    this.foodList = this.store.select('foodState','foodList')
  }

  removeFood(food: Food) {
    this.store.dispatch(new Actions.RemoveFood(food))
  }

}

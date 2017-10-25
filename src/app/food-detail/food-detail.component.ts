import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Store } from "@ngrx/store";
import * as fromRoot from "../store/reducers";
import * as Actions from "../store/actions";

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  food: Observable<Food>;
  loading: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {
    this.food = this.store.select('foodState','selectedFood')
    this.loading = this.store.select('foodState','loading')
    console.log('loading ?',this.loading)
    this.store.select('foodState').subscribe(s => console.log('foodstate',s))
    this.loading.subscribe(s => console.log('loading status',s))

   }

  ngOnInit() {

    this.route.params.map(params => params.id)
    .do(id => this.store.dispatch(new Actions.GetFood(id)))
    .subscribe();
  }

  removeFromList(food: Food) {
    this.store.dispatch(new Actions.RemoveFood(food));
    this.router.navigate(['myfoods'])
  }

}

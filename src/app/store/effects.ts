import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NutritionService } from './../services/nutrition.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects'
import * as FoodActions from "./actions";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FoodEffects {
    constructor(
        private action$: Actions,
        private nutritionService: NutritionService
    ) {

    }

    @Effect()
    searchFood$: Observable<Action> = this.action$
    .ofType(FoodActions.SEARCH)
    .map(toPayload)
    .switchMap(query => {
        return this.nutritionService.searchFood(query)
        .map(results => new FoodActions.SearchDone(results))
        // catch(() => of(new FoodActions.FetchFoodFail()))
    })

    @Effect()
    fetchFood$: Observable<Action> = this.action$
    .ofType(FoodActions.FETCH_FOOD)
    .map(toPayload)
    .switchMap(query => {
        return this.nutritionService.fetchFood(query)
        .map(food => new FoodActions.FetchFoodDone(food))
        // catch(() => of(new FoodActions.FetchFoodFail()))
    })

}
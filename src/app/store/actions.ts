import { Food } from '../models/food';
import { Action } from "@ngrx/store";
import { SearchResult } from "../models/search-result";

export const LOADING = 'Food Load';

export const SEARCH = 'Food Search';
export const SEARCH_DONE = 'Food Search Done'

export const FETCH_FOOD = 'Fetch Food';
export const FETCH_FOOD_DONE ='Fetch Food Done';

export const ADD_FOOD = 'Add Food';
export const GET_FOOD = 'Get Food';
export const REMOVE_FOOD = 'Remove Food';

export class Search implements Action {
    readonly type = SEARCH;
    constructor(public payload:string) {};
}

export class SearchDone implements Action {
    readonly type = SEARCH_DONE;
    constructor(public payload:SearchResult[]) {}
}

export class FetchFood implements Action {
    readonly type = FETCH_FOOD;
    constructor (public payload: string) {};
}

export class FetchFoodDone implements Action {
    readonly type = FETCH_FOOD_DONE;
    constructor(public payload:Food) {};
}

export class AddFood implements Action {
    readonly type = ADD_FOOD;
    constructor() {}
}

export class GetFood implements Action {
    readonly type = GET_FOOD;
    constructor(public payload: string) {};
}

export class RemoveFood implements Action {
    readonly type = REMOVE_FOOD;
    constructor(public payload:Food) {}
}

export type Actions = Search | SearchDone | AddFood | RemoveFood | FetchFood | FetchFoodDone | GetFood;
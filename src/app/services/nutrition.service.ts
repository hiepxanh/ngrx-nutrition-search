import { Injectable } from "@angular/core";
import { Observable} from "rxjs/Observable";
import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { SearchResult } from "../models/search-result";
import { Food } from '../models/food'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NutritionService {
    apiKey: string;
    constructor(private http:HttpClient) {
        this.apiKey = 'i0GUjAVRhk5uZWrVl3MNc7e2xh8knYvFneIMW6aT';
    }

    searchFood(query:string):Observable<SearchResult[]> {
        const url = 'https://api.nal.usda.gov/ndb/search/';
        let params =  new HttpParams()
        .set('format','json')
        .set('q',query)
        .set('sort','r')
        .set('max','25')
        .set('offset','0')
        .set('ds','Standard Reference')
        .set('api_key',this.apiKey)

        return this.http
        .get(url,{params})
        .map((res:any) => {
            return res.list ? res.list.item.map(item => new SearchResult(item)) : []
        }) 
        .catch(this.handleError)
    }

    fetchFood(query:string) : Observable<Food> {
        const url = 'https://api.nal.usda.gov/ndb/nutrients/';
        let params =  new HttpParams()
        .set('format','json')
        .set('ndbno',query)
        .set('nutrients','255') // Water
        .set('nutrients','208') // Energy
        .set('nutrients','203') // Protein
        .set('nutrients','204') // Total lipid
        .set('nutrients','205') // Carbohydrate
        .set('nutrients','268') // Energy
        .set('nutrients','269') // Sugars
        .set('nutrients','291') // Fiber
        .set('api_key',this.apiKey);

        return this.http
        .get(url,{params})
        .map((res:any) => {
            console.log('ket qua nutrients',res,res.report.foods)
            return res.report.foods ? res.report.foods[0] : null;
        })
        .map(food => new Food(food))
        .catch(this.handleError)
    }

    handleError(error) {
        let errorMsg: string = error.message ? error.message : error.toString();
        return Observable.throw(errorMsg);
    }
}
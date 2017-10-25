import { NutritionService } from './services/nutrition.service';
import { MaterialModule } from './shared/material/material.module';
import { FoodEffects } from './store/effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FoodResultComponent } from './food-result/food-result.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
const routes: Routes = [
                {path: '', pathMatch:'full', redirectTo: 'myfoods' },
                { path: 'search', component: SearchResultsComponent },
                { path: 'search/:id', component: FoodResultComponent},
                { path: 'myfoods', component: FoodListComponent },
                { path: 'myfoods/:id', component: FoodDetailComponent},
                { path: '**', pathMatch: 'full', redirectTo: 'myfoods' }
              ];

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SearchResultsComponent,
    FoodResultComponent,
    FoodListComponent,
    FoodDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({foodState: reducer}),
    EffectsModule.forRoot([FoodEffects]),
    StoreDevtoolsModule.instrument({maxAge:25}),
  ],
  providers: [NutritionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

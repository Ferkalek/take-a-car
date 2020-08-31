import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarsListItemComponent } from './cars-list/cars-list-item/cars-list-item.component';
import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CarPageComponent } from './car-page/car-page.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    CarsListComponent,
    CarsListItemComponent,
    CarPageComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule
  ]
})
export class CarsModule { }

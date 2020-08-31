import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarPageComponent } from './car-page/car-page.component';

const routes: Routes = [
    {
        path: '',
        component: CarsListComponent
    },
    {
        path: 'car/:id',
        component: CarPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CarsRoutingModule {}

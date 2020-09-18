import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { CreateCareComponent } from "./create-care/create-care.component";
import { SharedModule } from "../shared/shared.module";
import { AdminCarsListComponent } from "./admin-cars-list/admin-cars-list.component";

@NgModule({
  declarations: [AdminComponent, CreateCareComponent, AdminCarsListComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}

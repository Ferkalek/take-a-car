import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "../alert/alert.component";

const SHARED_MODULES = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [AlertComponent],
  imports: [...SHARED_MODULES, CommonModule],
  exports: [...SHARED_MODULES, AlertComponent],
})
export class SharedModule {}

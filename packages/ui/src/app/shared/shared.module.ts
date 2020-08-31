import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const SHARED_MODULES = [FormsModule, ReactiveFormsModule];

@NgModule({
  imports: [...SHARED_MODULES, CommonModule],
  exports: [...SHARED_MODULES],
})
export class SharedModule {}

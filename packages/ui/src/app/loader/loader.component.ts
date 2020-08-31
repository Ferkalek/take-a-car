import { Component } from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
  selector: "tcar-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {}

  get getStatus(): string {
    return this.loaderService.getPprocessing();
  }
}

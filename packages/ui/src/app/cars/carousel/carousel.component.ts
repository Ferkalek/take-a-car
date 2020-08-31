import { Component, Input } from "@angular/core";

@Component({
  selector: "tcar-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent {
  @Input() public images = [];
  public transform = 100;
  public selectedIndex = 0;

  public selected(selectedId: number): void {
    this.selectedIndex = selectedId;
  }
}

import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  addClassNoscroll(): void {
    if (!this.document.body.classList.contains("noscroll")) {
      this.document.body.classList.add("noscroll");
    }
  }

  removeClassNoscroll(): void {
    if (this.document.body.classList.contains("noscroll")) {
      this.document.body.classList.remove("noscroll");
    }
  }
}

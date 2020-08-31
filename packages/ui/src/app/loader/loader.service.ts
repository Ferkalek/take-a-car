import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private processing: string = "";

  getPprocessing(): string {
    return this.processing;
  }

  setPprocessing(status: string): void {
    this.processing = status;
  }
}

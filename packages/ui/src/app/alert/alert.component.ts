import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AdminService } from "../admin/admin.service";

@Component({
  selector: "tcar-alert",
  templateUrl: "./alert.component.html",
})
export class AlertComponent {
  public message$ = new BehaviorSubject<string>("");

  get message(): string {
    return this.adminService.message$.getValue();
  }

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.message$.subscribe((m) => this.message$.next(m));
  }

  public closeAlert(): void {
    this.adminService.message$.next("");
  }
}

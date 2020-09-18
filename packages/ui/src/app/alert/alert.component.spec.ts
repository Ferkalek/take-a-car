import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AlertComponent } from "./alert.component";
import { AdminService } from "../admin/admin.service";

describe("AlertComponent", () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let adminService: AdminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    adminService = TestBed.get(AdminService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("closeAlert", () => {
    it("Test 1: should the message equal empty when the method run", () => {
      component.closeAlert();
      expect(component.message).toEqual("");
    });
  });
});

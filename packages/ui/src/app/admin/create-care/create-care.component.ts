import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Inject,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {
  FormGroup,
  FormBuilder,
  NgForm,
  FormArray,
  Validators,
} from "@angular/forms";
import { AdminService } from "../admin.service";
import { fileExtensionValidator } from "./file-extantion-validation";
import { AddNewCarAction, UpdateCarAction } from "src/app/actions/car.action";
import { ICarDTO } from "src/app/shared/interfaces/car.interface";
import { Store } from "@ngxs/store";
import { LoaderService } from "src/app/loader/loader.service";
import { UtilsService } from "src/app/shared/services/utils.service";
import { PROCESSING, MSG } from "../admin.constants";

@Component({
  selector: "tcar-create-care",
  templateUrl: "./create-care.component.html",
  styleUrls: ["./create-care.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCareComponent implements OnInit {
  @Input()
  public inpCar: ICarDTO | null = null;

  @Output()
  public leaving = new EventEmitter();

  public acceptedExtensions = "jpg, jpeg, png, bmp";

  public carForm: FormGroup;

  @ViewChild("form", { static: false }) form: NgForm;

  private _existImgs = [];

  get imagesToUpload(): FormArray {
    return this.carForm.get("images") as FormArray;
  }

  get existImgs() {
    return this._existImgs;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private store: Store,
    private loaderService: LoaderService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.inpCar !== null) {
      const { title, description, price, images } = this.inpCar;
      this.carForm = this.formBuilder.group({
        title: [title, Validators.required],
        description: [description, Validators.required],
        price: [price, Validators.required],
        images: [[]],
      });
      this._existImgs = [...images];
    } else {
      this.carForm = this.formBuilder.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
        price: ["", Validators.required],
        images: this.formBuilder.array([
          this.formBuilder.control("", [
            Validators.required,
            fileExtensionValidator(this.acceptedExtensions),
          ]),
        ]),
      });
    }
  }

  public onSubmit(): void {
    if (this.carForm.invalid) {
      return;
    }

    const formData = new FormData();
    for (let key in this.carForm.value) {
      if (key === "images") {
        const images = this.carForm.value.images;

        // Append each of the image from field images
        for (let i = 0; i < images.length; i++) {
          const imgInput = this.document.getElementById(
            `image_${i}`
          ) as HTMLInputElement;
          const file = imgInput.files[0];
          if (file) {
            formData.append("files[]", file, file.name);
          }
        }
      }
      formData.append(key, this.carForm.value[key]);
    }

    // Append each of the image from existing images
    for (let i = 0; i < this._existImgs.length; i++) {
      const name = `image_${i}.jpeg`;
      const file = this.b64toBlob(this._existImgs[i]);
      formData.append("files[]", file, name);
    }

    this.leaving.emit();
    this.utilsService.addClassNoscroll();
    if (this.inpCar === null) {
      this.loaderService.setPprocessing(PROCESSING.CREATING);
      this.createRequest(formData);
    } else {
      this.loaderService.setPprocessing(PROCESSING.EDITING);
      this.editRequest(this.inpCar._id, formData);
    }
  }

  public b64toBlob(b64Data, contentType = "", sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "image/jpeg" });
  }

  public getFileName(index: number): string {
    const val = this.imagesToUpload.controls[index].value;

    if (!val) {
      return "";
    }

    const fullPath = this.imagesToUpload.controls[index].value;
    return fullPath.replace(/^.*[\\\/]/, "");
  }

  public addMoreFiles(): void {
    this.imagesToUpload.push(
      this.formBuilder.control("", [
        Validators.required,
        fileExtensionValidator(this.acceptedExtensions),
      ])
    );
  }

  public deleteFile(index: number): void {
    this.imagesToUpload.removeAt(index);

    if (this.imagesToUpload.valid) {
      this.addMoreFiles();
    }
  }

  public formReset(): void {
    this.carForm.reset();

    const imgs = this.imagesToUpload.controls.length;
    for (let i = 0; i < imgs; i++) {
      this.deleteFile(i);
    }
  }

  public getField(field: string) {
    return this.carForm.get(field);
  }

  public closeForm(): void {
    this.leaving.emit();
  }

  public delImg(index: number): void {
    this._existImgs.splice(index, 1);
  }

  private showMessage(msg: string): void {
    this.adminService.message$.next(msg);
    setTimeout(() => {
      this.adminService.message$.next("");
    }, 1500);
  }

  private createRequest(car: FormData) {
    this.adminService.addCars(car).subscribe((res) => {
      this.store.dispatch(new AddNewCarAction(res));

      this.loaderService.setPprocessing("");
      this.utilsService.removeClassNoscroll();

      this.showMessage(MSG.CREATE_SUCCESS);
    });
  }

  private editRequest(id: string, car: FormData) {
    this.adminService.updateCar(id, car).subscribe((res) => {
      this.store.dispatch(new UpdateCarAction(id, res));

      this.loaderService.setPprocessing("");
      this.utilsService.removeClassNoscroll();

      this.showMessage(MSG.UPDATE_SUCCESS);
    });
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tcar-cars-list-item',
  templateUrl: './cars-list-item.component.html',
  styleUrls: ['./cars-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarsListItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import {Component, OnInit, Input} from '@angular/core';
import ComponentModel from "../models/component-model";

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})

export class ComponentDetailComponent implements OnInit {
  @Input() component: ComponentModel;

  constructor() { }

  ngOnInit() {
  }

}

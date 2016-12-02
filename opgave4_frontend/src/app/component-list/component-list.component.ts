import {Component, OnInit, Input} from '@angular/core';
import ComponentModel from "../models/component";

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
  @Input() components: Array<ComponentModel> = [];

  constructor() {
  }

  ngOnInit() {
    console.log(this.components);
  }

}

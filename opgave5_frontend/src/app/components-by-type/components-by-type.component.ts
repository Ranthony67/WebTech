import { Component, OnInit } from '@angular/core';
import ComponentTypeModel from "../models/component-type-model";
import ComponentModel from "../models/component-model";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-components-by-type',
  templateUrl: './components-by-type.component.html',
  styleUrls: ['./components-by-type.component.css']
})
export class ComponentsByTypeComponent implements OnInit {
  public componentTypes: Array<ComponentTypeModel> = [];

  public components: Array<ComponentModel> = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  searchFor(typeModel: ComponentTypeModel) {
    this.backendService.getComponentsByType(typeModel)
      .then(components => {
        this.components = components
      });
  }

  private fetchCategories() {
    this.backendService.getComponentTypes()
      .then(componentTypes => {
        this.componentTypes = componentTypes;
      });
  }

}

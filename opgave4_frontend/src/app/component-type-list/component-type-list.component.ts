import { Component, OnInit } from '@angular/core';
import ComponentTypeModel from "../models/component-type-model";
import {BackendService} from "../backend.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-component-type-list',
  templateUrl: './component-type-list.component.html',
  styleUrls: ['./component-type-list.component.css']
})
export class ComponentTypeListComponent implements OnInit {
  private componentTypes = [];

  public inEditMode = false;
  public isNew = false;
  private modelToBeEdited: ComponentTypeModel = null;

  public model = new ComponentTypeModel();

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.backendService.getComponentTypes()
      .then(componentTypes => {
        this.componentTypes = componentTypes;
      });
  }

  onSubmit(event) {
    event.preventDefault();
    this.backendService.createComponentType(this.model);

    this.reload();
  }

  addNew() {
    this.inEditMode = true;
    this.isNew = true;
    this.modelToBeEdited = new ComponentTypeModel();
  }

}

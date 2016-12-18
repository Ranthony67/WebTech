import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import ComponentTypeModel from "../models/component-type-model";

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {
  public componentTypes: Array<ComponentTypeModel> = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getComponentTypes();
  }

  getComponentTypes() {
    this.backendService.getComponentTypes()
      .then(types => {
        this.componentTypes = types;
      })
  }

  isAuthenticated() {
    return this.backendService.isAuthenticated();
  }

  isAdmin() {
    return this.backendService.isAdmin();
  }

}

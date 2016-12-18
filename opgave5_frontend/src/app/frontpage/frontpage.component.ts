import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import ComponentModel from "../models/component-model";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  public inEditMode = false;

  private components: Array<ComponentModel> = [];

  public model: ComponentModel = new ComponentModel();

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.reloadComponents();
  }

  reloadComponents() {
    this.backendService.getComponents().then((components => {
      this.components = components;
    }));
  }

  isAdmin() {
    this.backendService.isAdmin();
  }

  openNew() {
    this.inEditMode = true;
  }

  onSubmit(event) {
    event.preventDefault();

    let method = this.backendService.createComponent.bind(this.backendService);
    if (this.model.ComponentId) {
      this.backendService.editComponent.bind(this.backendService);
    }

    method(this.model)
      .then(_ => {
        this.inEditMode = false;
      });
  }

  onEdit(component) {
    this.inEditMode = true;
    this.model = component;
  }

  delete(component) {
    this.backendService.deleteComponent(component)
      .then(_ => {
        this.reloadComponents();
      });
  }
}

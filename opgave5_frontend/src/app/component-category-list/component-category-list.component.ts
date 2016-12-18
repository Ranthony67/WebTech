import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import ComponentCategoryModel from "../models/component-category-model";

@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.component.html',
  styleUrls: ['./component-category-list.component.css']
})
export class ComponentCategoryListComponent implements OnInit {
  private categories = [];

  public inEditMode = false;
  public model: ComponentCategoryModel = new ComponentCategoryModel();

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.backendService.getComponentCategories()
      .then(categories => {
        this.categories = categories;
      });
  }

  isAdmin() {
    this.backendService.isAdmin();
  }

  editCategory(category) {
    this.inEditMode = true;
    this.model = category;
  }

  onSubmit(event) {
    event.preventDefault();

    let method = this.backendService.editComponentCategory.bind(this.backendService);

    if (this.model.CategoryId === undefined) {
      method = this.backendService.createComponentCategory.bind(this.backendService);
    }

    method(this.model)
      .then(res => {
        this.stopEditing();
        this.reload();
      });
  }

  deleteCategory() {
    this.backendService.deleteComponentCategory(this.model).then(_ => {
      this.inEditMode = false;
      this.reload();
    });
  }

  addNew() {
    this.inEditMode = true;
    this.model = new ComponentCategoryModel();
  }

  stopEditing() {
    this.inEditMode = false;
    this.model = null;
  }
}

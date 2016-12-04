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
  public isNew = false;
  private categoryToBeEdited: ComponentCategoryModel = null;

  public categoryEditName: string = "";

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


  editCategory(category) {
    this.inEditMode = true;
    this.categoryToBeEdited = category;
  }

  updateEditName(event) {
    this.categoryEditName = event.target.value;
  }

  save() {
    let method = this.backendService.editComponentCategory.bind(this.backendService);
    if (this.isNew) {
      method = this.backendService.createComponentCategory.bind(this.backendService);
    }

    this.categoryToBeEdited.Name = this.categoryEditName;

    method(this.categoryToBeEdited)
      .then(res => {
        this.stopEditing();
        this.reload();
      });
  }

  deleteCategory() {
    const category = this.categoryToBeEdited;
    this.backendService.deleteComponentCategory(category).then(_ => {
      this.inEditMode = false;
      this.reload();
    });
  }

  addNew() {
    this.inEditMode = true;
    this.isNew = true;
    this.categoryToBeEdited = new ComponentCategoryModel();
  }

  stopEditing() {
    this.isNew = false;
    this.inEditMode = false;
    this.categoryToBeEdited = null;
  }
}

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
  private categoryToBeEdited: ComponentCategoryModel = null;

  public categoryEditName: string = "";

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.reloadCategories();
  }

  reloadCategories() {
    //this.backendService.getComponentCategories()
    //  .then(categories => {
    //    this.categories = categories;
    //  });
    this.categories = [new ComponentCategoryModel()];
  }


  editCategory(category) {
    this.inEditMode = true;
    this.categoryToBeEdited = category;
  }

  updateEditName(event) {
    this.categoryEditName = event.target.value;
  }

  save() {
    console.log(this.categoryEditName);
    //TODO: Implement save logic
  }

  deleteCategory() {
    const category = this.categoryToBeEdited;
  }

  stopEditing() {
    this.inEditMode = false;
    this.categoryToBeEdited = null;
  }
}

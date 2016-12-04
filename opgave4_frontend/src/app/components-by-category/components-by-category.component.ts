import { Component, OnInit } from '@angular/core';
import ComponentCategoryModel from "../models/component-category-model";
import {BackendService} from "../backend.service";
import ComponentModel from "../models/component-model";

@Component({
  selector: 'app-components-by-category',
  templateUrl: './components-by-category.component.html',
  styleUrls: ['./components-by-category.component.css']
})
export class ComponentsByCategoryComponent implements OnInit {
  public categories: Array<ComponentCategoryModel> = [];

  public components: Array<ComponentModel> = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  searchFor(category: ComponentCategoryModel) {
    this.backendService.getComponentsByCategory(category)
      .then(components => {
        this.components = components
      });
  }

  private fetchCategories() {
    this.backendService.getComponentCategories()
      .then(categories => {
        this.categories = categories;
      });
  }

}

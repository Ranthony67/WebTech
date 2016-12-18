import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import ComponentModel from "../models/component-model";

@Component({
  selector: 'app-search-for-component',
  templateUrl: './search-for-component.component.html',
  styleUrls: ['./search-for-component.component.css']
})
export class SearchForComponentComponent implements OnInit {
  private components: Array<ComponentModel> = [];
  private model = {Name: ''};

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
  }

  onSubmit(event) {
    event.preventDefault();

    this.search();
  }

  search() {
    this.backendService.searchForComponent(this.model.Name)
      .then((components) => {
        this.components = components;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import ComponentModel from "../models/component";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  private components: Array<ComponentModel> = [];

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getComponents().then((components => {
      console.log(components);
      this.components = components;
    }));
  }

}

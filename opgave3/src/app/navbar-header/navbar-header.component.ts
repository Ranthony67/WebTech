import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.backendService.isAuthenticated();
  }

}

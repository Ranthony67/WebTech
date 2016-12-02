import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private backendService: BackendService, private router: Router) {
    this.backendService.signOut();
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}

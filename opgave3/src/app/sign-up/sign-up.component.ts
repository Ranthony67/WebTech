import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../backend.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public loginForm;

  constructor(private router: Router, private backendService: BackendService, private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  signUp(event: Event) {
    event.preventDefault();

    this.backendService.signUp(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
  }
}

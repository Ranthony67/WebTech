import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm;

  constructor(private router: Router, private backendService: BackendService, private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  signIn(event: Event) {
    event.preventDefault();

    this.backendService.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
  }

}

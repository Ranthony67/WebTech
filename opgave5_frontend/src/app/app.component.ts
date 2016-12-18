import {Component} from '@angular/core';
import {BackendService} from "./backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private backendService: BackendService) {
  }

  isAuthenticated(): boolean {
    return this.backendService.isAuthenticated();
  }

  signUp(): void {
    this.backendService.signUp("test", "test")
      .then((success) => {
        console.log(success);
      });
  }

  signOut(): void {
    this.backendService.signOut();
  }

  signIn(): void {
    this.backendService.signIn("test", "test")
      .then((success) => {
        console.log(success);
      });
  }
}

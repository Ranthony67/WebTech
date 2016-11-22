import {Component} from '@angular/core';
import {BackendService, Program} from "./backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private programs: Array<Program>;

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


  getExercises(): void {
    this.backendService.getExercises(this.programs[0]._id)
      .then(exercises => {
        console.log(exercises);
      })
  }
}

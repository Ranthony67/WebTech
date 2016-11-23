import {Component, OnInit} from '@angular/core';
import {BackendService, Program} from "../backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  private programs: Array<Program>;

  constructor(private router: Router, private backendService: BackendService) {
  }

  ngOnInit() {

    this.getPrograms();
  }

  createProgram(): void {
    this.backendService.createProgram().then(program => {
      this.router.navigate([`/programs/${program._id}`]);
    })
  }

  getPrograms(): void {
    this.backendService.getPrograms()
      .then(programs => {
        this.programs = programs;
      })
  }

  markAsDone(programid: string, done: boolean): void {
    this.backendService.markAsDone(programid, done).then(exercise => {
        console.log("[MarkAsDone] Success");
    })
  }
}

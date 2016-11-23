import { Component, OnInit } from '@angular/core';
import {BackendService, Exercise} from "../backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {
  private exercises: Array<Exercise>;
  
  constructor(private router: Router, private backendService: BackendService) { }

  ngOnInit() {

  }

  createExercise(): void{

  }
  /*
  getExercises(programid: string): void{
  	this.backendService.getExercises(programid)
  		.then(exercises => {
  			this.exercises = exercises;
  		})
  }
  */
  markExerciseAsDone(programid: string, exerciseid: string, done: boolean): void {

  }

}



/*
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
      this.router.navigate([`/programs/${program._id}`])
    })
  }

  getPrograms(): void {
    this.backendService.getPrograms()
      .then(programs => {
        this.programs = programs;
        console.log(programs);
      })
  }

  markAsDone(programid: string, done: boolean): void {
    this.backendService.markAsDone(programid, done).then(exercise => {
        console.log("[MarkAsDone] Test from programs.component.ts");
    })
  }
}
*/
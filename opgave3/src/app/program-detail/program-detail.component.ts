import { Component, OnInit } from '@angular/core';
import { BackendService, Exercise } from "../backend.service";
import { Router, ActivatedRoute, Params} from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {
  private exercises: Array<Exercise>;
  private programId: string;

  constructor(private router: Router, private backendService: BackendService, private route: ActivatedRoute) {
  	this.programId = this.route.params._value.id;
  	this.getExercises(this.programId);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
  	this.createExercise(this.programId, form.value );
  }

  createExercise(programid: string, exercise: Object): void{
  	this.backendService.createExercise(programid, exercise).then(exercise => {
  		this.router.navigate([`/programs/${programid}`]);
  		this.getExercises(programid);
  	})
  }

  getExercises(programid: string): void{
  	this.backendService.getExercises(programid)
  		.then(exercises => {
  			this.exercises = exercises;
  		})
  }
  
  markExerciseAsDone(programid: string, exerciseid: string, done: boolean): void {
  	this.backendService.markExerciseAsDone(programid, exerciseid, done)
  		.then(exercise => {
  			console.log(exercise);
  		})
  }

}

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
  private route: ActivatedRoute;

  constructor(private router: Router, private backendService: BackendService) {
  	//this.programId = this.route.params.programid;
  }

  ngOnInit() {
  	//this.getExercises();
  }

  onSubmit(form: NgForm){
  	//this.createExercise( , , )
  }

  createExercise(programid: string, exercise: Exercise): void{
  	this.backendService.createExercise(programid, exercise).then(exercise => {
  		this.router.navigate([`/programs/${programid}`]);
  		this.getExercises(this.programId);
  	})
  }

  getExercises(programid: string): void{
  	this.backendService.getExercises(programid)
  		.then(exercises => {
  			this.exercises = exercises;
  		})
  }
  
  markExerciseAsDone(programid: string, exerciseid: string, done: boolean): void {
  	this.backendService.markExerciseAsDone(programid, exerciseid, done).then(exercise => {
  		console.log("[MarkExerciseAsDone] Success");
  	})
  }

}

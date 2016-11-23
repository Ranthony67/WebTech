import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import * as _ from 'lodash';

import 'rxjs/add/operator/toPromise';

export class Program {
  public _id: string;
  public done: boolean;
}

export class Exercise{
  public _id: string;
  public program_id: string;
  public name: string;
  public description: string;
  public sets: string; 
  public repetition: string;
  public done: boolean;
}

@Injectable()
export class BackendService {
  private baseUrl: string;
  private authToken: string;

  protected TOKEN_STORAGE_KEY: string = "authToken";

  constructor(private http: Http) {
    this.baseUrl = process.env.API_URL || 'http://ittweb-opg2.herokuapp.com';
    this.authToken = this.getToken();
  }

  private defaultHeaders(): Headers {
    const defaultHeaders = {"Content-Type": "application/json"};
    let params = {};

    if (this.authToken !== null) {
      params["token"] = this.authToken;
    }

    return new Headers(_.merge(defaultHeaders, params));
  }

  private saveToken(authToken: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, authToken);
  }

  private getToken(): string {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  private post(url: string, params: string = ""): Promise<Response> {
    return this.http.post(url, params, {headers: this.defaultHeaders()}).toPromise();
  }

  private put(url: string, params: string=""): Promise<Response> {
    return this.http.put(url, params, {headers: this.defaultHeaders()}).toPromise();
  }

  private patch(url: string, params: string="") : Promise<Response> {
    return this.http.patch(url, params, {headers: this.defaultHeaders()}).toPromise();
  }

  private delete(url: string) : Promise<Response> {
    return this.http.delete(url, {headers: this.defaultHeaders()}).toPromise();
  }

  private get(url: string): Promise<Response> {
    return this.http.get(url, {headers: this.defaultHeaders()}).toPromise();
  }

  createProgram(): Promise<Program> {
    return this
      .post(`${this.baseUrl}/programs`)
      .then(res => {
        return res.json().program
      });
  }

  public getPrograms(): Promise<Array<Program>> {
    return this.get(`${this.baseUrl}/programs`)
      .then(res => {
        return res.json().programs;
      })
      .catch(_ => {
        return [];
      });
  }

  markAsDone(programid: string, done: boolean): Promise<Program> {
    const params: Object = {done: done};

    return this
      .put(`${this.baseUrl}/programs/${programid}`, JSON.stringify(params))
      .then(res => {
          console.log(res.json());
          return res.json().program;
        })
        .catch(_ => {
          console.log("[MarkAsDone] Failed"); 
        });
  }

    markExerciseAsDone(programid: string, exerciseid: string, done: boolean): Promise<Exercise> {
    const params: Object = {done: done};
    return this.patch(`${this.baseUrl}/programs/${programid}/exercises/${exerciseid}`)
      .then(res => { 
        return res.json();
      })
      .catch(_ => {
        console.log("[MarkExerciseAsDone] Failed");
      })
  }

  public deleteProgram(programId: string) : Promise<void> {
    return this
      .delete(`${this.baseUrl}/programs/${programId}`)
      .then(res => {
        console.log(res.json());
      })
  }

 createExercise(programid: string, exercise: Object): Promise<Exercise> {
  console.log(exercise);
    return this
      .post(`${this.baseUrl}/programs/${programid}/exercises`, JSON.stringify(exercise))
      .then(res =>{ 
        return res.json().exercise;
      });
  } 
  
  public getExercises(programid: string): Promise<Array<Exercise>> {
    return this.get(`${this.baseUrl}/programs/${programid}/exercises`)
      .then(res => {
        return res.json().exercises;
      })
      .catch(_ => {
        return [];
      });
  }



  public signOut(): void {
    this.authToken = null;
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
  }

  public signUp(email: string, password: string): Promise<Boolean> {
    const params: Object = {email: email, password: password};

    return this
      .post(`${this.baseUrl}/users/sign_up`, JSON.stringify(params))
      .then(res => {
        console.log(res.json());

        const token = res.json().token;
        this.saveToken(token);
        this.authToken = token;

        return true;
      })
      .catch(_ => {
        return false;
      });
  }

  public signIn(email: string, password: string): Promise<Boolean> {
    const params: Object = {email: email, password: password};

    return this
      .post(`${this.baseUrl}/users/sign_in`, JSON.stringify(params))
      .then(res => {

        const token = res.json().token;
        this.saveToken(token);
        this.authToken = token;

        return true;
      })
      .catch(_ => {
        return false;
      });
  }

  public isAuthenticated() {
    return this.authToken !== null;
  }
}

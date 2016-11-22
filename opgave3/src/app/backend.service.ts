import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import * as _ from 'lodash';

import 'rxjs/add/operator/toPromise';

export class Program {
  public _id: string;
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

  private post(url: string, params: string): Promise<Response> {
    return this.http.post(url, params, {headers: this.defaultHeaders()}).toPromise();
  }

  private get(url: string): Promise<Response> {
    return this.http.get(url, {headers: this.defaultHeaders()}).toPromise();
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

  public getExercises(programId: string): Promise<Array<Object>> {
    return this.get(`${this.baseUrl}/programs/${programId}/exercises`)
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

  public isAuthenticated() {
    return this.authToken !== null;
  }
}

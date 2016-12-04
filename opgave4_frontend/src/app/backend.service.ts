import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import * as _ from 'lodash';

import 'rxjs/add/operator/toPromise';
import ComponentModel from "./models/component-model";
import ComponentCategoryModel from "./models/component-category-model";
import ComponentTypeModel from "./models/component-type-model";

@Injectable()
export class BackendService {
  private baseUrl: string;
  private authToken: string;

  protected TOKEN_STORAGE_KEY: string = "authToken";

  constructor(private http: Http) {
    this.baseUrl = process.env.API_URL || 'http://ittweb-opg4.herokuapp.com';
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

  private put(url: string, params: string = ""): Promise<Response> {
    return this.http.put(url, params, {headers: this.defaultHeaders()}).toPromise();
  }

  private patch(url: string, params: string = ""): Promise<Response> {
    return this.http.patch(url, params, {headers: this.defaultHeaders()}).toPromise();
  }

  private delete(url: string): Promise<Response> {
    return this.http.delete(url, {headers: this.defaultHeaders()}).toPromise();
  }

  private get(url: string): Promise<Response> {
    return this.http.get(url, {headers: this.defaultHeaders()}).toPromise();
  }

  public getComponents(): Promise<Array<ComponentModel>> {
    return this.get(this.baseUrl + '/components')
      .then(res => res.json())
      .catch(_ => {
        return [];
      });
  }

  public getComponentCategories(): Promise<Array<ComponentCategoryModel>> {
    return this.get(this.baseUrl + '/categories')
      .then(res => res.json())
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

  // Component
  deleteComponent(component: ComponentModel): Promise<Boolean> {
    return this.delete(`${this.baseUrl}/components/${component.ComponentId}`)
      .then(_ => {
        return true;
      })
      .catch(_ => {
        return false;
      });
  }

  createComponent(options: ComponentModel) {
    return this.post(`${this.baseUrl}/components`, JSON.stringify(options))
      .then(res => {
        return res.json();
      });
  }

  editComponent(model: ComponentModel) {
    return this.post(`${this.baseUrl}/components/${model.ComponentId}`, JSON.stringify(model))
      .then(res => {
        return res.json();
      });
  }

  searchForComponent(name: string): Promise<Array<ComponentModel>> {
    const params = {name: name};
    return this.post(`${this.baseUrl}/components/search`, JSON.stringify(params))
      .then(res => {
        return res.json();
      });
  }

  // Component category
  editComponentCategory(category: ComponentCategoryModel) {
    return this.put(`${this.baseUrl}/categories/${category.CategoryId}`, JSON.stringify(category))
      .then(res => {
      });
  }

  createComponentCategory(category: ComponentCategoryModel) {
    return this.post(`${this.baseUrl}/categories`, JSON.stringify(category))
      .then(res => {
      })
  }

  deleteComponentCategory(category: ComponentCategoryModel) {
    return this.delete(`${this.baseUrl}/categories/${category.CategoryId}`)
      .then(_ => {
        return true;
      })
      .catch(_ => {
        return false;
      });
  }

  // component type
  getComponentTypes(): Promise<Array<ComponentTypeModel>> {
    return this.get(`${this.baseUrl}/component_types`)
      .then((res) => {
        return res.json();
      });
  }

  createComponentType(model: ComponentTypeModel) {
    const params = JSON.stringify(model);
    return this.post(`${this.baseUrl}/component_types`, params)
      .then(res => {
        return res.json();
      });
  }

  getComponentsByCategory(category: ComponentCategoryModel) {
    return this.get(`${this.baseUrl}/components/1/categories/${category.CategoryId}`)
      .then(res => {
        return res.json();
      });
  }

  getComponentsByType(componentType: ComponentTypeModel) {
    return this.get(`${this.baseUrl}/component_types/${componentType.ComponentTypeId}`)
      .then(res => {
        return res.json();
      });
  }
}

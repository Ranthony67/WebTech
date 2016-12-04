import {Component, OnInit, Input} from '@angular/core';
import ComponentModel from "../models/component-model";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})

export class ComponentDetailComponent implements OnInit {
  @Input() component: ComponentModel;
  @Input() onDelete;
  @Input() onEdit;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
  }

  edit() {
    this.onEdit(this.component);
  }

  delete() {
    this.onDelete(this.component);
  }
}

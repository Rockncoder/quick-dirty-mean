import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'login',
  templateUrl: './templates/login.html',
  directives: [FORM_DIRECTIVES],
})

export class LoginComponent {
  public username:string;
  public password:string;

  constructor() {
    this.username = "Troy";
  }
}


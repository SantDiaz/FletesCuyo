import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  optionSelect: string;

  constructor(private routes: Router) { }

  ngOnInit() {}

  user(){
    this.routes.navigate(['/formUser1']);
  }

  fletero(){
    this.routes.navigate(['/formF1']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
})
export class Form1Component implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit() {}

  atras(){
    this.routes.navigate(['/register']);
  }

  siguiente(){
    this.routes.navigate(['/formF2']);
  }


  logs: string[] = [];

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    this.pushLog('ionChange fired with value: ' + e.detail.value);
  }

}

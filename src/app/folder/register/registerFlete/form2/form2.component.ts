import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
})
export class Form2Component implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit() {}
  atras(){
    this.routes.navigate(['/formF1']);
  }
  siguiente(){
    this.routes.navigate(['/formF3']);
  }
}

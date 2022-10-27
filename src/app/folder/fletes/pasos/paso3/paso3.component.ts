import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss'],
})
export class Paso3Component implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit() {}


  redi(){
    this.routes.navigate(['/paso3']);
  }

  rediBack(){
    this.routes.navigate(['/paso2']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss'],
})
export class Paso2Component implements OnInit {

  constructor(private routes: Router ) { }

  ngOnInit() {}

  redi(){
    this.routes.navigate(['/paso3']);
  }

  rediBack(){
    this.routes.navigate(['/fletes']);
  }

}

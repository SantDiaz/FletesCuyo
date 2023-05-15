import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso2-u',
  templateUrl: './paso2-u.component.html',
  styleUrls: ['./paso2-u.component.scss'],
})
export class Paso2UComponent implements OnInit {

  constructor(private routes: Router) { }



  ngOnInit() {}


  siguiente(){
    this.routes.navigate(['/paso3U']);
  }

}

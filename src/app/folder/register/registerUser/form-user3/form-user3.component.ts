import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user3',
  templateUrl: './form-user3.component.html',
  styleUrls: ['./form-user3.component.scss'],
})
export class FormUser3Component implements OnInit {


  constructor(private routes: Router) { }

  ngOnInit() {}
  atras(){
    this.routes.navigate(['/formUser1']);
  }

  siguiente(){
    this.routes.navigate(['/formUser3']);
  }
}

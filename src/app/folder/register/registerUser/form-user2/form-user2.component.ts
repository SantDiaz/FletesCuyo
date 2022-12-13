import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user2',
  templateUrl: './form-user2.component.html',
  styleUrls: ['./form-user2.component.scss'],
})
export class FormUser2Component implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit() {}
  atras(){
    this.routes.navigate(['/formUser1']);
  }

  siguiente(){
    this.routes.navigate(['/formUser3']);
  }
}

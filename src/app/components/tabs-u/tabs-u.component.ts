import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-u',
  templateUrl: './tabs-u.component.html',
  styleUrls: ['./tabs-u.component.scss'],
})
export class TabsUComponent implements OnInit {


  constructor(private routes: Router) { }

  ngOnInit() {}
  
  PedirFlete(){
    this.routes.navigate(['/fletes']);
  }

  Profile(){
    this.routes.navigate(['/profile`']);
  }

  Home(){
    this.routes.navigate(['/home`']);
  }
}

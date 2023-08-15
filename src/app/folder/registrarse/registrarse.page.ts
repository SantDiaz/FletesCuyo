import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  login: boolean = false;
  constructor(
    private router: Router,
  ) { }
  

  ngOnInit() {
  }
  user(){
    this.router.navigate(['/paso1U']);
  }


  fletero(){
    this.router.navigate(['/paso1F']);
  }

}

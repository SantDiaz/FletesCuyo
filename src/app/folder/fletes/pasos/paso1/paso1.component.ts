import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
})
export class Paso1Component implements OnInit {
  
  isModalOpen = false;
  
  constructor(private routes: Router) { }

  ngOnInit() {}

  redi(){
    this.routes.navigate(['/paso2']);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  

  @Input() user = "Quiero pedir un flete";
  @Input() fletero = "Soy fletero";
  @Output() newU = new EventEmitter<string>();
  @Output() newF = new EventEmitter<string>();

  constructor(private routes: Router) { }

  ngOnInit() {}

  siguiente(value: string){
    this.newU.emit(value);
    this.newF.emit(value);
    console.log(value);
    
    if (value == "User" ){
      this.routes.navigate(['/formF1']);
      console.log(value);
    }else{
      this.routes.navigate(['/formF2']);
      console.log(value);
    }
  }

}

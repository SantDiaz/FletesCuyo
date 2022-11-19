import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  valueSelected:string = "1";
  
  constructor() { }

  ngOnInit() {
  }
  
  segmentChanged(event: CustomEvent){
    this.valueSelected = event.detail.value;
    console.log(this.valueSelected);
  }
}

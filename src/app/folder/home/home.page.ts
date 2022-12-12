import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items = [];
  valueSelected:string = "1";
  
  constructor() { }

  ngOnInit() {
    for (let i = 1; i <8; i++) {
      this.items.push(`Item ${i}`);
    }
  }
  
  segmentChanged(event: CustomEvent){
    this.valueSelected = event.detail.value;
    console.log(this.valueSelected);
  }
}

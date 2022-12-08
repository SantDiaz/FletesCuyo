import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-log',
  templateUrl: './home-log.component.html',
  styleUrls: ['./home-log.component.scss'],
})
export class HomeLogComponent implements OnInit {


  valueSelected:string = "1";
  constructor() { }

  ngOnInit() {}


  
segmentChanged(event: CustomEvent){
  this.valueSelected = event.detail.value;
  console.log(this.valueSelected);
}
}

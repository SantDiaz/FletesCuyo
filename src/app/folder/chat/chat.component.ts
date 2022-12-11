import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  items = [];
  valueSelected:string = "1";
  constructor() { }
  isModalOpen = false;

  ngOnInit() {
    for (let i = 1; i < 31; i++) {
      this.items.push(`Item ${i}`);
    }
  }
  

  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
segmentChanged(event: CustomEvent){
  this.valueSelected = event.detail.value;
  console.log(this.valueSelected);
}

}

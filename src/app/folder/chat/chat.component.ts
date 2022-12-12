import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  isModalOpen = false;

  constructor() { }

  ngOnInit() {

  }
  
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  


}

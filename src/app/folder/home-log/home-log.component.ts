import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-log',
  templateUrl: './home-log.component.html',
  styleUrls: ['./home-log.component.scss'],
})
export class HomeLogComponent implements OnInit {

  // const switchers = [...document.querySelectorAll('.switcher')];

  // switchers: Document["querySelectorAll"];

  constructor() { }

  ngOnInit() {}

// click(){
//   switchers.forEach(item => {
//     item.addEventListener('click', function() {
//       switchers.forEach(item => item.parentElement.classList.remove('is-active'))
//       this.parentElement.classList.add('is-active')
//     })
//   })
// }

}

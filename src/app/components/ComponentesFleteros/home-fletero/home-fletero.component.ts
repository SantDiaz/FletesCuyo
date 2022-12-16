import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-fletero',
  templateUrl: './home-fletero.component.html',
  styleUrls: ['./home-fletero.component.scss'],
})
export class HomeFleteroComponent implements OnInit {

  constructor(  private router: Router,

    ) { }
  
    ngOnInit() {}
  
  
    pedirF(){
        this.router.navigate(['/paso1']);
    }
  
    ChatV(){
      this.router.navigate(['/chat']);
    }

}

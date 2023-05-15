import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;

  constructor( private auth: AuthService,
               private router: Router,
               
    ) {      
      this.auth.stateUser().subscribe( res => {
      if (res) {
           this.login = true;
      } else {
        this.login = false;
        
      }   
 })
}

  ngOnInit() {

  }

}

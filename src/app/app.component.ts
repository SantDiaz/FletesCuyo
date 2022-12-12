import { Component } from '@angular/core';
import { AuthService } from './folder/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private auth: AuthService,) {}

  logout(){
      this.auth.logout();
  }
}

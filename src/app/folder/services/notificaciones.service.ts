import { Injectable } from '@angular/core';
import { PushNotificationSchema,  } from '@capacitor/push-notifications';
import { AuthService } from './auth.service';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActionPerformed, PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private http: HttpClient
  ) { }

  async requestPushNotificationPermission() {
    if (this.platform.is('capacitor')) {
      const { receive } = await PushNotifications.requestPermissions();
      if (receive === 'granted') {
        PushNotifications.register();
        this.addListener(); // Llamar al método addListener en el contexto correcto
      }
    } else {
      console.log('Fallo');
    }
  }
  private addListener() {
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      // Manejar la acción realizada en la notificación aquí
      console.log('Push Notification Action Performed:', notification);
  
      // Puedes realizar acciones específicas según la acción realizada en la notificación
    });
  }
}

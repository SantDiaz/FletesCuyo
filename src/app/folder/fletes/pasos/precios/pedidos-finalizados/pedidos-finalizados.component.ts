import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, UserF, UserU, respuesta } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { FleteroServiceService } from 'src/app/folder/services/fletero-service.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';

@Component({
  selector: 'app-pedidos-finalizados',
  templateUrl: './pedidos-finalizados.component.html',
  styleUrls: ['./pedidos-finalizados.component.scss'],
})
export class PedidosFinalizadosComponent implements OnInit {

  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
  precios = []

  constructor(
          private auth: AuthService,
          private router: Router,
          private authS: AuthService,
          private interacion : InteractionService,
          private db: FirestoreService,
          private database: NuevoService,
          public toastController: ToastController,
          private loadingCtrl: LoadingController, 
          private fleteroService: FleteroServiceService


  ) { }

  ngOnInit() {


    this.auth.stateUser<UserU>().subscribe( res  => {

      if (res) {
        this.login = true;
            // Aquí puedes realizar acciones con la ruta del pedido
            
            //aqui quiero agregar las respuestas de los pedidos `PedirFlete/${res.uid}/Pedidos//${pedidoID}/Respuesta/${ID DEL USUARIO DEL FLETERO QUE QUIERO OBTENER}`
            this.database.getAll(`PedirFlete/${res.uid}/PedidosFinalizados/`).then((res) => {
              if (res && res.subscribe) {
                res.subscribe((resRef) => {
                  this.precios = resRef.map((pasosRef) => {
                    let pasosFlete = pasosRef.payload.doc.data();
                    pasosFlete['id'] = pasosRef.payload.doc.id;
                    return pasosFlete;
                  });
                });
              } else {
                console.log('La respuesta de this.database.getAll() no es un observable válido.');
                // Manejar el caso en el que res no sea un observable válido
              }
            });
            console.log(this.precios);
      } else {
        this.login = false;
         this.router.navigate(['/login'])
      }   
 })
  }


  async recomendarFletero(fletero: UserF) {
    if (fletero.recomendacion === 0) {
      // Incrementar el contador de recomendación del fletero
      fletero.recomendacion++;
      try {
        // Actualizar el fletero en la base de datos
        await this.fleteroService.actualizarFletero(fletero);
        // Mostrar un mensaje de éxito
        this.presentToast('Fletero recomendado con éxito');
      } catch (error) {
        console.error('Error al recomendar el fletero:', error);
        // Mostrar un mensaje de error si ocurre algún problema al actualizar el fletero
        this.presentToast('Error al recomendar el fletero');
      }
    } else {
      // Mostrar un mensaje de que el fletero ya ha sido recomendado
      this.presentToast('Este fletero ya ha sido recomendado anteriormente');
    }
  }
  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}


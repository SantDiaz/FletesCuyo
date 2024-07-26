import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ModalController } from '@ionic/angular'; // Import ModalController
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
  private formularioEnviado: boolean = false;
  autenticandoUsuario: boolean = false; // Define autenticandoUsuario
  isModalOpen: boolean = false; // Define isModalOpen
  respuestas: any[] = []; // Define respuestas
  botonVisible: boolean = true;
  constructor(
          private auth: AuthService,
          private router: Router,
          private authS: AuthService,
          private interacion : InteractionService,
          private db: FirestoreService,
          private database: NuevoService,
          public toastController: ToastController,
          private loadingCtrl: LoadingController, 
          private fleteroService: FleteroServiceService,
          private interaction : InteractionService,
          private modalController: ModalController,


  ) { }

  ngOnInit() {

    // const botonVisibleString = localStorage.getItem('botonVisible');
    // if (botonVisibleString === 'false') {
    //   this.botonVisible = false;
    // } else {
    //   this.botonVisible = true; // Si no se encuentra la variable en el almacenamiento local, mantener visible el botón por defecto
    // }

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
                    pasosFlete['recomendado'] = false; // Agregar la propiedad recomendado a cada objeto datos
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

  async recomendarFletero(idFletero: string) {
    const path = `Fleteros`; // Ruta del documento del fletero

    this.db.getDoc<UserF>(path, idFletero).subscribe(res2 => {
        if (res2) {
            // Verificar si el fletero ya ha sido recomendado
            if (res2.recomendacion) {
                if (!this.formularioEnviado) {
                    console.log("Este fletero ya ha sido recomendado anteriormente");
                    // Actualizar el campo recomendacion sumando 1 al valor actual
                    const nuevasRecomendaciones = res2.recomendacion + 1;
                    this.db.updateDoc(path, idFletero, {recomendacion: nuevasRecomendaciones})
                    this.formularioEnviado = true; // Establece la bandera en true
                    this.botonVisible = false; // Ocultar el botón después de recomendar
                    localStorage.setItem('botonVisible', 'false');
                    this.interaction.presentToast('Fletero recomendado exitosamente')
                }
            } else {
                if (!this.formularioEnviado) {
                    this.db.updateDoc(path, idFletero, {recomendacion: 1})
                    this.botonVisible = false; // Ocultar el botón después de recomendar
                    localStorage.setItem('botonVisible', 'false');
                    this.formularioEnviado = true; // Establece la bandera en true
                    this.interaction.presentToast('Fletero recomendado exitosamente')
                }
            }
        } else {
            this.interaction.presentToast('No se encontró el fletero en la base de datos')
        }
    });
}

    
    
    
    async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async cerrar(data: any) {
    await this.modalController.dismiss(data);
  }


  atras(){
    this.router.navigate(['/fletes'])

  }

}

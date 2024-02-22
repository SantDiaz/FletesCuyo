import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, UserF, UserU, datosVehiculo, respuesta } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { FleteroServiceService } from 'src/app/folder/services/fletero-service.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
// import { ChangeDetectorRef } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss'],
})
export class PreciosComponent implements OnInit {

  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
  precios = []
  precios2: DatosFlete[] = [];
  DatosF: UserF
  datosFl: DatosFlete
  datos2: DatosFlete
  datos: respuesta;
  rta2: respuesta;
  isModalOpen = false;
  respuestas: any[]; 
    enlacesWhatsApp:string[];
  fleteros: UserF[];
  fleteroSeleccionadoId: string;
  isRespuestasModalOpen: boolean = false;
  validacion : boolean = false
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
          // private cdr: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.validacion  = true

    // this.rta2.recomendado=false;
    this.fleteroService.getFleteros().subscribe((fleteros: UserF[]) => {
      this.enlacesWhatsApp = this.generateWhatsAppLink2(fleteros, '+54');
      console.log('Enlaces de WhatsApp:', this.enlacesWhatsApp);
    });
  
    this.auth.stateUser<UserU>().subscribe(res => {
      if (res) {
        this.login = true;
        const path = `PedirFlete/${res.uid}/Pedidos`;
  
        this.db.getAllPedidos().subscribe((pedidos: DatosFlete[]) => {
          pedidos.forEach((pedido) => {
            // Validar si el cargamento está vacío y eliminar el pedido
            if (!pedido.cargamento) {
              // Utiliza el operador take(1) para que la suscripción se complete después de emitir el primer valor
              interval(120000).pipe(
                take(3)
              ).subscribe(() => {
                this.db.deleteDoc(path, pedido.id);
                this.interacion.presentToast("Su pedido se elimino por no contener datos.")
                console.log('Pedido Eliminado por no tener datos:', pedido.id);
                this.validacion = false;
              });
            } else {
              const pedidoID = pedido.id;
              const rutaPedido = `PedirFlete/${res.uid}/Pedidos/`;
              // const rutaPedido = `PedirFlete/${res.uid}/Pedidos/${pedidoID}`;
  
              // Resto del código relacionado con el pedido
              // ...
  
              // Aquí puedes agregar las respuestas de los pedidos
              this.database.getAll(rutaPedido).then((res) => {
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
            }
          });
        });
      } else {
        this.login = false;
        this.router.navigate(['/login']);
      }
    });
  }
  
// Llama a detectChanges() después de calcular el número de respuestas
// ngAfterViewInit() {
//   this.cdr.detectChanges();
// }

  getDatos(rta: respuesta) {
    const path = 'Fleteros';
    const id = rta.idFletero;
    this.db.getDoc<UserF>(path, id).subscribe( res => {
      if (res ) {
        this.DatosF = res;
        const fleteroId = res.uid
        // this.openWhatsApp(fleteroId)
        }
    })
  }
  
  getDatosFf(rta: respuesta) {
    const path = 'Fleteros';
    const id = rta.idFletero;
    this.db.getDoc<UserF>(path, id).subscribe( res => {
      if (res ) {
        this.DatosF = res;
        const fleteroId = res.uid
        
        // this.openWhatsApp(fleteroId)
        }
    })
  }
  openWhatsApp(respuesta: any,) {
    if (respuesta && respuesta.telefono) {
      // Remove any non-numeric characters and spaces from the phone number
      const telefono = respuesta.telefono.replace(/[^0-9]/g, '');
  
      if (telefono.length > 0) {
        // Assuming the country code is +54 (Argentina), you can customize this
        const countryCode = '+54';
  
        // Obtén el mensaje del pedido desde la respuesta (ajusta esto según cómo estén estructurados tus datos)
        const pedidoMensaje = respuesta.mensajePedido || 'Mensaje predeterminado si no hay mensaje de pedido';
  
        // Crea el mensaje completo para WhatsApp, incluyendo el mensaje del pedido
        const message = `Hola, ha respondido a mi pedido. Mi pedido es el siguiente:\n\n${pedidoMensaje}`;
  
        // Create the WhatsApp link with the phone number and message
        const whatsappLink = `https://wa.me/${countryCode}${telefono}?text=${encodeURIComponent(message)}`;
  
        // Log the WhatsApp link for debugging
        console.log('WhatsApp Link:', whatsappLink);
  
  
        
      } else {
        console.log('El número de teléfono no es válido.');
      }
    } else {
      console.log('No se proporcionó un número de teléfono válido para abrir WhatsApp.');
    }
  }

  async moverPedidoAPedidosFinalizados(pedido: DatosFlete, rta: respuesta) {
    rta.recomendado = false;
    // Muestra una alerta antes de abrir WhatsApp
    this.interacion.presentAlert(
      'Confirmar pedido',
      'Tu pedido desaparecera para los fleteros ¿Deseas continuar?',
    ).then((aceptar) => {
      if (aceptar) {
        try {
          const exito = this.db.movePedidoToPedidosHechos(pedido, rta);
          // Llama al método de tu servicio para mover el pedido
  
          if (exito) {
            // Crea el enlace de WhatsApp aquí
            const whatsappLink = this.generateWhatsAppLink(rta);
            
            // Abre WhatsApp en una nueva ventana o pestaña
            window.open(whatsappLink, '_blank');
  
            // Cierra el modal de respuestas
            this.cerrar(false);
            this.router.navigate(['/home']);
            // El pedido se movió con éxito, puedes mostrar un mensaje o realizar otras acciones si es necesario
            console.log('Pedido movido a Pedidos Finalizados correctamente');
          } else {
            // Maneja el caso en que ocurra un error al mover el pedido
            console.error('Error al mover el pedido');
          }
        } catch (error) {
          // Maneja cualquier error que pueda ocurrir al mover el pedido
          console.error('Error al mover el pedido:', error);
        }
      } else {
        // El usuario canceló la acción
      }
    });
  }
  
  
  generateWhatsAppLink(respuesta: any) {
    if (respuesta && respuesta.telefono) {
      // Remove any non-numeric characters and spaces from the phone number
      const telefono = respuesta.telefono.replace(/[^0-9]/g, '');
  
      if (telefono.length > 0) {
        // Assuming the country code is +54 (Argentina), you can customize this
        const countryCode = '+54';
  
        // Obtén el mensaje del pedido desde la respuesta (ajusta esto según cómo estén estructurados tus datos)
        const pedidoMensaje = respuesta.mensajePedido || 'Mensaje predeterminado si no hay mensaje de pedido';
  
        // Crea el mensaje completo para WhatsApp, incluyendo el mensaje del pedido
        const message = `Hola, ha respondido a mi pedido. Mi pedido es el siguiente:\n\n${pedidoMensaje}`;
  
        // Crea el enlace de WhatsApp con el número de teléfono y el mensaje
        const whatsappLink = `https://wa.me/${countryCode}${telefono}?text=${encodeURIComponent(message)}`;
  
        return whatsappLink;
      } else {
        console.log('El número de teléfono no es válido.');
      }
    } else {
      console.log('No se proporcionó un número de teléfono válido para abrir WhatsApp.');
    }
  }
  
  
  
  obtenerEnlaces() {
    this.fleteroService.getFleteros().subscribe((fleteros: UserF[]) => {
      // fleteros
      this.enlacesWhatsApp = this.generateWhatsAppLink2(fleteros, '+54');
      console.log('Enlaces de WhatsApp:', this.enlacesWhatsApp);
    });
  }

  generateWhatsAppLink2(fleteros: UserF[], countryCode: string) {
    console.log('fleteros:',fleteros);
    const message = 'Hola, estoy interesado en solicitar un flete.'; // Mensaje predeterminado
  
    const formattedMessage = encodeURIComponent(message); // Codifica el mensaje para asegurar caracteres especiales
  
    const whatsappLinks = fleteros.map(fletero => {
      const phoneNumber = fletero && fletero.telefono ? fletero.telefono.replace(/\s/g, '') : '';
      if (phoneNumber) {
        const phoneNumberWithPrefix = `${countryCode}${phoneNumber}`;
        return `https://wa.me/${phoneNumberWithPrefix}?text=${formattedMessage}`;
      }
      return ''; // O puedes manejarlo de otra manera si no hay un número de teléfono válido.
    });
  
    return whatsappLinks;
  }
  
  VerPedidoss(){
    this.router.navigate(['/pedidosFinalizados']);

  }

verPedidos(isOpen: boolean, pedido: DatosFlete) {
  this.isModalOpen = isOpen;
  this.datos2 = pedido; // Asigna los detalles del pedido al campo datos2
  this.cargarRespuestas(pedido.id, pedido.uid)
}


cargarRespuestas(pedidoId: string, pedidoUser: string) {
  this.auth.stateUser<UserU>().subscribe((res) => {
    if (res) {
      // Utiliza la función adecuada para obtener las respuestas desde tu base de datos
      // Asegúrate de que las respuestas se almacenen en la variable respuestas.
      // Por ejemplo:
      this.database
      .getAll(`PedirFlete/${pedidoUser}/Pedidos/${pedidoId}/Respuesta`)
      .then((observablePromise) => {
        if (observablePromise && observablePromise.subscribe) {
          observablePromise.subscribe((resRef) => {
            if (resRef) {
              console.log('respuesta', resRef);
              this.respuestas = resRef.map((respuestaRef) => {
                return respuestaRef.payload.doc.data();
              });
            } else {
              console.log('no responde nada');
              // Manejar el caso en que resRef sea undefined o null
            }
          });
        } else {
          console.log('observablePromise es undefined o no tiene subscribe');
          // Manejar el caso en que observablePromise sea undefined o no tenga subscribe
        }
      });
    }
      });
    
    
}


contarRespuestas(): number {
  if (this.respuestas) {
    return this.respuestas.length;
  } else {
    return 0; // o cualquier otro valor por defecto según tu lógica
  }
}

  cerrar(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }






}


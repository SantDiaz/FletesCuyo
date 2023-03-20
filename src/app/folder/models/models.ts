import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface UserU {
    uid: string;
    nombre: string;
    apellido: string;
    dni: string;
    edad: string;
    domicilio: string;
    telefono: string;
    image: string; 
    email: string;
    password: string;
    perfil: 'Usuario' | 'Admin',
    // | 'Fletero'| 'Admin' 
  }

  export interface UserF {
    uid: string;
    nombre: string;
    apellido: string;
    dni: string;
    edad: string;
    domicilio: string;
    telefono: string;
    image: string; 
    email: string;
    password: string;
    perfil:  'Fletero',
    datosVehiculos: datosVehiculo;
  }
  
  export interface datosVehiculo {
    uid: string;
    tipoVehiculo:  'Camioneta' | 'Camion' | 'Utilitario';
    marca: string;
    modelo: string;
    patente: number;
  }




  export interface DatosFlete {
    fecha: number;
    hora: '5 AM' | '6 AM' | '7 AM'|' 8 AM' | '9 AM' | '10 AM'|' 11 AM' | '12 AM' | '13 PM'|' 14 PM' | '15 PM' | '16 PM'|' 17 PM' | '18 PM' | '19 PM'|' 20 PM' | '21 PM' | '22 PM'|' 23 PM' ;
    minutos: '00' | '15'|' 30' | '45';
    uDesde: string;
    uHasta: string;
    cargamento: string;
    tipoVehiculo: 'Camioneta' | 'Camion' | 'Utilitario' ;
    ayudantes:  'Sin ayudantes' | '+1 Ayudantes' | '+2 Ayudantes'  | '+3 Ayudantes' ;
    uid: string;
    id: string
    precio: number
  }
  export const hora = ['5 AM' , '6 AM' , '7 AM',' 8 AM' , '9 AM' , '10 AM',' 11 AM' , '12 AM' , '13 PM',' 14 PM' , '15 PM' , '16 PM',' 17 PM' ,'18 PM' , '19 PM',' 20 PM' , '21 PM' , '22 PM',' 23 PM'];
  export const minutos = ['00' , '15' , '30', '45'];
  export const tipoVehiculo = ['Camioneta' , 'Camion' , 'Utilitario'];
  export const ayudantes = ['Sin ayudantes' , '+1' , '+2'];
export const datosVehiculo =  []


export interface Pasos {
  id: string;
  nombre: string;
  dni: string;
  direccion: string;
  telefono: number;
}

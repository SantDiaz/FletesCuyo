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
    fecha: Timestamp<24>;
    hora: number;
    uDesde: string;
    uHasta: string;
    cargamento: string;
    tipoVehiculo: 'Camioneta' | 'Camion' | 'Utilitario' ;
    ayudantes:  'Sin ayudantes' | '+1 Ayudantes' | '+2 Ayudantes'  | '+3 Ayudantes' ;
    id: string;
    
  }

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

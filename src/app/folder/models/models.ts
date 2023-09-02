

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
    perfil: 'Usuario' ;
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
    perfil:  'Fletero';
    datosVehiculos: datosVehiculo;
    verificado: boolean;
    // provincia: provincias
  }
  
  export interface datosVehiculo {
    uid: string;
    tipoVehiculo:  'Camioneta' | 'Camion' | 'Utilitario';
    marca: string;
    modelo: string;
    patente: number;
    imagePatente: string; 
  }




  export interface DatosFlete {
    id: string;
    nombre: string;
    apellido: string;
    fecha: string;
    hora: number;
    minutos: number;
    // hora: '5 ' | '6 ' | '7 '|' 8 ' | '9 ' | '10 '|' 11 ' | '12 ' | '13 '|' 14 ' | '15 ' | '16 '|' 17 ' | '18 ' | '19 '|' 20 ' | '21 ' | '22 '|' 23 ' ;
    // minutos: '00' | '15'|' 30' | '45';
    uDesde: string;
    uHasta: string;
    cargamento: string;
    tipoVehiculo: 'Camioneta' | 'Camion' | 'Utilitario' ;
    ayudantes:  'Sin ayudantes' | '+1 Ayudantes' | '+2 Ayudantes'  | '+3 Ayudantes' ;
    uid: string;
    tiempoTranscurrido?: string;
    precio: number;
    }

  export interface respuesta {
    id: string;
    idFletero: string;
    nombre: string;
    apellido: string;
    precio: string; 
    mensaje: string;
    precioEnviado: boolean; // Agrega esta propiedad

  }

  export interface Opiniones{
    id: string;
    nombre: string
    apellido: string
    mensaje: string
    perfil: 'Usuario' | 'Fletero';
  }



export const provincias = [ 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy',
 'La Pampa', 'La Rioja', 'Mendoza', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'Santa Cruz', 'Santa Fe',
  'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'];

  export const hora = ['5 ' , '6 ' , '7 ',' 8 ' , '9 ' , '10 ',' 11 ' , '12 ' , '13 ',' 14 ' , '15 ' , '16 ',' 17 ' ,'18 ' , '19 ',' 20 ' , '21 ' , '22 ',' 23 '];
  export const minutos = ['00' , '15' , '30', '45'];
  export const tipoVehiculo = ['Camioneta' , 'Camion' , 'Utilitario'];
  export const ayudantes = ['Sin ayudantes' , '+1' , '+2',  '+3 '];
export const datosVehiculo =  []


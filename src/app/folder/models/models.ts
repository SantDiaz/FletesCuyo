
export interface UserU {
  uid: string;
  nombre: string;
  apellido: string;
  dni: string;
  edad: number;
  domicilio: string;
  // provincia: 'Buenos Aires' | 'Catamarca'| 'Chaco'| 'Chubut'| 'Córdoba'| 'Corrientes'| 'Entre Ríos'| 'Formosa'| 'Jujuy'
  // |'La Pampa' | 'La Rioja'| 'Mendoza'| 'Mendoza'| 'Misiones'| 'Neuquén'| 'Río Negro'| 'Salta'| 'San Juan'| 'Santa Cruz'| 'Santa Fe'| 'San
  // |'Santiago del Estero'| 'Tierra del Fuego'| 'Tucumán';
  telefono: string;
  image: string; 
  email: string;
  password: string;
  perfil: 'Usuario' ;
  codeVeri?: string;
  // | 'Fletero'| 'Admin' 
}
export interface UserA {
  uid: string;
  nombre: string;
  apellido: string;
  dni: string;
  edad: number;
  domicilio: string;
  // provincia: 'Buenos Aires' | 'Catamarca'| 'Chaco'| 'Chubut'| 'Córdoba'| 'Corrientes'| 'Entre Ríos'| 'Formosa'| 'Jujuy'
  // |'La Pampa' | 'La Rioja'| 'Mendoza'| 'Mendoza'| 'Misiones'| 'Neuquén'| 'Río Negro'| 'Salta'| 'San Juan'| 'Santa Cruz'| 'Santa Fe'| 'San
  // |'Santiago del Estero'| 'Tierra del Fuego'| 'Tucumán';
  telefono: string;
  image: string; 
  email: string;
  password: string;
  perfil:  'Fletero'| 'Fletero'| 'Admin';
  datosVehiculos: datosVehiculo;
  verificado: boolean;
  habilitado: boolean;
  recomendacion: number;
  usuariosRecomendados?: string[]; // Define la propiedad como un array de strings opcionales
  codeVeri?: string;
  // provincia: provincias
}

  export interface UserF {
    uid: string;
    nombre: string;
    apellido: string;
    dni: string;
    edad: number;
    domicilio: string;
    // provincia: 'Buenos Aires' | 'Catamarca'| 'Chaco'| 'Chubut'| 'Córdoba'| 'Corrientes'| 'Entre Ríos'| 'Formosa'| 'Jujuy'
    // |'La Pampa' | 'La Rioja'| 'Mendoza'| 'Mendoza'| 'Misiones'| 'Neuquén'| 'Río Negro'| 'Salta'| 'San Juan'| 'Santa Cruz'| 'Santa Fe'| 'San
    // |'Santiago del Estero'| 'Tierra del Fuego'| 'Tucumán';
    telefono: string;
    image: string; 
    email: string;
    password: string;
    perfil:  'Fletero';
    datosVehiculos: datosVehiculo;
    verificado: boolean;
    habilitado: boolean;
    recomendacion: number;
    usuariosRecomendados?: string[]; // Define la propiedad como un array de strings opcionales
    codeVeri?: string;
    // provincia: provincias
  }
  
  export interface datosVehiculo {
    uid: string;
    tipoVehiculo: 'Camioneta' | 'Camion' | 'Grua' | 'Furgonetas' | 'Camiones frigoríficos' | 'Otro...'  ;
    marca: string;
    ano: string;
    modelo: string;
    patente: string;
    imagePatente: string; 
    imageDni: string; 
    imageCarnet: string; 
    imageDniDorzal: string;
    imageCarnetDorzal: string;
  }




  export interface DatosFlete {
    id: string;
    nombre: string;
    apellido: string;
    fecha: string;
    hora: number;
    minutos: number;
    startCoordinates?: { latitude: number; longitude: number };
    endCoordinatesP?: { latitude: number; longitude: number };
    uDesde: string;
    uHasta: string;
    km?: number;
    cargamento: string;
    tipoVehiculo: 'Camioneta' | 'Camion' | 'Grua' | 'Furgonetas' | 'Camiones frigoríficos' | 'Otro...'  ;
    ayudantes:  'Sin ayudantes' | '+1 ayudantes' | '+2 ayudantes'  | '+3 ayudantes' ;
    uid: string;
    tiempoTranscurrido?: string;
    precio: number;
     visible?: { [fleteroId: string]: boolean };
     image?: string
     timestamp?: Date; // Añade esta línea
    }

  export interface respuesta {
    id: string;
    idFletero: string;
    nombre: string;
    apellido: string;
    precio: number; 
    telefono: string;
    mensaje: string;
    precioEnviado: boolean; // Agrega esta propiedad
    recomendado?: boolean; // Agrega esta propiedad
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
  export const tipoVehiculo = ['Camioneta' , 'Camion' , 'Grua' , 'Furgonetas' , 'Camiones frigoríficos' , 'Otro...' ];
  export const ayudantes = ['Sin ayudantes' , '+1 ayudantes' , '+2 ayudantes'  , '+3 ayudantes'];
export const datosVehiculo =  []


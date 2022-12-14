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
  }

  export interface Chat {
    id?: string;
    message: string;
    name: string;
    rol: string;
  }
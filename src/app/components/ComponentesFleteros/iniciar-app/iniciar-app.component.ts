import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciar-app',
  templateUrl: './iniciar-app.component.html',
  styleUrls: ['./iniciar-app.component.scss'],
})
export class IniciarAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setupCopyToClipboard();
  }

  setupCopyToClipboard() {
    const etiqueta = document.getElementById('miEtiqueta');

    if (!etiqueta) {
      console.error('No se encontró la etiqueta con el ID "miEtiqueta".');
      return;
    }

    let tiempoPresionado: number;

    etiqueta.addEventListener('mousedown', () => {
      tiempoPresionado = window.setTimeout(() => {
        this.copiarContenido(etiqueta);
      }, 1000); // Cambia el tiempo en milisegundos según tus preferencias
    });

    etiqueta.addEventListener('mouseup', () => {
      clearTimeout(tiempoPresionado);
    });
  }

  copiarContenido(elemento: HTMLElement) {
    const contenido = elemento.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = contenido;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);

    alert('Contenido copiado al portapapeles: ' + contenido);
  }
}

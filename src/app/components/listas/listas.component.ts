import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/pages/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;


  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {
    if(this.terminada) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }
    // console.log(lista)
  }
  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text', 
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [ 
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            // console.log(data);
            if( data.titulo.length === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}

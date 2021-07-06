import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/pages/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() teminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {
    if(this.teminada) {
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }
    console.log(lista)
    
  }

}

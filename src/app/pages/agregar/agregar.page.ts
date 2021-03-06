import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';
  constructor( private deseosService: DeseosService,
               private route: ActivatedRoute) { 
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
    // console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem() {
    if( this.nombreItem.length === 0 ) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck( item: ListaItem ) {
    // console.log(item);
    const pendientes =  this.lista.items
                        .filter(itemData => !itemData.completado)
                        .length;
    if( pendientes === 0 ){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminada = null;
      this.lista.terminada = false;
    }

    // console.log({pendientes});
    this.deseosService.guardarStorage();

    // console.log(this.deseosService.listas);
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }

}

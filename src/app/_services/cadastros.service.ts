import { Injectable } from '@angular/core';
import { Bolsas } from '../_interfaces/bolsas';

@Injectable({
  providedIn: 'root'
})
export class CadastrosTsService {

  cadastros: Bolsas[]= []

  constructor() { }

  adicionarCadastro(cadastrosBolsas : Bolsas){
    this.cadastros.push( {...cadastrosBolsas} );
  }
}

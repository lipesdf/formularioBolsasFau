import { Component } from '@angular/core';
import { PrimarButtonComponent } from '../../_components/primar-button/primar-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bolsas } from '../../_interfaces/bolsas';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgxMaskDirective } from 'ngx-mask';
import { CadastrosTsService } from '../../_services/cadastros.service';
import { ViacepService } from '../../_services/viacep.service';

@Component({
  selector: 'app-cadastro-form',
  imports: [PrimarButtonComponent, FormsModule, ReactiveFormsModule, NgxCurrencyDirective, NgxMaskDirective],
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']

})
export class CadastroFormComponent {

  bolsas: Bolsas | undefined;
  formulario: FormGroup;
  projetos: string[] = [
    "DIREX.DIREX.001 - DIRETORIA EXECUTIVA FUNDAÇÃO DE APOIO UNIVERSITÁRIO", 
    "DIREX.DIREX.002 - SETOR TECNOLOGICO FUNDAÇÃO DE APOIO UNIVERSITÁRIO"
  ];

  uf: string[] = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  opcoesMoeda = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    align: 'left',
    max: 10000,
  };

  constructor(private fb: FormBuilder, private cadastrosService: CadastrosTsService, private viacep: ViacepService) {
    this.formulario = this.fb.group({
      projeto: ['', [Validators.required]],
      nome: ['', [ Validators.required, Validators.minLength(3) ]],
      cpf: ['',[ Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/) ]],
      email:['',[ Validators.required, Validators.email ]],
      telefone:['', [ Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/) ]],
      cep: ['',[ Validators.required, Validators.pattern(/^\d{5}-\d{3}$/) ]],
      endereco: ['',[ Validators.required]],
      numero: [null, [ Validators.required, Validators.pattern("^[0-9]{1,6}$")]],
      bairro: ['', [ Validators.required]],
      cidade: ['',[ Validators.required]],
      estadoSelecionado: ['',[ Validators.required]],
      tipoConta: [''],
      chavePix: ['',[ Validators.required]],
      valor: ['', [ Validators.required ]],
    });
  }

  dataAtual(){
    const dataAtual = new Date();

    const hora = String(dataAtual.getHours());
    const minuto = String(dataAtual.getMinutes());
    const segundos = String(dataAtual.getSeconds());

    const dia = String(dataAtual.getDay()).padStart(2, '0');
    const mes = String(dataAtual.getMonth()).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${hora}:${minuto}:${segundos} ${dia}/${mes}/${ano}`

    return dataFormatada
  }

  submit(){
    
    if(!this.formulario.valid){
      this.formulario.markAllAsTouched();
      return
    }

    this.bolsas ={

      projeto: this.formulario.get('projeto')?.value,
      nome: this.formulario.get('nome')?.value,
      cpf: this.formulario.get('cpf')?.value,
      cep: this.formulario.get('cep')?.value,
      endereco: this.formulario.get('endereco')?.value,
      numero: this.formulario.get('numero')?.value,
      bairro: this.formulario.get('bairro')?.value,
      cidade: this.formulario.get('cidade')?.value,
      estadoSelecionado: this.formulario.get('estadoSelecionado')?.value,
      tipoConta: this.formulario.get('tipoConta')?.value,
      chavePix: this.formulario.get('chavePix')?.value,
      valor: this.formulario.get('valor')?.value,
      dataSubmissao: this.dataAtual(),

    }

    this.cadastrosService.adicionarCadastro(this.bolsas);

    console.log(this.cadastrosService)
  }

  ngOnInit(): void {
    this.campoCep()
  }

  campoCep(){
    this.formulario.get('cep')?.valueChanges.subscribe(value => {
      const cepSemhifen = value?.replace(/-/g, '')
      if (cepSemhifen?.length === 8){
        this.buscarCep();
      }
    })
  }

  buscarCep(){
    var cepForm = this.formulario.get('cep')?.value
    var cep = cepForm.replace(/-/g, "")
    this.viacep.getEnderecoCep(cep).subscribe({
      next: (response) =>{
        this.formulario.patchValue({
          endereco: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estadoSelecionado: response.uf,
        })
      },

      error:() => {
        console.log("Erro ao buscar o cep")
      }

    })
  }
}

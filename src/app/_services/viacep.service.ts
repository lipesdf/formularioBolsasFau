import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViacepResultado } from '../_models/ViacepResultado';
import { map } from 'rxjs';
import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ViacepService {

   apiUrl: string = environment.viaCepUrl;

  constructor(private http: HttpClient) {}

  getEnderecoCep(cep: string){
    return this.http.get<ViacepResultado>
    
    (this.apiUrl + cep + "/json")
    .pipe(
      map((response)=>{
        return response
      })
    )
  }
}

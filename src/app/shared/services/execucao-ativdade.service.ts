
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExecucaoAtividade } from '../models/execucao-atividade';

@Injectable({
  providedIn: 'root'
})
export class ExecucaoAtividadeService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<ExecucaoAtividade> {
    return this.http.get<ExecucaoAtividade>(this.getUrlApi() + this.getEndpointExecucaoAtividade(),
      { headers: this.getHeadersWithUserAuthorization() });
  }

  getById(id: number) {
    return this.http.get<ExecucaoAtividade>(this.getUrlApi() + this.getEndpointExecucaoAtividade() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  save(execucaoAtividade: ExecucaoAtividade) {
    return this.http.post<ExecucaoAtividade>(this.getUrlApi() + this.getEndpointExecucaoAtividade(), execucaoAtividade,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  update(execucaoAtividade: ExecucaoAtividade) {
    return this.http.put<ExecucaoAtividade>(this.getUrlApi() + this.getEndpointExecucaoAtividade(), execucaoAtividade,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  delete(id: number) {
    return this.http.delete(this.getUrlApi() + this.getEndpointExecucaoAtividade() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }
}

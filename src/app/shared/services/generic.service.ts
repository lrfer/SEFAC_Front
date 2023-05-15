import { Aluno } from 'src/app/shared/models/aluno.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  _environment: any;

  constructor() {
    this._environment = environment;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });
  }

  getHeadersWithUserAuthorization(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, GET, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'Origin,Authorization, Content-Type, Access-control-allow-origin',
    });
  }

  getUrlApi(): string {
    return this._environment.URL_API;
  }

  getEndpointLogin(): string {
    return this._environment.LOGIN;
  }

  getEndpointExecucaoAtividade(): string {
    return this._environment.EXECUCAO_ATIVIDADE;
  }

  getEndpointAluno(): string {
    return this._environment.ALUNO;
  }

}

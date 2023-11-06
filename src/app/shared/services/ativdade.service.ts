import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atividade } from '../models/atividade.model';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService extends GenericService {
  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Atividade> {
    return this.http.get<Atividade>(
      this.getUrlApi() + this.getEndpointAtividade(),
      { headers: this.getHeadersWithUserAuthorization() }
    );
  }

  getById(id: number) {
    return this.http.get<Atividade>(
      this.getUrlApi() + this.getEndpointAtividade() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() }
    );
  }

  save(atividade: Atividade) {
    return this.http.post<Atividade>(
      this.getUrlApi() + this.getEndpointAtividade(),
      atividade,
      { headers: this.getHeadersWithUserAuthorization() }
    );
  }

  update(atividade: Atividade) {
    return this.http.put<Atividade>(
      this.getUrlApi() + this.getEndpointAtividade(),
      atividade,
      { headers: this.getHeadersWithUserAuthorization() }
    );
  }

  delete(id: number) {
    return this.http.delete(
      this.getUrlApi() + this.getEndpointAtividade() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() }
    );
  }
}

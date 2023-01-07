
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../models/aluno.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Aluno> {
    return this.http.get<Aluno>(this.getUrlApi() + this.getEndpointAluno(),
      { headers: this.getHeadersWithUserAuthorization() });
  }

  getById(id: number) {
    return this.http.get<Aluno>(this.getUrlApi() + this.getEndpointAluno() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  save(aluno: Aluno) {
    return this.http.post<Aluno>(this.getUrlApi() + this.getEndpointAluno(), aluno,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  update(aluno: Aluno) {
    return this.http.put<Aluno>(this.getUrlApi() + this.getEndpointAluno(), aluno,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  delete(id: number) {
    return this.http.delete(this.getUrlApi() + this.getEndpointAluno() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }
}

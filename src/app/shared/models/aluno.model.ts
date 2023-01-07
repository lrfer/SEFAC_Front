export class Aluno{
  id: number;
  numeroMatricula: string;
  nome: string;
  codigoCurso:string

  constructor(aluno?:Aluno){
    this.id = aluno?.id ? aluno.id : 0;
    this.numeroMatricula = aluno?.numeroMatricula ? aluno.numeroMatricula : '';
    this.nome = aluno?.nome ? aluno.nome : '';
    this.codigoCurso = aluno?.codigoCurso ? aluno.codigoCurso : '';
  }
}

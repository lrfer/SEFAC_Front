export class ExecucaoAtividade {
  id: number;
  nome: string;
  cargaHoraria: number;
  duracao: number;
  dataInicio: Date;
  dataFim: Date;
  idAluno: number;

  constructor(execucao?:ExecucaoAtividade){

    this.id = execucao?.id ? execucao.id : 0;
    this.duracao = execucao?.cargaHoraria ? execucao.cargaHoraria : 0;
    this.duracao = execucao?.duracao ? execucao.duracao : 0;
    this.nome = execucao?.nome ? execucao.nome : '';
    this.dataInicio = execucao?.dataInicio ? execucao.dataInicio : new Date();
    this.dataFim = execucao?.dataFim ? execucao.dataFim : new Date();
    this.idAluno = execucao?.idAluno ? execucao.idAluno : 0;
  }
}

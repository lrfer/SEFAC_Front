import { DatePipe } from '@angular/common';

export class ExecucaoAtividade {
  id: number;
  nome: string;
  cargaHoraria: number;
  duracao: number;
  dataInicio: Date;
  dataFim: Date;
  idAluno: number;
  idAtividade: number;
  nomeAtividade: string;

  dataInicio_Fim: string;
  nomeAluno: string;

  constructor(execucao?: ExecucaoAtividade) {
    this.id = execucao?.id ? execucao.id : 0;
    this.cargaHoraria = execucao?.cargaHoraria ? execucao.cargaHoraria : 0;
    this.duracao = execucao?.duracao ? execucao.duracao : 0;
    this.nome = execucao?.nome ? execucao.nome : '';
    this.nomeAluno = execucao?.nomeAluno ? execucao.nomeAluno : '';
    this.dataInicio = execucao?.dataInicio ? execucao.dataInicio : new Date();
    this.dataFim = execucao?.dataFim ? execucao.dataFim : new Date();
    this.idAluno = execucao?.idAluno ? execucao.idAluno : 0;
    this.idAtividade = execucao?.idAtividade ? execucao.idAtividade : 0;
  }
}

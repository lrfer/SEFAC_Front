import { ExecucaoAtividade } from './execucao-atividade';

export class Atividade {
  codigoSiex: string;
  id: number;
  descricao: string;
  documento?: Documento;
  documento_base64?: string;

  documento_id?: number;

  execucoesAtividades: ExecucaoAtividade[];

  constructor(atividade?: Atividade) {
    this.codigoSiex = atividade?.codigoSiex ? atividade?.codigoSiex : '';
    this.id = atividade?.id ? atividade.id : 0;
    this.descricao = atividade?.descricao ? atividade.descricao : '';
    this.execucoesAtividades = atividade?.execucoesAtividades
      ? atividade.execucoesAtividades
      : [];
    this.documento_base64 = atividade?.documento_base64
      ? atividade?.documento_base64
      : '';
  }
}
export class Documento {
  id: number;
  arquivo: any;
  atividade_id: number;
}

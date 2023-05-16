
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoMessagem } from 'src/app/shared/enum/tipo-messagem.enum';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { MessageService } from 'primeng/api';
import { ExecucaoAtividade } from 'src/app/shared/models/execucao-atividade';
import { ExecucaoAtividadeService } from 'src/app/shared/services/execucao-ativdade.service';
import { Aluno } from 'src/app/shared/models/aluno.model';
import { AlunoService } from 'src/app/shared/services/aluno.service';


const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-execucao-atividade-form',
  templateUrl: './execucao-atividade-form.component.html',
  styleUrls: ['./execucao-atividade-form.component.css']
})
export class ExecucaoAtividadeFormComponent implements OnInit {


  execucaoAtividadeForm: FormGroup;
  alunos: Aluno[];
  execucaoAtividade: ExecucaoAtividade;
  execucaoAtividadeId: number;
  title: string;

  showMenuFiltro: boolean;
  disabledField: boolean;

  constructor(private formBuilder: FormBuilder,
    private execucaoAtividadeService: ExecucaoAtividadeService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private alunoService: AlunoService
    ) {
    this.execucaoAtividadeForm = this.execucaoAtividadeFormGroup();
  }

  ngOnInit() {
    this.init();
  }

  execucaoAtividadeFormGroup() {
    return this.formBuilder.group({
      id: new FormControl(0),
      nome: new FormControl('',[Validators.maxLength(255),Validators.required]),
      cargaHoraria: new FormControl('',[Validators.required]),
      duracao: new FormControl('',[Validators.required]),
      dataInicio: new FormControl(new Date(year,month), [Validators.required]),
      dataFim: new FormControl(new Date(year,month), [Validators.required]),

      idAluno: new FormControl('', [Validators.required]),
    });
  }

  execucaoAtividadeFormGroupEdit() {
    this.execucaoAtividadeForm.patchValue({
      id:this.execucaoAtividade.id,
      nome:this.execucaoAtividade.nome,
      cargaHoraria:this.execucaoAtividade.cargaHoraria,
      duracao:this.execucaoAtividade.duracao,
      dataInicio:this.execucaoAtividade.dataInicio,
      dataFim:this.execucaoAtividade.dataFim,

      idAluno:this.execucaoAtividade.idAluno
    });
  }

  get f() { return this.execucaoAtividadeForm.controls; }

  submit() {

    this.execucaoAtividade = new ExecucaoAtividade(this.execucaoAtividadeForm.value);
    if (this.execucaoAtividade.id && this.execucaoAtividade.id !== 0) {
      this.updateAluno();
    } else {
      this.saveAluno();
    }
  }

  saveAluno() {
    this.execucaoAtividadeService.save(this.execucaoAtividade).subscribe((data: ExecucaoAtividade) => {
      this.execucaoAtividade = data;

      const route = this.translate.instant('routes.execucaoAtividade.list');
      this.router.navigate([route]);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  updateAluno() {
    this.execucaoAtividadeService.update(this.execucaoAtividade).subscribe((data: ExecucaoAtividade) => {
      this.execucaoAtividade = data;

      const route = this.translate.instant('routes.execucaoAtividade.list');
      this.router.navigate([route]);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  getById() {
    this.execucaoAtividadeService.getById(this.execucaoAtividadeId).subscribe((result: ExecucaoAtividade) => {
      if (result) {
        this.execucaoAtividade = result;
        this.execucaoAtividadeFormGroupEdit();
      } else {
        const route = this.translate.instant('routes.execucaoAtividade.list');
        this.router.navigate([route]);
      }
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  openDialog(title: string, message: string, error?: HttpErrorResponse): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message }
    });

    if (error) {
      console.log(error.message);
    } else {
      dialogRef.afterClosed().subscribe(() => {
        const route = this.translate.instant('routes.execucaoAtividade.list');
        this.router.navigate([route]);
      });
    }
  }

  init() {
    this.getAllAlunos();

    this.route.params.subscribe(params => {
      this.execucaoAtividadeId = params['id'];
      if (this.execucaoAtividadeId) {
        this.showMenuFiltro = false;
        this.disabledField = true;
        this.getById();
        this.translate.get(['execucaoAtividade']).subscribe((response: any) => {
          this.title = response.execucaoAtividade.title.edit;
        });
      } else {
        this.translate.get(['execucaoAtividade']).subscribe((response: any) => {
          this.title = response.execucaoAtividade.title.new;
        });
        this.showMenuFiltro = true;
        this.disabledField = false;
      }
    });
  }

  getAllAlunos(){
    this.alunoService.getAll().subscribe((result: any) => {
      this.alunos = result;
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
     });
  }

  messageToast(tipo: TipoMessagem, message: string, description: string) {
    this.messageService.add({ severity: tipo, summary: message, detail: description });
  }
}

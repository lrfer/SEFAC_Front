import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoMessagem } from 'src/app/shared/enum/tipo-messagem.enum';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { MessageService } from 'primeng/api';
import { Aluno } from 'src/app/shared/models/aluno.model';
import { Atividade } from 'src/app/shared/models/atividade.model';
import { AtividadeService } from 'src/app/shared/services/ativdade.service';

@Component({
  selector: 'app-atividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.css'],
})
export class AtividadeFormComponent implements OnInit {
  atividadeForm: FormGroup;
  alunos: Aluno[];
  atividade: Atividade;
  atividadeId: number;
  title: string;
  disabledButtonDocument = true;
  showInputDocument = true;
  showMenuFiltro: boolean;
  disabledField: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadeService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.atividadeForm = this.atividadeFormGroup();
    this.atividade = new Atividade();
  }

  ngOnInit() {
    this.init();
  }

  atividadeFormGroup() {
    return this.formBuilder.group({
      id: new FormControl(0),
      codigoSiex: new FormControl('', Validators.required),
      descricao: new FormControl(''),
      documento: new FormControl(),
      documento_base64: new FormControl(),
      documento_id: new FormControl(),
    });
  }

  atividadeFormGroupEdit() {
    this.atividadeForm.patchValue({
      id: this.atividade.id,
      codigoSiex: this.atividade.codigoSiex,
      descricao: this.atividade.descricao,
      documento_id: this.atividade.documento_id
        ? this.atividade.documento_id
        : 0,
      documento_base64: this.atividade.documento
        ? this.atividade.documento.arquivo
        : '',
    });
  }

  get f() {
    return this.atividadeForm.controls;
  }

  submit() {
    this.atividade = new Atividade(this.atividadeForm.value);
    if (this.atividade.id && this.atividade.id !== 0) {
      this.updateAtividade();
    } else {
      console.log(this.atividade);
      this.saveAtividade();
    }
  }

  saveAtividade() {
    this.atividadeService.save(this.atividade).subscribe(
      (data: Atividade) => {
        this.atividade = data;

        const route = this.translate.instant('routes.execucaoAtividade.list');
        this.router.navigate([route]);
      },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      }
    );
  }

  updateAtividade() {
    this.atividadeService.update(this.atividade).subscribe(
      (data: Atividade) => {
        this.atividade = data;

        const route = this.translate.instant('routes.execucaoAtividade.list');
        this.router.navigate([route]);
      },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      }
    );
  }

  getById() {
    this.atividadeService.getById(this.atividadeId).subscribe(
      (result: Atividade) => {
        if (result) {
          this.atividade = result;
          this.atividadeFormGroupEdit();
        } else {
          const route = this.translate.instant('routes.execucaoAtividade.list');
          this.router.navigate([route]);
        }
      },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      }
    );
  }

  openDialog(title: string, message: string, error?: HttpErrorResponse): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message },
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
    this.route.params.subscribe((params) => {
      this.atividadeId = params['id'];
      if (this.atividadeId) {
        this.showMenuFiltro = false;
        this.disabledField = true;
        this.getById();
        this.translate.get(['atividade']).subscribe((response: any) => {
          this.title = response.atividade.title.edit;
        });
      } else {
        this.translate.get(['atividade']).subscribe((response: any) => {
          this.title = response.atividade.title.new;
        });
        this.showMenuFiltro = true;
        this.disabledField = false;
      }
    });
  }

  getAllAtividades() {
    this.atividadeService.getAll().subscribe(
      (result: any) => {
        this.alunos = result;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  messageToast(tipo: TipoMessagem, message: string, description: string) {
    this.messageService.add({
      severity: tipo,
      summary: message,
      detail: description,
    });
  }
}

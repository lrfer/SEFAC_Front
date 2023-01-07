import { AlunoService } from 'src/app/shared/services/aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/shared/models/aluno.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoMessagem } from 'src/app/shared/enum/tipo-messagem.enum';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {

  alunoForm: FormGroup;
  aluno: Aluno;
  alunoId: number;
  title: string;
  minDate = new Date(1970, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 3, 0, 1);
  showMenuFiltro: boolean;
  disabledField: boolean;

  constructor(private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
    ) {
    this.alunoForm = this.alunoFormGroup();
  }

  ngOnInit() {
    this.init();
  }

  alunoFormGroup() {
    return this.formBuilder.group({
      id: new FormControl(0),
      nome: new FormControl('',[Validators.maxLength(255),Validators.required]),
      codigoCurso: new FormControl('', [Validators.required,Validators.maxLength(255)]),
      numeroMatricula: new FormControl('', [Validators.required,Validators.maxLength(255)])
    });
  }

  alunoFormGroupEdit() {
    this.alunoForm.patchValue({
      id:this.aluno.id,
      nome:this.aluno.nome,
      codigoCurso:this.aluno.codigoCurso,
      numeroMatricula:this.aluno.numeroMatricula
    });
  }

  get f() { return this.alunoForm.controls; }

  submit() {

    this.aluno = new Aluno(this.alunoForm.value);
    if (this.aluno.id && this.aluno.id !== 0) {
      this.updateAluno();
    } else {
      this.saveAluno();
    }
  }

  saveAluno() {
    this.alunoService.save(this.aluno).subscribe((data: Aluno) => {
      this.aluno = data;

      const route = this.translate.instant('routes.aluno.list');
      this.router.navigate([route]);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('aluno.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  updateAluno() {
    this.alunoService.update(this.aluno).subscribe((data: Aluno) => {
      this.aluno = data;

      const route = this.translate.instant('routes.aluno.list');
      this.router.navigate([route]);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('aluno.title.error');

        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  getById() {
    this.alunoService.getById(this.alunoId).subscribe((result: Aluno) => {
      if (result) {
        this.aluno = result;
        this.alunoFormGroupEdit();
      } else {
        const route = this.translate.instant('routes.aluno.list');
        this.router.navigate([route]);
      }
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('aluno.title.error');

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
        const route = this.translate.instant('routes.aluno.list');
        this.router.navigate([route]);
      });
    }
  }

  init() {
    this.route.params.subscribe(params => {
      this.alunoId = params['id'];
      if (this.alunoId) {
        this.showMenuFiltro = false;
        this.disabledField = true;
        this.getById();
        this.translate.get(['aluno']).subscribe((response: any) => {
          this.title = response.aluno.title.edit;
        });
      } else {
        this.translate.get(['aluno']).subscribe((response: any) => {
          this.title = response.aluno.title.new;
        });
        this.showMenuFiltro = true;
        this.disabledField = false;
      }
    });
  }

  messageToast(tipo: TipoMessagem, message: string, description: string) {
    this.messageService.add({ severity: tipo, summary: message, detail: description });
  }
}

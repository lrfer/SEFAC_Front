import { AlunoService } from 'src/app/shared/services/aluno.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Aluno } from 'src/app/shared/models/aluno.model';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalConfirmDialogComponent } from 'src/app/shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { TipoMessagem } from 'src/app/shared/enum/tipo-messagem.enum';
import { MessageService } from 'primeng/api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {

  aluno: Aluno[];
  title: string;
  displayedColumns: string[] = ['nome', 'cnome', 'id'];
  dataSource: MatTableDataSource<Aluno>;
  message: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private alunoService: AlunoService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAll();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAll() {
    this.alunoService.getAll().subscribe((data: any) => {

      this.dataSource = new MatTableDataSource<Aluno>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('aluno.title.error');
        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  openConfirmDialog(aluno: Aluno): void {

    const messageConfirm = this.translate.instant('aluno.message.confirm_delete');

    const dialogRef = this.dialog.open(ModalConfirmDialogComponent, {
      position: { top: '6%' },
      data: { title: messageConfirm }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(aluno.id);
      }
    });
  }

  delete(id: number) {
    this.alunoService.delete(id).subscribe((response) => {
      const title = this.translate.instant('aluno.title.success');
      const message = this.translate.instant('aluno.message.delete_success');
      this.openDialog(title, message);
      this.getAll();
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('aluno.title.error');
        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });
  }

  openDialog(title: string, message: string, error?: HttpErrorResponse): void {
    this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message }
    });

    if (error) {
      console.log(error.message);
    }
  }

  messageToast(tipo: TipoMessagem, message: string, description: string) {
    this.messageService.add({ severity: tipo, summary: message, detail: description });
  }
}

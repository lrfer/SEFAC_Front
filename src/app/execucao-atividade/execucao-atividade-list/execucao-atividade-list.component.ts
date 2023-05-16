import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ExecucaoAtividade } from 'src/app/shared/models/execucao-atividade';
import { ExecucaoAtividadeService } from 'src/app/shared/services/execucao-ativdade.service';


@Component({
  selector: 'app-execucao-atividade-list',
  templateUrl: './execucao-atividade-list.component.html',
  styleUrls: ['./execucao-atividade-list.component.css']
})
export class ExecucaoAtividadeListComponent implements OnInit {

  execucaoAtividade: ExecucaoAtividade[];
  title: string;
  displayedColumns: string[] = ['nome', 'aluno','data','cargaHoraria','duracao', 'id'];
  dataSource: MatTableDataSource<ExecucaoAtividade>;
  message: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private execucaoAtividadeService: ExecucaoAtividadeService,
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
    this.execucaoAtividadeService.getAll().subscribe((data: any) => {
      this.execucaoAtividade = data;
      this.execucaoAtividade.forEach(x=>x.dataInicio_Fim = this.castDate(x.dataInicio,x.dataFim));
      this.dataSource = new MatTableDataSource<ExecucaoAtividade>(this.execucaoAtividade);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');
        this.messageToast(TipoMessagem.ERROR, title, error.error.message);
      });


  }

  openConfirmDialog(execucaoAtividade: ExecucaoAtividade): void {

    const messageConfirm = this.translate.instant('execucaoAtividade.message.confirm_delete');

    const dialogRef = this.dialog.open(ModalConfirmDialogComponent, {
      position: { top: '6%' },
      data: { title: messageConfirm }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(execucaoAtividade.id);
      }
    });
  }

  delete(id: number) {
    this.execucaoAtividadeService.delete(id).subscribe((response) => {
      const title = this.translate.instant('execucaoAtividade.title.success');
      const message = this.translate.instant('execucaoAtividade.message.delete_success');
      this.openDialog(title, message);
      this.getAll();
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('execucaoAtividade.title.error');
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

  castDate(dataInicio,dataFim){
    return this.getDDMMYYYY(dataInicio) + " - " + this.getDDMMYYYY(dataFim);
  }

  getDDMMYYYY(date) {
    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}
}

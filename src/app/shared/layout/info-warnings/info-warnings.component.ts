import { Component, OnInit, Input } from '@angular/core';
import { ModalDialogComponent } from '../modal/modal-dialog/modal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-warnings',
  templateUrl: './info-warnings.component.html',
  styleUrls: ['./info-warnings.component.css']
})
export class InfoWarningsComponent implements OnInit {

  @Input() warnings: Array<string>;
  @Input() showDelete: boolean;

  constructor(public dialog: MatDialog,
    private translate: TranslateService,
    private router: Router) { }

  ngOnInit() {
  }

  openDialog(warnings: Array<string>): void {
    const title = this.translate.instant('warning.title');
    const message = this.translate.instant('warning.title');

    this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message, warnings: warnings, hideTitle: true }
    });
  }
}

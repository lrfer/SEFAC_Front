import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog-confirm-warnings',
  templateUrl: './modal-dialog-confirm-warnings.component.html',
  styleUrls: ['./modal-dialog-confirm-warnings.component.css']
})
export class ModalDialogConfirmWarningsComponent {

  public clickyes = false;
  public clickno = false;

  constructor(
    public dialogRef: MatDialogRef<ModalDialogConfirmWarningsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCloseConfirm() {
      this.dialogRef.close(true);
    }
    onCloseCancel() {
      this.dialogRef.close(false);
    }

}

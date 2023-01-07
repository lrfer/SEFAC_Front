import { Component, OnInit, Inject } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  portal: ComponentPortal<any>;

  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.portal = new ComponentPortal(this.data.component);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

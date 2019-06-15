import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html',
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  studentClicked() {
    //should call service
  }

  addClicked(info) {
    // show spinner
    console.log('Added: ', info)
  }
}

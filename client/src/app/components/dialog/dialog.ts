import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html',
})
export class Dialog {

  toAddList = {};

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  addClicked() {
    // show spinner
    console.log('Added: ')
  }

  onSelection(selected) {
    this.toAddList[selected.option.value.id] = { selected: selected.option.selected, id: selected.option.value.id };
    console.log('list: ', this.toAddList);
  }
}

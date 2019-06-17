import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html',
})
export class Dialog {

  toAddList = {};

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  addClicked() {
    this.dialogRef.close();
    const keys = Object.keys(this.toAddList);
    keys.forEach(key => {
      if (this.toAddList[key].selected) {
        const request = {
          turma: this.data.turmaId,
          pessoa: key,
        };
        this.service.postNewAlunoInTurma(request).subscribe(() => console.log(`${key} sent`));
      }
    });
  }

  onSelection(selected) {
    this.toAddList[selected.option.value.id] = { selected: selected.option.selected, id: selected.option.value.id };
    console.log('list: ', this.toAddList);
  }
}

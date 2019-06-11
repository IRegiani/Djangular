import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
// import { IdSelectorService} from '../../services/id-selector.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-student-attendance-page',
  templateUrl: './student-attendance-page.component.html',
  styleUrls: ['./student-attendance-page.component.css']
})
export class StudentAttendancePageComponent implements OnInit {
  
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  // Will be changed by the Singleton (that will have the user's ID and password, so far...)
  fixedStudentId = 1;

  ngOnInit(){
    this.getAulasDoAlunoToday();
  }

  curso = { id: "ca1", nomeCurso: "1º Ciclo", data: "2019-04-08", inicio: "20:00", fim: "22:30"};
  myDate = new Date();

  constructor(private service: AuthService) { }


  // ------------ QR CODE SCANNER METHODS -------------
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log("LIIIII")
    console.log(this.qrResultString)
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    // this._dialog
    //   .open(FormatsDialogComponent, { data })
    //   .afterClosed()
    //   .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    // this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

// ------------ SERVICE METHODS -------------
  getAulasDoAlunoToday(){
    // var auxLista : Array<any> = [];
    var auxLista
  
    this.service.getAulasDoAluno(this.fixedStudentId).subscribe(
      (pessoaAula) => {auxLista = JSON.parse(JSON.stringify(pessoaAula));
      console.log("AUXLISTA");
    console.log(auxLista);
  console.log(pessoaAula);}, // on Success
      (error) => {console.log("ERROR! --getAulasToday")}, // error
      () => { // Once completed
        // for (let aula of auxLista){
        //   console.log("B")
        //   console.log(auxLista)
        //   console.log(aulasIds)
          
        //   if (aulasIds.indexOf(aula.id) > -1) { // Found the Turma of the teacher
        //     console.log("ENTREI")
        //     var date = new Date()
        //     var dd = String(date.getDate()).padStart(2, '0');
        //     var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        //     var yyyy = date.getFullYear();
            
        //     var today = yyyy + '-' + mm + '-' + dd;
        //     console.log("TODAY: "+today)
        //     if (aula.Data == today) {
        //       this.aulasToday.push(aula);
        //     }
        //   }
        // }
        // console.log("AULAS TODAY ----------------")
        // console.log(JSON.stringify(this.aulasToday));
        // this.spinner.hide();
      }
       );
  }

}

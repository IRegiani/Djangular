import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Result } from '@zxing/library';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { AuthService} from '../../services/auth.service';
import  { ActivatedRoute, Router } from '@angular/router'
// import { IdSelectorService} from '../../services/id-selector.service';
import { NgxSpinnerService } from 'ngx-spinner';

class AttendanceControl {
  ptA: boolean;
  ptB: boolean;
}

@Component({
  selector: 'app-student-attendance-page',
  templateUrl: './student-attendance-page.component.html',
  styleUrls: ['./student-attendance-page.component.css']
})
export class StudentAttendancePageComponent implements OnInit {
  
  // QR SCAN Variables
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

  // SERVICE Variables
  // Will be changed by the Singleton (that will have the user's ID and password, so far...)
  fixedStudentId = 1;
  pessoaAulasToday = [];

 // GENERAL Variables
  expansionAux = -1;
  scannerShown = false;
  scanBtnText = "Ler o QR Code";

  qrId = 0;
  presenca: Array<AttendanceControl> = [];

  ngOnInit(){
    // let testando = ['a', 'b', 'c', 'd', 'e'];
    // console.log(testando);
    // testando.splice(0, 0, '0')
    // console.log(testando);
    // testando.splice(1, 1);
    // console.log(testando);
    // testando.splice(2, 1, 'C')
    // console.log(testando);
    this.getAulasDoAlunoToday();
  }

  curso = { id: "ca1", nomeCurso: "1º Ciclo", data: "2019-04-08", inicio: "20:00", fim: "22:30"};
  myDate = new Date();

  constructor(private service: AuthService,
              private spinner: NgxSpinnerService) { }


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

  // Begins loading the GET request
  this.spinner.show(undefined,
    {
      type: 'line-scale-party',
      size: 'medium',
      bdColor: 'rgba(100,149,237, .1)',
      color: 'yellow',
      fullScreen: true
    }
  );
    this.service.getAulasDoAluno(this.fixedStudentId).subscribe(
      (pessoaAula) => {auxLista = JSON.parse(JSON.stringify(pessoaAula));
      console.log("AUXLISTA");
    console.log(auxLista);
  console.log(pessoaAula);}, // on Success
      (error) => {console.log("ERROR! --getAulasToday")}, // error
      () => { // Once completed
        for (let aula of auxLista){
            var date = new Date()
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            
            var today = yyyy + '-' + mm + '-' + dd;
            console.log("TODAY: "+today)
            if (aula.Aulas.Data == today) {
              this.pessoaAulasToday.push(aula);

              // Creates new Attendance Object to control each class' indivual attendance
              var attendanceObj: AttendanceControl = new AttendanceControl();
              console.log(attendanceObj);
              attendanceObj.ptA = false;
              attendanceObj.ptB = false; 
              this.presenca.push(attendanceObj);
              console.log(this.presenca);
            }
          
        }
        console.log("AULAS TODAY ----------------")
        console.log(JSON.stringify(this.pessoaAulasToday));
        this.spinner.hide();
      }
       );
  }



// ------------ GENERAL METHODS -------------
  expandCollapse(pos){
    return pos == this.expansionAux;
    }

  setSingleExpansion(pos){
    if (this.expansionAux != pos) {
        this.scannerShown = false;
        this.scanBtnText = "Ler o QR Code";
        this.torchEnabled = false;
        this.tryHarder = false;
        this.qrResultString = null;
    }
    this.expansionAux = pos;
  }

  showScanner(){
    console.log(this.scannerShown)
    if (this.scannerShown) {
      this.scannerShown = false;
      this.scanBtnText = "Ler o QR Code";
      // this.hasDevices = false;
      // this.hasPermission = false;
      this.torchEnabled = false;
      this.tryHarder = false;
    } else {
      this.scannerShown = true;
      this.scanBtnText = "Fechar QR Scanner";
    }
  }

  identifyQRString(qrString: string, pos){
    // VERIFICAR POTENCIAIS BUGS COM QRs NAO PREVISTOS

    // EXPECTED QR STRING: aulaIdX_presenca-Y     (X: int > 0 | Y: 'A'/'B')
    console.log(qrString);
    var semiId = qrString.split("aulaId").pop();
    console.log(semiId);
    var attendanceType  = semiId.split("_").pop();
    console.log(attendanceType);
    let aux = "_" +attendanceType;

    // Gets the aula Id
    this.qrId = +semiId.replace(aux, "");
    console.log(this.qrId);

    // Defines the part of the 'aula' the student watched (A or B)
    var type = attendanceType.split("-").pop()
    console.log(type);
    if (type === "A"){
      this.presenca[pos].ptA = true;
      console.log(this.presenca)
    } else if (type === "B") {
      this.presenca[pos].ptB = true;
    } else {
      window.alert(" Erro nas informações fornecidas pelo QR Code. \n Certifique-se de ler o QR Code correto!")
    }
    console.log(this.presenca[pos]);

  }

  sendQRCode(pos, pessoaAula){
    if (this.qrResultString) {
      this.identifyQRString(this.qrResultString, pos);
      if (isNaN(this.qrId)){
        window.alert(" O ID da aula não pôde ser apropriadamente identificado. \n Certifique-se de ler o QR Code correto!")
      } else {

        // Checks if the attendance to be updated is for the appropriate class
        if (this.qrId != pessoaAula.Aulas.id) {
          window.alert(" O ID da aula no QR Code lido não é o mesmo do da aula em que se pretende marcar presença! \n Certifique-se de ler o QR Code de presença fornecido para a aula apropriada.")
        } else {

          this.spinner.show(undefined,
            {
              type: 'line-scale-party',
              size: 'medium',
              bdColor: 'rgba(100,149,237, .1)',
              color: 'yellow',
              fullScreen: true
            }
          );
  
          // Ordered cases
          // 1) Student has both needed attendances
          if (this.presenca[pos].ptA == true && this.presenca[pos].ptB == true){ 
                // Update service
                let pessoaAulaObj =  {
                  Pessoas: pessoaAula.Pessoas.id,
                  Aulas: pessoaAula.Aulas.id,
                  Contador: 2
                }
        
                this.service.updateCurrentAttendance(pessoaAula.id, pessoaAulaObj).subscribe(result => {
                      console.log("UPDATE DE PRESENCA - presente")
                      console.log(result);
  
                      // this.populateStudents(pessoaAula.Aulas);
                      this.spinner.hide();
                    });
        
          } 
          // 2) Student has ONE of the needed attendances
          else if (this.presenca[pos].ptA == true || this.presenca[pos].ptB == true) {
            // Checks if the student isn't trying to mark 2 attendances based on the same QR Code

                if (pessoaAula.Contador > 0) {
                  window.alert(" A presença para essa parte da aula já foi marcada! \n Certifique-se de ler o QR Code da outra metade da aula!");
                  this.spinner.hide();
                } else {
  
                  let pessoaAulaObj =  {
                    Pessoas: pessoaAula.Pessoas.id,
                    Aulas: pessoaAula.Aulas.id,
                    Contador: 1
                  }
  
                  this.service.updateCurrentAttendance(pessoaAula.id, pessoaAulaObj).subscribe(result => {
                    console.log("UPDATE DE PRESENCA - presente")
                    console.log(result);
                    // window.alert(" Ocorreu um erro na leitura do QR Code a ser enviado. \n Ele está vazio!");

                    this.service.getPresencaEmAula(this.fixedStudentId, pessoaAula.Aulas.id).subscribe(
                      (resultado) => { 
                        console.log(resultado)
                        let parsed = JSON.parse(JSON.stringify(resultado));
                        console.log("PARSED");
                        console.log(parsed);
                        this.pessoaAulasToday.splice(pos, 1, parsed[0]);
                        this.spinner.hide();
          
                       }, // on Success
                      (error) => {console.log("ERROR! --getPresencaEmAula")}, // error
                      () => { // Once completed
                        this.spinner.hide();
                      }
                       );
                    this.spinner.hide();
                  });
                }
              
          }
          // 3) The student has NONE of the needed attendances -- ERROR CASE
          else {
            window.alert(" Ocorreu um erro referente à identificação da parte da presença no período de aula. \n Certifique-se de ler o QR Code correto!");
            this.spinner.hide();
          }

        }

      }
    } else {
      window.alert(" Ocorreu um erro na leitura do QR Code a ser enviado. \n Ele está vazio!");
    }
  }

}

import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
// import {QrScannerComponent} from 'angular2-qrscanner';

import { Result } from '@zxing/library';
// import { MatDialog } from '@angular/material';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
// import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
// import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';

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

  ngOnInit(){

  }

  curso = { id: "ca1", nomeCurso: "1º Ciclo", data: "2019-04-08", inicio: "20:00", fim: "22:30"};
  myDate = new Date();

  constructor(/*private readonly _dialog: MatDialog*/) { }

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
}

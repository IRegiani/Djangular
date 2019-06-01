import { Component, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
@Component({
  selector: 'app-student-attendance-page',
  templateUrl: './student-attendance-page.component.html',
  styleUrls: ['./student-attendance-page.component.css']
})
export class StudentAttendancePageComponent implements OnInit {
  
  /**RESULTADO DA QUERY */
  // curso = { id: "ca1", nomeCurso: "1º Ciclo", data: "2019-04-08", inicio: "20:00", fim: "22:30"};
  // myDate = new Date();


  // ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  
  constructor() { }

  clearResult(): void {
    this.qrResultString = null;
  }

  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.availableDevices = devices;
      this._selectBackfaceCamera(devices);
    });
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states['' + state];
  }

  private _selectBackfaceCamera(devices: MediaDeviceInfo[]) {
    // selects the devices's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.currentDevice = device;
        break;
      }
    }
  }


}

import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan',
  imports: [ZXingScannerModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.css',
})
export class ScanComponent {
  allowedFormat = [BarcodeFormat.EAN_13];

  onScanSuccess(scan: string){
    console.log(scan)
  }
}

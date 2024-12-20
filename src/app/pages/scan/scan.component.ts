import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  onScanSuccess(scan: string) {
    if (scan.length === 13) {
      this.router.navigate(['/search'], { queryParams: { isbn: scan } });
    }
    console.log(scan);
  }
}

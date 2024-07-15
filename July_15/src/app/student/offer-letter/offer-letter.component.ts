import { Component, Input, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OfferPreviewComponent } from '../offer-preview/offer-preview.component';

@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.scss']
})
export class OfferLetterComponent {
@Input() stdData
dialog = inject(MatDialog)
viewOffer(){
  const dialogConfig = new MatDialogConfig()
  dialogConfig.width = '1024px';
  dialogConfig.height = '800px';
  dialogConfig.data = {
    data: this.stdData
  }
  this.dialog.open(OfferPreviewComponent,dialogConfig)
}
}

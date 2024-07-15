import { Component, ElementRef, Inject, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

offerDialogData:any
  constructor(@Inject(MAT_DIALOG_DATA) dialogData: any){
    this.offerDialogData =dialogData.data
  //  console.log("dialog Data for Std PDF: ", dialogData.data)
  }
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;

    html2canvas(pdfTable).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // Adjust width as per your requirement
      const pageHeight = 295; // Standard A4 page height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('tableToPdf.pdf');
    });
  }
}

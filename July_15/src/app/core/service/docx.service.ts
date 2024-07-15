
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  
import { Inject, Injectable } from '@angular/core';


import { saveAs } from 'file-saver';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, DOCUMENT } from '@angular/common';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { PDFDocument } from 'pdf-lib';


@Injectable({
  providedIn: 'root'
})
export class DocxService {
  private readonly TABLE_PLACEHOLDER = '{TABLE_PLACEHOLDER}';
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getCoursesByCode(data: any, myCode: string): any[] {
    const studentInfo = data || [];
    const selectedCourses = studentInfo
      .filter((info: any) => info.code === myCode)
      .map((info: any) => ({
        selectedcourse: info.selectedcourse,
        coursecode: info.coursecode,
        duration: info.duration,
        tutionfee: info.tutionfee,
        closedate: info.closedate,
        startdate: info.startdate
        
      }));
      console.log("selectedCoursesssssssssssssssssssss:", selectedCourses)
    return selectedCourses;
  }
 
  // showPreviewOffer(data: any): void {
  //   const myFormattedDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
  //   console.log("Formatted Date:", myFormattedDate);

  //   const info = {
  //     ...data,
  //     date: myFormattedDate
  //   };

  //   this.http.get('assets/OfferLetter/Offer_Letter_Template.docx', { responseType: 'arraybuffer' }).pipe(
  //     catchError(error => {
  //       console.error('Error fetching document template:', error);
  //       return throwError(error);
  //     })
  //   ).subscribe((content: ArrayBuffer) => {
  //     const zip = new PizZip(content);
  //     let doc;

  //     try {
  //       doc = new Docxtemplater(zip, {
  //         paragraphLoop: true,
  //         linebreaks: true,
  //       });
  //     } catch (error) {
  //       this.handleError(error, 'Error initializing Docxtemplater');
  //       return;
  //     }

  //     doc.setData(info);

  //     try {
  //       doc.render();
  //     } catch (error) {
  //       this.handleError(error, 'Error rendering document');
  //       return;
  //     }

  //     const out = doc.getZip().generate({
  //       type: 'blob',
  //       mimeType: 'application/pdf',  // Ensure correct MIME type for PDF
  //     });

  //     console.log("Generated blob:", out);

  //     if (out) {
  //       saveAs(out, 'previewOfferLetter.docx');
  //     } else {
  //       console.error("Failed to generate PDF blob");
  //     }
  //   });
  // }

  
  showPreviewOffer(data: any, courseTable: any[]): void {
    console.log("CourseTaaaaaaaable: ", courseTable)
    console.log("PPPPPPPPPPPErsonal data: ", data)
    const myFormattedDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    console.log("Formatted Date:", myFormattedDate);

    const info = {
      ...data[0],
      date: myFormattedDate,
      tableData: courseTable
    };
    console.log("Final DAtaaaaaaaaaaaaaaaaaaaaaaa:", info)
    this.http.get('assets/OfferLetter/Offer_Letter_Template.docx', { responseType: 'arraybuffer' }).pipe(
      catchError(error => {
        console.error('Error fetching document template:', error);
        return throwError(error);
      })
    ).subscribe((content: ArrayBuffer) => {
      const zip = new PizZip(content);
      let doc;

      try {
        const opts = {
          paragraphLoop: true,
          linebreaks: true,
        };
        doc = new Docxtemplater(zip, opts);
      } catch (error) {
        this.handleError(error, 'Error initializing Docxtemplater');
        return;
      }

      doc.setData(info);

      try {
        doc.render();
      } catch (error) {
        this.handleError(error, 'Error rendering document');
        return;
      }

      const generatedDoc = doc.getZip().generate({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

      if (generatedDoc) {
        saveAs(generatedDoc, 'previewOfferLetter.docx');
      } else {
        console.error("Failed to generate document blob");
      }
    });
  }
  private handleError(error: any, message: string): void {
    console.error(message, error);
    if (error.properties && error.properties.errors) {
      error.properties.errors.forEach((e: any) => {
        console.error("Suberror: ", e);
      });
    }
  }
  // async showPreviewOffer(data: any) {
  //   // Load the DOCX file from the assets folder
  //   const docxBlob = await this.http.get('/assets/offerPreview.docx', { responseType: 'blob' }).toPromise();
  //   const arrayBuffer = await docxBlob.arrayBuffer();

  //   // Create a PizZip instance
  //   const zip = new PizZip(arrayBuffer);
  //   const doc = new Docxtemplater(zip, {
  //     paragraphLoop: true,
  //     linebreaks: true,
  //   });

  //   // Fetch data from your API
   

  //   // Populate the DOCX template with data from API
  //   doc.setData(data);

  //   try {
  //     // Render the document
  //     doc.render();
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }

  //   const updatedDocxBlob = new Blob([doc.getZip().generate({ type: 'blob' })], {
  //     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //   });

  //   // Convert DOCX to PDF using pdf-lib
  //   const pdfDoc = await PDFDocument.create();
  //   const copiedPages = await pdfDoc.copyPages(await PDFDocument.load(await updatedDocxBlob.arrayBuffer()), [0]);
  //   copiedPages.forEach((page) => pdfDoc.addPage(page));

  //   const pdfBytes = await pdfDoc.save();
  //   const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

  //   // Save the PDF
  //   saveAs(pdfBlob, 'myPreview.pdf');
  // }



}


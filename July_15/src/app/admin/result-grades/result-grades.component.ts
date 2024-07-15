
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { APICallService } from '@core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { RGDetailsComponent } from './rgdetails/rgdetails.component'
import { RgAddComponent } from './rg-add/rg-add.component'
import { RgEditComponent } from './rg-edit/rg-edit.component'
@Component({
  selector: 'app-result-grades',
  templateUrl: './result-grades.component.html',
  styleUrls: ['./result-grades.component.scss']
})
export class ResultGradesComponent  implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: ' ',
      items: [],
      active: 'Result Grades List',
    },
  ];
  public _data: any = {};
  public displayedColumns: string[] = [
    'status',
    'description',
    'finaloutcomecode',
    'grade',
    'finaloutcome',
    'createtime',
    'transcriptdisplay',
    'code'
  ];
  public notifyText: string = "";
  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public totRecords: number = 0;

  public dataSource: MatTableDataSource<any>;
  public search: string = '';
  public resultGrades: any = [];
  public gradetypecode: string = "";
  public isusemarks: string = "0";
  public maxmarks:string ='0';
  step = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild('input') input!: ElementRef;
  constructor(
    private _router: Router,
    private _api: APICallService, 
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit() {
    this.notifyText ="Please setup the academic result,grade,outcome, and mark range before using the system, this is for student marks calculation. It will affect to new result transfer only";
    this.loadSummary();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  viewDetailsList(row: any) {
    const dialogRef = this.dialog.open(RGDetailsComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        data: row,
        action: 'view',
      },
      //direction: 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.refresh();
      }
    });
  }

  EnrollFeeNew() {
    const dialogRef = this.dialog.open(RgAddComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        action: 'add',
      },
      // direction: 'ltr',
    });
   dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadSummary();
      }
    });
  }
  EditResultGrade(rg: any, rgItm: any) {
    const dialogRef = this.dialog.open(RgEditComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        data: rgItm,
        action: 'edit',
      },
      // direction: 'ltr',
    });
  dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadSummary();
      }
    });
  }
  loadSummary() {
    let that = this;
    this._api.post('/appapi/RGrade/ListSummary', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.resultGrades = resp.data.list;
         
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  pageChanged(event: PageEvent) {
    console.log({event})
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.totalRows = event.length;
    this.loadData(0);
  }
  StatusChange(row: any, type: number) {
    let that = this;
    let payLoad = { code: row.code, status: type };
    return this._api.post('/appapi/RGrade/ChangeStatus', payLoad).subscribe({
      next(resp: any) {
        if (resp != null && resp.code == '0') {
          that._api.successNotify(resp.message)
          that.refresh();
        } else {
          that._api.errorNotify(resp?.message)
        }
      },
      error(msg: any) {
        console.log(msg);
        that._api.errorNotify('Something went wrong!')
      },
    });
  }

  loadData(idx) {
    let that = this;
    let start = this.currentPage * this.pageSize;
    let payLoad = {
      gradetypecode: this.gradetypecode,
      isusemarks: this.isusemarks,
      maxmarks:this.maxmarks,
      orderColumn: 'isusemarks',
      orderDir: 'ASC',
      start: start,
      pageSize: this.pageSize,
    };
    this._api.post('/appapi/RGrade/List', payLoad).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.dataSource.data = resp.data.list;
          this.step = idx;
          setTimeout(() => {
            that.paginator.pageIndex = that.currentPage;
            that.paginator.length = resp.data.totalRecords;
            that.totalRows = resp.data.totalRecords;
          });
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });

  }
  refresh() {
    this.pageSize = 10;
    this.currentPage = 0;
    this.loadData(0);
  }
  onPanelClick(rg: any,idx:number) {
    this.pageSize = 10;
    this.currentPage = 0;
    this.gradetypecode = rg.gradetypecode;
    this.isusemarks = rg.isusemarks;
    this.maxmarks=rg.maxmarks;
    console.log(rg);
    this.loadData(idx);
  }
}

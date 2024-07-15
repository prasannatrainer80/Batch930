import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject
} from '@angular/core';
import { APICallService } from '@core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RgAddComponent } from  './../rg-add/rg-add.component';

@Component({
  selector: 'app-rgdetails',
  templateUrl: './rgdetails.component.html',
  styleUrls: ['./rgdetails.component.scss']
})
export class RGDetailsComponent  implements OnInit, AfterViewInit {

  public _data: any = {};
  public displayedColumns: string[] = [
    'status',
    'description',
    'finaloutcomecode',
    'grade',
    'finaloutcome',
    'createtime'
  ];

  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public totRecords: number = 0;
  public dialogTitle: string;
  public rgtype: string;
  public usemarks: string;
  public maxmarks:string;

  public dataSource: MatTableDataSource<any>;
  public search: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild('input') input!: ElementRef;
  constructor(
    private _router: Router,
    private _api: APICallService, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RGDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.dialogTitle = "";
    this.rgtype = "";
    this.usemarks = "";
    this.maxmarks ="";
  }
  ngOnInit() {
    this.rgtype = this.data.data.name;
    this.usemarks = this.data.data.isusemarks == "1" ? "YES" : "NO";
    if(this.data.data.isusemarks == "1" ){
      this.maxmarks = this.data.data.maxmarks;
    }
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  redirectTo(uri: string) {
    this._router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this._router.navigate([uri]));
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

  loadData() {
    let that = this;
    let start = this.currentPage * this.pageSize;
    let payLoad = {
      gradetypecode: this.data.data.gradetypecode,
      isusemarks:this.data.data.isusemarks,
      orderColumn: 'isusemarks',
      orderDir: 'ASC',
      start: start,
      pageSize: this.pageSize,
    };
    this._api.post('/appapi/RGrade/List', payLoad).subscribe({
      next(resp: any) {
        console.log(resp);
        if (resp.code == '0') {
          that.dataSource.data = resp.data.list;
          setTimeout(() => {
            that.paginator.pageIndex = that.currentPage;
            that.paginator.length = resp.data.totalRecords;
            //that.totalRows = resp.data.totalRecords;
          });
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.totalRows = event.length;
    this.loadData();
  }
  refresh() {
    this.pageSize = 10;
    this.currentPage = 0;
    this.loadData();
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  EnrollFeeNew(){
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
        this.refresh();
      }
    });
  }
}

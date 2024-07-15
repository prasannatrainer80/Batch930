import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { APICallService, CommonService } from '@core';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { EFEditComponent } from './edit/efedit.component';
import { EFAddComponent } from  './add/efadd.component'
@Component({
  selector: 'app-enroll-fee',
  templateUrl: './enroll-fee.component.html',
  styleUrls: ['./enroll-fee.component.scss']
})
export class EnrollFeeComponent implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: '',
      items: [
      ],
      active: 'Enrolment Fee Setup',
    },
  ];
  public _data: any = {};
//Enrolment Fee	Course ID	Origin	Valid To	Created Date
  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [ 5, 10, 25, 100];
  public totRecords: number = 0;
  public selectedElement: any = {};
  public search: string = '';
  
  showPagination: boolean = false;
  totalItems = 0;
  sortProperty: string = '';
  filterText: string = '';
  sortOrder = 1;
  loading = false;
  columns: any[] = [];
  rows: any[] = [];
  actions: any = {
    key: 'actions',
    name: 'Actions',
    hidden: 'Y',
    sorting: 'N',
    enable_view: "F",
    enable_add: "F",
    enable_edit: "F",
    enable_delete: "F",
    enable_statuschange: "F"
  };
  constructor( private _router: Router, private _api: APICallService, public dialog: MatDialog,
    private common: CommonService) {
    this.showPagination = false;
    this.columns = [];
    this.rows = [];
    this.showPagination = false;

    this.filterText = '';
    this.sortProperty = '';
    this.sortOrder = 1;
    this.pageSize = 10;
    
    this.actions = {
      key: 'actions',
      name: 'Actions',
      hidden: 'N',
      sorting: 'Y',
      enable_view: "T",
      enable_add: "T",
      enable_edit: "T",
      enable_delete: "T",
      enable_statuschange: "T"
    };
  }
  ngOnInit() {
    this.columns = [
      {
        "key": "status",
        "name": "Status",
        "hidden": "N",
        "sorting": "N",
        "order": 2
      },
      {
        "key": "fee",
        "name": "Enrolment Fee",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "coursecode",
        "name": "Course ID",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "originname",
        "name": "Origin",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "validto",
        "name": "Valid To",
        "hidden": "N",
        "sorting": "Y",
        "order": 5
      }
      //{
      //  "key": "createtime",
      //  "name": "Added On",
      //  "hidden": "N",
      //  "sorting": "N",
      //  "order": 99
      //}
    ]
    this.setPage(0);
  }
  ngAfterViewInit() {
    
  }
  redirectTo(uri: string) {
    this._router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this._router.navigate([uri]));
  }
  StatusChange(row: any, type: number) {
    let that = this;
    let payLoad = { code: row.code, status: type };
    return this._api.post('/courseapi/feeenrollment/updatestatus', payLoad).subscribe({
      next(resp: any) {
        if (resp != null && resp.code == '0') {
          that._api.successNotify(resp.message)
          that.setPage(0);
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
 
  EnrollFeeEdit(row: any) {
    const dialogRef = this.dialog.open(EFEditComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        data: row,
        action: 'edit',
      },
      //direction: 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.setPage(0);
      }
    });
  }
  EnrollFeeNew() {
    const dialogRef = this.dialog.open(EFAddComponent, {
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
        this.setPage(0);
      }
    });
  }
  getCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value  =='1') {
      return 'badge col-green'
    }
    else
      return 'badge col-red';
  }
  
  getStatusText(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value == '1') {
      return 'Active'
    }
    else if (value == '0') {
      return 'Deactive'
    }
    return 'Delete';
  }
  onChangePage(pager: any) {
    this.pageSize = pager.pageSize;
    this.setPage(pager.startIndex);
  }

  sortBy(property: string, sorting: string) {
    if (sorting.toUpperCase() !== 'Y') return;
    this.sortOrder = property === this.sortProperty ? (this.sortOrder === 1 ? 0 : 1) : this.sortOrder;
    this.sortProperty = property;
    this.setPage(0);
  }

  sortIcon(property: string) {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? 'fas fa-sort-alpha-up' : 'fas fa-sort-alpha-down';
    }
    return '';
  }

  onSearch(searchText: string) {
    this.filterText = searchText;
    this.setPage(0);
  }
  setPage(pagerOffset: any) {
    let searchData: any = {
      search: this.filterText,
      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/courseapi/feeenrollment/list', searchData).subscribe(results => {
      this.rows = results.data.list || [];
      if (pagerOffset == 0) {
        this.totalItems = results?.data.totalRecords || this.rows.length || 0;
        if (this.totalItems > 0) {
          this.showPagination = true;
        }
      }
      this.loading = false;
    });
  }
}

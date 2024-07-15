import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
//import { EditcommissionComponent } from './editcommission/editcommission.component';
import { AdddivisionComponent } from './adddivision/adddivision.component';
import { APICallService, CommonService } from '@core';
@Component({
  selector: 'app-semdivision',
  templateUrl: './semdivision.component.html',
  styleUrls: ['./semdivision.component.scss']
})
export class SemdivisionComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: '',
      //items: [
      //  {
      //    title: '',
      //    url: '',
      //  },
      //],
      active: 'Semester Division List',
    },
  ];

  public _data: any = {};
  //Enrolment Fee	Course ID	Origin	Valid To	Created Date
  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
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
  coursetypesList: any[] = [];
  calendartypesList: any[] = [];
  years: any[] = [];
  year: any = [];
  calcode: string = "";
  ctype: string = "";

  semList: any[] = [];
  scode: string = "";
  //public displayedColumns: string[] = [
  //  'semester',
  //  'term',
  //  'weeks',
  //  'wsdate',
  //  'wsfinish',
  //  'hours',
  //  'isholidaywk',
  //  'code'
  //];
  constructor(
    private _router: Router,
    private _api: APICallService,
    private common: CommonService,
    public dialog: MatDialog
  ) {
    super();
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
        "key": "semester",
        "name": "Semester",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "term",
        "name": "Term",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "weeks",
        "name": "Weeks",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "wsdate",
        "name": "Week Start",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "wsfinish",
        "name": "Week Finish",
        "hidden": "N",
        "sorting": "Y",
        "order": 5
      },
      {
        "key": "hours",
        "name": "No of Hours/Week",
        "hidden": "N",
        "sorting": "Y",
        "order": 6
      },
      {
        "key": "isholidaywk",
        "name": "Is Holiday Week",
        "hidden": "N",
        "sorting": "Y",
        "order": 7
      }
    ]
    this.loadCourseTypes();
  }
  ngAfterViewInit() {
  }
  redirectTo(uri: string) {
    this._router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this._router.navigate([uri]));
  }

  loadCourseTypes() {
    let that = this;
    this._api.post('/appapi/coursetype/list', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          const index = resp.data.list.findIndex((item: any) => item.code.toUpperCase() === "ELICOS");
          if (index > -1)
            resp.data.list.splice(index, 1);
          that.coursetypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onChangeCourseType(ctype: any) {
    this.loadSemesters(ctype);
  }
  loadSemesters(ctype: string) {
    let that = this;
    this._api.post('/timetableapi/Semester/GetSemByCtype', { ctypecode: ctype }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.semList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onChangeSemester(scode: any) {
    this.setPage(0);
  }
  UpdateHolidayWk(row: any, type: number) {
    let that = this;
    let payLoad = { code: row.code, isholidaywk: type };
    return this._api.post('/timetableapi/Semester/UpdateHolidayWeek', payLoad).subscribe({
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



  AddNewDivision() {
    const dialogRef = this.dialog.open(AdddivisionComponent, {
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
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.setPage(0);
      }
    });
  }

  getCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value == '1') {
      return 'badge col-green'
    }
    else
      return 'badge col-red';
  }

  getStatusText(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value == '1') {
      return 'Yes'
    }
    else if (value == '0') {
      return 'No'
    }
    return 'No';
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
      scode: this.scode,
      search: this.filterText,
      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/timetableapi/Semester/TermList', searchData).subscribe(results => {
      this.rows = results.data.list || [];
      if (pagerOffset == 0) {
        this.totalItems = results?.data.totalRecords || this.rows.length || 0;
        if (this.totalItems > 0) {
          this.showPagination = true;
        }
        else
          this.showPagination = false;
      }
      this.loading = false;
    });
  }

  //loadData(scode: any) {
  //  let that = this;
  //  let start = this.currentPage * this.pageSize;
  //  let payLoad = {
  //    scode: this.scode,
  //    search: this.search,
  //    orderColumn: 'updatetime',
  //    orderDir: 'DESC',
  //    start: start,
  //    pageSize: this.pageSize,
  //  };
  //  this._api.post('/timetableapi/Semester/TermList', payLoad).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {

  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}


}

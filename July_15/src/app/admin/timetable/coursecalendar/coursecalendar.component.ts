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
import { AddcoursecalendarComponent } from './addcoursecalendar/addcoursecalendar.component';
import { APICallService, CommonService } from '@core';

@Component({
  selector: 'app-coursecalendar',
  templateUrl: './coursecalendar.component.html',
  styleUrls: ['./coursecalendar.component.scss']
})
export class CoursecalendarComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: '',
      items: [
        //{
        //  title: '',
        //  url: '',
        //},
      ],
      active: 'Study Periods List',
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

  //public displayedColumns: string[] = [
  //  'coursename',
  //  'calendarset',
  //  'year',   
  //  'code'
  //];

  constructor(
    private _router: Router,
    private _api: APICallService,
    public dialog: MatDialog,
    private common: CommonService
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
        "key": "coursename",
        "name": "Course Name",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "calendarset",
        "name": "Calendar Set",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "year",
        "name": "Year",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "status",
        "name": "Status",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      }

    ]
    //this.setPage(0);


    this.loadYears();
    this.loadCourseTypes();
    this.loadCalendarSets();
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
          that.coursetypesList = resp.data.list;
          that.ctype = 'VET';
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  loadYears() {
    let that = this;
    this._api.post('/timetableapi/Calendar/CalendarYears', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.years = resp.data.list;
          that.year = new Date().getFullYear().toString();
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  onYearType() {
    this.setPage(0);
  }
  onChangeCourseType() {
    //this.loadData(this.calcode, this.ctype, this.year);
    this.setPage(0);
  }
  onChangeCalendarType() {
    //this.loadData(this.calcode, this.ctype, this.year);
    this.setPage(0);
  }
  loadCalendarSets() {
    let that = this;
    this._api.post('/timetableapi/Calendar/CalendarTypes', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.calendartypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  StatusChange(row: any, type: number) {
    let that = this;
    let payLoad = { code: row.code, status: type };
    return this._api.post('/timetableapi/Calendar/ChangeStatus', payLoad).subscribe({
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

  AddNewStudyPeriod() {
    const dialogRef = this.dialog.open(AddcoursecalendarComponent, {
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

  //loadData(calcode: any, ctype: any, year: any) {
  //  let that = this;
  //  let start = this.currentPage * this.pageSize;
  //  let payLoad = {
  //    calcode: calcode,
  //    ctype: ctype,
  //    year: year,
  //    search: this.search,
  //    orderColumn: 'updatetime',
  //    orderDir: 'DESC',
  //    start: start,
  //    pageSize: this.pageSize,
  //  };
  //  this._api.post('/timetableapi/Calendar/ListCourseCalendar', payLoad).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {

  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}
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

  //onSearch(searchText: string) {
  //  this.filterText = searchText;
  //  this.setPage(0);
  //}
  setPage(pagerOffset: any) {
    let searchData: any = {
      calcode: this.calcode,
      ctype: this.ctype,
      year: this.year,
      search: this.filterText,
      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/timetableapi/Calendar/ListCourseCalendar', searchData).subscribe(results => {
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

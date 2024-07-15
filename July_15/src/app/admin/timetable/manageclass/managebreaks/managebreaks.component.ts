import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';
import * as moment from 'moment';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router, ActivatedRoute } from '@angular/router';
import { AddBreakComponent } from './addbreak/addbreak.component';
import { EditBreakComponent } from './editbreak/editbreak.component';
@Component({
  selector: 'app-managebreaks',
  templateUrl: './managebreaks.component.html',
  styleUrls: ['./managebreaks.component.scss']
})
export class ManageBreaksComponent extends UnsubscribeOnDestroyAdapter
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
      active: 'Timetable Break List',
    },
  ];
  public _data: any = {};
  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [10, 25, 100];
  public totRecords: number = 0;
  public selectedElement: any = {};
  public search: string = '';
  subjectsList: any[] = [];
  showPagination: boolean = false;
  totalItems = 0;
  sortProperty: string = '';
  filterText: string = '';
  sortOrder = 1;
  loading = false;
  wkday: any[] = [];
  weekDaysList: any[] = [];
  startTimesList: any[] = [];
  endTimesList: any[] = [];
  mindate: Date;
  TimesList: any[] = [];
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  batchData: any = {};
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
  clscode: string | null = '';
  bcode: string | null = '';
  constructor(private _api: APICallService, private common: CommonService, public dialog: MatDialog,
    private datePipe: DatePipe, private route: ActivatedRoute) {
    super();
    this.batchData = {};
    this.mindate = new Date();
    this.startTimesList = [];
    this.endTimesList = [];
    this.wkday = [];
    
    this.clscode = "";
    this.bcode = "";
    this.columns = [];
    this.rows = [];
    this.showPagination = false;
    this.subjectsList = [];
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
    this.clscode = this.route.snapshot.queryParamMap.get('clscode');
    this.bcode = this.route.snapshot.queryParamMap.get('bcode');
    this.columns = [
      {
        "key": "cbcode",
        "name": "Class Batch",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "wkname",
        "name": "Week Day",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "stime",
        "name": "Start Time",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "etime",
        "name": "End Time",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "status",
        "name": "Status",
        "hidden": "N",
        "sorting": "Y",
        "order": 5
      }
    ]
    this.setPage(0);
  }
  ngAfterViewInit() {
  }
  
  StatusChange(row: any, type: number) {
    let that = this;
    let payLoad = { code: row.code, status: type };
    return this._api.post('/timetableapi/manage/changebreakstatus', payLoad).subscribe({
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
  AddBreak() {
    const dialogRef = this.dialog.open(AddBreakComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        action: 'add',
        clscode: this.clscode,
        bcode: this.bcode
      },
      // direction: 'ltr',
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.setPage(0);
      }
    });
  }
  BreakEdit(row: any) {
    const dialogRef = this.dialog.open(EditBreakComponent, {
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
  setPage(pagerOffset: any) {
    let searchData: any = {
      //calcode: this.calcode,
      //ctype: this.ctype,
      //year: this.year,
      //search: this.filterText,
      cbcode: this.bcode,

      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/timetableapi/manage/breaktimelist', searchData).subscribe(results => {
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


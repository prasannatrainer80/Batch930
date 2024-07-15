import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { APICallService, CommonService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ElicosIntakeEditComponent } from './elicos-intake-edit/elicos-intake-edit.component';
import { ElicosIntakeAddComponent } from './elicos-intake-add/elicos-intake-add.component';
@Component({
  selector: 'app-elicos-intakes',
  templateUrl: './elicos-intakes.component.html',
  styleUrls: ['./elicos-intakes.component.scss']
})
export class ElicosIntakesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  speclList: any[] = [];
  coursesList: any[] = [];
  coursecode: string = "";
  coursename: string = "";
  public notifyText: string = "";
  public breadscrums: any = [
    {
      title: '',
      items: [
        //{
        //  title: 'Intake List',
        //  url: '/admin/elicosintakes',
        //},
      ],
      active: 'Intake List',
    },
  ];
  coursetypecode: string = "";
  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public totRecords: number = 0;

  
  showPagination: boolean = false;
  totalItems = 0;
  sortProperty: string = '';
  filterText: string = '';
  sortOrder = 1;
  loading = false;
  columns: any[] = [];
  rows: any[] = [];
  public selectedElement: any = {};
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
  constructor(private _api: APICallService, public dialog: MatDialog, private _router: Router, private common: CommonService) {
    super();
    this.coursesList = [];
    this.coursetypecode = "ELICOS";
    this.columns = [];
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
        "key": "name",
        "name": "Intake Name",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "coursecode",
        "name": "Course Id",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "coursename",
        "name": "Course Name",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "ctypecode",
        "name": "Course Type",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "startdate",
        "name": "Intake Start Date",
        "hidden": "N",
        "sorting": "N",
        "order": 5        
      },
      {
        "key": "year",
        "name": "Year",
        "hidden": "N",
        "sorting": "Y",
        "order": 6
      },
      {
        "key": "coursefinishdate",
        "name": "Course Finish Date",
        "hidden": "N",
        "sorting": "Y",
        "order": 7
      },
      {
        "key": "closedate",
        "name": "Intake Close Date",
        "hidden": "N",
        "sorting": "Y",
        "order": 8
      },
      {
        "key": "originname",
        "name": "Receiver",
        "hidden": "N",
        "sorting": "Y",
        "order": 9
      },
      {
        "key": "ispublish",
        "name": "Is Published",
        "hidden": "N",
        "sorting": "Y",
        "order": 10
      },
      {
        "key": "template",
        "name": "Course Template",
        "hidden": "N",
        "sorting": "Y",
        "order": 11
      },
      {
        "key": "status",
        "name": "Status",
        "hidden": "N",
        "sorting": "Y",
        "order": 12
      }
      //{
      //  "key": "code",
      //  "name": "Valid To",
      //  "hidden": "Y",
      //  "sorting": "N",
      //  "order": 99
      //}      
    ]
    //this.setPage(0);
    this.onChangeCourseType(this.coursetypecode);
  }
  ngAfterViewInit() {
  }
  addNew() {
    if (this.coursecode == "" || this.coursecode == undefined) {
      this._api.errorNotify('Please select course');
      return;
    }
    let course = this.coursesList.filter(a => a.code == this.coursecode);

    const dialogRef = this.dialog.open(ElicosIntakeAddComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        action: 'add',
        coursecode: this.coursecode,
        coursetypecode: this.coursetypecode,
        coursename: course[0].name
      },
      // direction: 'ltr',
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.setPage(0);
      }
    });
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
  getCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value == '1') {
      return 'badge col-green'
    }
    else
      return 'badge col-red';
  }
  onChangeCourseType(ctype: any) {
    this.loadCoursesByCTypes(ctype);
  }
  loadCoursesByCTypes(ctype: string) {
    let that = this;
    this._api.post('/courseapi/manage/listbycoursetype', { ctypecode: ctype }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.coursesList = resp.data.list;
          that.coursecode = resp.data.list[0].code;
          that.onChangeCourse(resp.data.list[0].code)
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onChangeCourse(coursecode: string) {
    this.setPage(0);
    //this.loadData(coursecode);
  }
  //loadData(coursecode: string) {
  //  let that = this;
  //  let payLoad = {
  //    ctypecode:this.coursetypecode,
  //    coursecode: coursecode,
  //  };
  //  this.speclList = [];
  //  this._api.post('/courseapp/Intake/list', payLoad).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.dataSource.data = resp.data.list;
  //        setTimeout(() => {
  //          that.paginator.pageIndex = that.currentPage;
  //          that.paginator.length = resp.data.totalRecords;
  //          //that.totalRows = resp.data.totalRecords;
  //        });
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}
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
  //pageChanged(event: PageEvent) {
  //  this.pageSize = event.pageSize;
  //  this.currentPage = event.pageIndex;
  //  this.totalRows = event.length;
  //  this.loadData(this.coursecode);
  //}
  //refresh() {
  //  this.pageSize = 10;
  //  this.currentPage = 0;
  //  this.loadData(this.coursecode);
  //}
  StatusChange(row: any, status: number) {
    let that = this;
    let payLoad = { code: row.code, status: status };
    return this._api.post('/courseapi/Intake/UpdateStatus', payLoad).subscribe({
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
  IntakeEdit(row: any) {
    const dialogRef = this.dialog.open(ElicosIntakeEditComponent, {
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
  onSearch(searchText: string) {
    this.filterText = searchText;
    this.setPage(0);
  }
  setPage(pagerOffset: any) {
    let searchData: any = {
      ctypecode: this.coursetypecode,
      coursecode: this.coursecode,
      search: this.filterText,
      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/courseapi/Intake/list', searchData).subscribe(results => {
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

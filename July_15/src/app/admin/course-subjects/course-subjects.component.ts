import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CsAddComponent } from './cs-add/cs-add.component';
import { MatDialog } from '@angular/material/dialog';
import { CsEditComponent } from './cs-edit/cs-edit.component';
import { Router } from '@angular/router';
import { APICallService, CommonService } from '@core';
@Component({
  selector: 'app-course-subjects',
  templateUrl: './course-subjects.component.html',
  styleUrls: ['./course-subjects.component.scss']
})
export class CourseSubjectsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  coursetypesList: any[] = [];
  coursesList: any[] = [];
  ctype: string = "";
  coursecode: string = "";
  coursename: string = "";
  public notifyText: string = "";
  public breadscrums: any = [
    {
      title: '',
      items: [

      ],
      active: 'Course Subjects'
    },
  ];
  //public displayedColumns: string[] = [
  //  'status',
  //  'stage',
  //  'subcode',
  //  'subname',
  //  'subtype',
  //  'subfee',
  //  'isincludedocs',
  //  'contacthours',
  //  'createtime',
  //  'coursetypecode'
  //];

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
  constructor(private _api: APICallService, public dialog: MatDialog, private _router: Router, private _common: CommonService) {
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
        "key": "status",
        "name": "Status",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "subtype",
        "name": "Subject Type",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "subcode",
        "name": "Subject Code",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "subname",
        "name": "Subject Name",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "stage",
        "name": "Subject Stage",
        "hidden": "N",
        "sorting": "Y",
        "order": 5
      },
      {
        "key": "contacthours",
        "name": "Contact Hours",
        "hidden": "N",
        "sorting": "Y",
        "order": 6
      },
      {
        "key": "subfee",
        "name": "Subject Fee",
        "hidden": "N",
        "sorting": "Y",
        "order": 7
      },
      {
        "key": "isincludedocs",
        "name": "Inc. In Academic Docs",
        "hidden": "N",
        "sorting": "Y",
        "order": 8
      }
      
    ]
    this.loadCourseTypes();
  }
  ngAfterViewInit() {
  }
  addNew() {
    if (this.coursecode == "" || this.coursecode == undefined) {
      this._common.errorNotify('Please select course');
      return;
    }
    let course = this.coursesList.filter(a => a.code == this.coursecode);

    const dialogRef = this.dialog.open(CsAddComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        action: 'add',
        data: {
          coursetypecode: this.ctype,
          coursecode: this.coursecode,
          coursename: course[0].name
        }
      },
      // direction: 'ltr',
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.setPage(0);
      }
    });
  }
  loadCourseTypes() {
    let that = this;
    this._api.post('/appapi/coursetype/list', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.coursetypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
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
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onChangeCourse(coursecode: string) {
    this.setPage(0);
  }
  //loadData(coursecode: string) {
  //  let that = this;
  //  let start = this.currentPage * this.pageSize;
  //  let payLoad = {
  //    coursetypecode: this.ctype,
  //    coursecode: coursecode,
  //    orderColumn: 'subjectcode',
  //    orderDir: 'ASC',
  //    start: start,
  //    pageSize: this.pageSize,
  //  };
  //  this.dataSource.data = [];
  //  this._api.post('/courseapi/CourseSub/SubListByCourse', payLoad).subscribe({
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

  getCSS(value: string) {
    if (this._common.isEmpty(value)) return null;
    if (value == '1') {
      return 'badge col-green'
    }
    else
      return 'badge col-red';
  }

  getStatusText(value: string) {
    if (this._common.isEmpty(value)) return null;
    if (value == '1') {
      return 'Active'
    }
    else if (value == '0') {
      return 'Deactive'
    }
    return 'Delete';
  }

  getDocsStatusText(value: string) {
    if (this._common.isEmpty(value)) return null;
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
      coursetypecode: this.ctype,
      coursecode: this.coursecode,
      search: this.filterText,
      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/courseapi/CourseSub/SubListByCourse', searchData).subscribe(results => {
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
  StatusChange(row: any, status: number) {
    let that = this;
    let payLoad = { id: row.id, status: status };

    this._api.post('/courseapi/CourseSub/updatestatus', payLoad).subscribe({
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
  CourseSubjectEdit(row: any) {
    const dialogRef = this.dialog.open(CsEditComponent, {
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
  manageSpecialisation() {
    this._router.navigate(['/admin/specialisations']);
  }
}

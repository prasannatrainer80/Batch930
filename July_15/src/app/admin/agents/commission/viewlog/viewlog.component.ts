import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit, Inject
} from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';

@Component({
  selector: 'app-viewlog',
  templateUrl: './viewlog.component.html',
  styleUrls: ['./viewlog.component.scss']
})
export class ViewlogComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public _data: any = {};
  public displayedColumns: string[] = [
    'coursecode',
    'agentcode',
    'validfrom',
    'validto',
    'action',
    'changedby',
    'changedtime',
    'remarks'
  ];
  public totalRows = 0;
  public pageSize = 5;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public totRecords: number = 0;
  public dataSource: MatTableDataSource<any>;
  public search: string = '';
  public selectedElement: any = {};
  @ViewChild('input') input!: ElementRef;
  dialogTitle: string;

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
  constructor(
    private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<ViewlogComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.dataSource = new MatTableDataSource<any>([]);
    this.dialogTitle = "View Log"
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
      hidden: 'Y',
      sorting: 'N',
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
        "key": "coursecode",
        "name": "Course ID",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "agentcode",
        "name": "Agent ID",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "validfrom",
        "name": "From Date",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "validto",
        "name": "To Date",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "action",
        "name": "Action",
        "hidden": "N",
        "sorting": "Y",
        "order": 5
      },
      {
        "key": "changedby",
        "name": "Changed By",
        "hidden": "N",
        "sorting": "Y",
        "order": 6
      },
      {
        "key": "changedtime",
        "name": "Changed Time",
        "hidden": "N",
        "sorting": "Y",
        "order": 7
      }     
    ]
    this.setPage(0);
  }
  ngAfterViewInit() {
  }
  
  onCancel() {
    this.dialogRef.close(false);
  }
  //loadData() {
  //  let that = this;
  //  let start = this.currentPage * this.pageSize;
  //  let payLoad = {
  //    search: this.search,
  //    orderColumn: 'changedtime',
  //    orderDir: 'DESC',
  //    start: start,
  //    pageSize: this.pageSize,
  //  };
  //  this._api.post('/appapi/AgentCommission/viewlogList', payLoad).subscribe({
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
  //pageChanged(event: PageEvent) {
  //  this.pageSize = event.pageSize;
  //  this.currentPage = event.pageIndex;
  //  this.totalRows = event.length;
  //  this.loadData();
  //}
  //refresh() {
  //  this.pageSize = 10;
  //  this.currentPage = 0;
  //  this.loadData();
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
    this._api.post('/appapi/AgentCommission/viewlogList', searchData).subscribe(results => {
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

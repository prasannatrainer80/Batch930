import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { APICallService, CommonService } from '@core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { MatDialog } from '@angular/material/dialog';
import { EditcommissionComponent } from './editcommission/editcommission.component';
import { AddcommissionComponent } from './addcommission/addcommission.component';
import { ViewlogComponent } from './viewlog/viewlog.component';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: '',
      items: [],
      active: 'Agent Commission Rate List',
    },
  ];
  public _data: any = {};

  public notifyText: string = "";
  public totalRows = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public totRecords: number = 0;
  public selectedElement: any = {};
  public search: string = '';
  @ViewChild('input') input!: ElementRef;


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
    private _router: Router,
    private _api: APICallService,
    public dialog: MatDialog, private common: CommonService
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
        "key": "courseid",
        "name": "Course ID",
        "hidden": "N",
        "sorting": "N",
        "order": 1
      },
      {
        "key": "agentid",
        "name": "Agent ID",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "comissionperiod",
        "name": "Commission Period",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "comission",
        "name": "Commission %",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "gst",
        "name": "GST",
        "hidden": "N",
        "sorting": "Y",
        "order": 5
      },
      {
        "key": "fromdate",
        "name": "From Date",
        "hidden": "N",
        "sorting": "Y",
        "order": 6
      },
      {
        "key": "todate",
        "name": "To Date",
        "hidden": "N",
        "sorting": "Y",
        "order": 7
      },
      {
        "key": "status",
        "name": "Status",
        "hidden": "N",
        "sorting": "Y",
        "order": 8
      }  
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
    return this._api.post('/appapi/AgentCommission/updatestatus', payLoad).subscribe({
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

  CommissionEdit(row: any) {
    const dialogRef = this.dialog.open(EditcommissionComponent, {
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
  AddNewCommission() {
    const dialogRef = this.dialog.open(AddcommissionComponent, {
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

  //loadData() {
  //  let that = this;
  //  let start = this.currentPage * this.pageSize;
  //  let payLoad = {
  //    search: this.search,
  //    orderColumn: 'agentid',
  //    orderDir: 'ASC',
  //    start: start,
  //    pageSize: this.pageSize,
  //  };
  //  this._api.HttpPost(this.endpoints.agent_comm_List, payLoad).subscribe({
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


  viewlog() {
    const dialogRef = this.dialog.open(ViewlogComponent, {
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
  getGSTCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value.toLocaleLowerCase() == 'true') {
      return 'badge col-green'
    }
    else
      return 'badge col-red';
  }
  getGSTText(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value.toLocaleLowerCase() == 'true') {
      return 'Yes'
    }
    else
      return 'No';
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
      this._api.post('/appapi/AgentCommission/List', searchData).subscribe(results => {
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


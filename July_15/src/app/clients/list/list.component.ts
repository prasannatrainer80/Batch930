import { Component, OnInit, AfterViewInit } from '@angular/core';
import { APICallService, CommonService } from '@core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ManageComponent } from '../manage/manage.component';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: 'Clients',
      items: [
        {
          title: 'Clients List',
          url: '',
        },
      ],
      active: 'Clients List',
    },
  ];
  public _data: any = {};

  public notifyText: string = "";
  public totalRows = 0;
  public pageSize = 5;
  public currentPage = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  public totRecords: number = 0;

  public search: string = '';
  public selectedElement: any = {};
  public dashboardData: any = {};

  public showPagination: boolean = false;
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
    public dialog: MatDialog,
    private common: CommonService
  ) {
    this.showPagination = false;
    this.columns = [];
    this.rows = [];
    this.showPagination = false;

    this.filterText = '';
    this.sortProperty = '';
    this.sortOrder = 1;
    this.pageSize = 5;
    this.dashboardData = {
      total: "0",
      active: "0",
      draft: "0",
      delete: "0",
      suspend: "0",
      inactive: "0"
    }
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
        "key": "code",
        "name": "Client Code",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "name",
        "name": "Client Name",
        "hidden": "N",
        "sorting": "Y",
        "order": 2
      },
      {
        "key": "domainName",
        "name": "Domain Name",
        "hidden": "N",
        "sorting": "Y",
        "order": 3
      },
      {
        "key": "emailid",
        "name": "Email Id",
        "hidden": "N",
        "sorting": "Y",
        "order": 4
      },
      {
        "key": "createTime",
        "name": "Added On",
        "hidden": "N",
        "sorting": "N",
        "order": 99
      }
    ]
    this.dashboard();
    this.setPage(0);
  }
  ngAfterViewInit() {

  }

  redirectTo(uri: string) {
    this._router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this._router.navigate([uri]));
  }
  StatusChange(row: any, status: number) {
    let that = this;
    let confMsg = 'Are you sure you want to deactivate the client?';
    if (status == 3) {
      confMsg = "'Are you sure you want to suspend the client?"
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      data: {
        message: confMsg,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        let payLoad = { code: row.code, status: status };
        this._api.post('/appapi/client/changestatus', payLoad).subscribe({
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
    });

  }
  ClientActivate(row: any) {
    let that = this;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      data: {
        message: 'Are you sure you want to activate the client?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        let payLoad = { code: row.code };
        that._api.post('/appapi/client/activate', payLoad).subscribe({
          next(resp: any) {
            if (resp != null && resp.code == '0') {
              that._api.successNotify('Client Activated Successfully');
              that.setPage(0);
              //that.redirectTo(that.endpoints.clients_List);
            } else {
              that._api.errorNotify(resp?.message);
            }
          },
          error(msg: any) {
            console.log(msg);
            that._api.errorNotify('Something went wrong!')
          },
        });
      }
    });

  }
  ClientEdit(row: any) {
    const dialogRef = this.dialog.open(ManageComponent, {
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
  addNew() {
    const dialogRef = this.dialog.open(ManageComponent, {
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

  dashboard() {
    let that = this;
    this._api.post('/appapi/client/dashboard', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.dashboardData = resp.data;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  getCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value == '1') {
      return 'badge col-brown'
    }
    else if (value == '2') {
      return 'badge col-green'
    }
    else if (value == '3') {
      return 'badge col-pink'
    }
    else if (value == '4') {
      return 'badge col-orange'
    }
    else
      return 'badge col-red';
  }
  getStatusText(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value == '1') {
      return 'Invite'
    }
    else if (value == '2') {
      return 'Activate'
    }
    else if (value == '3') {
      return 'Suspend'
    }
    else if (value == '4') {
      return 'Inactive'
    }
    else
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
      clientId: '0',
      status: '0',
      module: '',
      search: this.filterText,
      pageSize: this.pageSize,
      start: pagerOffset,
      orderColumn: this.sortProperty || this.columns[0]?.key || '1',
      orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
    };

    this.loading = true;

    this._api.post('/appapi/client/list', searchData).subscribe(results => {
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

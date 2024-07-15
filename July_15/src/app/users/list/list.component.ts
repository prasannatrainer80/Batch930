import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, APICallService, CommonService, PlatformService } from '@core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StatusChangeComponent } from '../statuschange/statuschange.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  userInfo: any = {};
  filterData: any = {};
  filterChips: any[] = [];
  rolesList: any[] = [];

  breadscrums: any[] = [
    {
      title: 'List',
      items: [
        {
          title: 'Users',
          url: '/users/list',
        },
      ],
      active: 'List',
    },
  ];
  pageTitle: string = "User List";
  helpText: string = "";
  submitEffect: boolean = false;
  shimmerEffect: boolean = false;
  showPagination: boolean = false;
  showHelpText: boolean = false;
  totalItems = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  sortProperty: string = '';
  filterText: string = '';
  sortOrder = 1;
  loading = false;
  selectedElement: any = {};
  actions: any = {
    key: 'actions',
    name: 'Actions',
    hidden: 'Y',
    sorting: 'N',
    enable_view: "F",
    enable_filter: "T",
    enable_add: "T",
    enable_edit: "T",
    enable_delete: "F",
    enable_statuschange: "T"
  };
  clientsList: any[] = [];
  campusList: any[] = [];
  statusList: any[] = [];
  columns: any[] = [];
  rows: any[] = [];
  dashboardSummary: any[] = [];
  searchRole: any = '0';
  searchStatus: any = '1';
  searchClient: any = '-1';
  searchCampus: any = '0';
  constructor(
    private authService: AuthService,
    private _router: Router,
    private _api: APICallService,
    public dialog: MatDialog,
    private common: CommonService,
    private platform: PlatformService
  ) {
    super();
    this.clientsList = [];
    this.campusList = [];
    this.shimmerEffect = true;
    if (!this.common.isEmptyObj(this.authService.currentUserValue)) {
      this.userInfo = this.authService.currentUserValue;
    }
  }

  ngOnInit() {
    this.clearComponent();
    this.init();
    if (this.userInfo.roleType != '1') {
      this.loadClients();
      this.loadCampuses();
    }
    this.loadRolesData();
    this.dashboard();
    this.setPage(0);
  }

  clearComponent() {
    this.loading = false;
    this.actions = {
      key: 'actions',
      name: 'Actions',
      hidden: 'Y',
      sorting: 'N',
      enable_view: "F",
      enable_filter: "T",
      enable_add: "F",
      enable_edit: "F",
      enable_delete: "F",
      enable_statuschange: "F"
    };
    this.columns = [];
    this.statusList = [];
    this.rows = [];
    this.dashboardSummary = [];
    this.showPagination = false;
    this.filterChips = [];
    this.filterData = {};

    this.filterText = '';
    this.sortProperty = '';
    this.sortOrder = 1;
    this.pageSize = 10;
  }

  init() {
    let pagedData: any = this.getPageConfig();

    if (!this.common.isEmptyObj(pagedData?.dashboard) && pagedData?.dashboard == 'Y') {
      // this.loadDashboardSummary(this.moduleName);
    }

    this.helpText = pagedData?.help || '';

    let _dispColumns: any[] = [];
    if (!this.common.isEmptyObj(pagedData?.data)) {
      pagedData?.data?.forEach((element: any) => {
        if (element?.hidden != 'Y' && element?.key != 'actions') {
          _dispColumns.push(element);
        }
        if (element?.key == 'actions') { this.actions = element; }
      });
    }
    this.columns = _dispColumns;

    if (!this.common.isEmptyObj(pagedData?.statuslist)) {
      this.statusList = pagedData?.statuslist;
    }
  }

  redirectTo(uri: string) {
    this._router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this._router.navigate([uri]));
  }


  UserEdit(row: any) {
    this._router.navigate(['users', 'edit', row.code]);
    // const dialogRef = this.dialog.open(ManageComponent, {
    //   maxWidth: '118vw',
    //   maxHeight: '118vh',
    //   height: '95%',
    //   width: '95%',
    //   panelClass: 'full-screen-modal',
    //   disableClose: true,
    //   data: {
    //     data: row,
    //     action: 'edit',
    //   }
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === true) {
    //     this.setPage(0);
    //   }
    // });
  }

  addNew() {
    this._router.navigate(['users', 'add']);
    // const dialogRef = this.dialog.open(ManageComponent, {
    //   maxWidth: '118vw',
    //   maxHeight: '118vh',
    //   height: '95%',
    //   width: '95%',
    //   panelClass: 'full-screen-modal',
    //   disableClose: true,
    //   data: {
    //     action: 'add',
    //   },
    //   // direction: 'ltr',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === true) {
    //     this.setPage(0);
    //   }
    // });
  }

  async dashboard() {
    this.dashboardSummary = [
      {
        "name": "Total",
        "cols": "col-lg-2 col-sm-6",
        "color": "l-bg-card2",
        "counter": "0"
      },
      {
        "name": "Active",
        "cols": "col-lg-2 col-sm-6",
        "color": "l-bg-card1",
        "counter": "0"
      },
      {
        "name": "Draft",
        "cols": "col-lg-2 col-sm-6",
        "color": "l-bg-blue",
        "counter": "0"
      },
      {
        "name": "Suspend",
        "cols": "col-lg-2 col-sm-6",
        "color": "l-bg-purple",
        "counter": "0"
      },
      {
        "name": "Inactive",
        "cols": "col-lg-2 col-sm-6",
        "color": "l-bg-orange",
        "counter": "0"
      },
      {
        "name": "Delete",
        "cols": "col-lg-2 col-sm-6",
        "color": "l-bg-red",
        "counter": "0"
      }
    ];

    let that = this;
    this._api.post('/appapi/user/dashboard', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.dashboardSummary = [
            {
              "name": "Total",
              "cols": "col-lg-2 col-sm-6",
              "color": "l-bg-card2",
              "counter": resp.data?.total || '0'
            },
            {
              "name": "Active",
              "cols": "col-lg-2 col-sm-6",
              "color": "l-bg-card3",
              "counter": resp.data?.active || '0'
            },
            {
              "name": "Draft",
              "cols": "col-lg-2 col-sm-6",
              "color": "l-bg-card1",
              "counter": resp.data?.draft || '0'
            },
            {
              "name": "Suspend",
              "cols": "col-lg-2 col-sm-6",
              "color": "l-bg-blue",
              "counter": resp.data?.suspend || '0'
            },
            {
              "name": "Inactive",
              "cols": "col-lg-2 col-sm-6",
              "color": "l-bg-card4",
              "counter": resp.data?.inactive || '0'
            },
            {
              "name": "Delete",
              "cols": "col-lg-2 col-sm-6",
              "color": "l-bg-red",
              "counter": resp.data?.delete || '0'
            }
          ];
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  onChangePage(pager: any) {
    this.pageSize = pager.pageSize;
    this.setPage(pager.startIndex);
  }

  sortBy(property: string, sorting: string, propFor: string) {
    if (sorting.toUpperCase() !== 'Y') return;
    let sortColumn = this.common.isEmpty(propFor) ? property : propFor;
    this.sortOrder = sortColumn === this.sortProperty ? (this.sortOrder === 1 ? 0 : 1) : this.sortOrder;
    this.sortProperty = sortColumn;
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

    if (pagerOffset == 0) {
      this.totalItems = 0;
    }

    let searchData: any = {};
    searchData = { ...searchData, ... this.filterData };
    searchData = {
      ...searchData, ...{
        userid: '0',
        search: this.filterText,
        pageSize: this.pageSize,
        start: pagerOffset,
        orderColumn: this.sortProperty || this.columns[0]?.key || '1',
        orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC',
      }
    };

    this.loading = true;
    this.submitEffect = true;
    this._api.post('/appapi/user/list', searchData).subscribe(results => {
      this.rows = results?.data?.list || [];
      if (pagerOffset == 0) {
        this.totalItems = results?.data?.totalRecords || 0;
        if (this.totalItems > 0) {
          this.showPagination = true;
        }
        else {
          this.showPagination = false;
        }
      }
      this.loading = false;
      this.shimmerEffect = false;
      this.submitEffect = false;
    });
  }

  getCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    switch (value) {
      case '0': {
        return 'badge col-red';
      }
      case '1': {
        return 'badge col-green';
      }
      case '2': {
        return 'badge col-blue';
      }
      case '3': {
        return 'badge col-brown';
      }
      case '4': {
        return 'badge col-orange'
      }
      default:
        return '';
    }
  }

  getStatusText(value: string) {
    if (this.common.isEmpty(value)) return '';
    switch (value) {
      case '0': {
        return 'Delete'
      }
      case '1': {
        return 'Active'
      }
      case '2': {
        return 'Suspend'
      }
      case '3': {
        return 'Inactive'
      }
      case '4': {
        return 'Draft'
      }
      default:
        return '';
    }
  }

  async loadRolesData() {
    let that = this;
    this.platform.getUserRoles(this.userInfo.roleId, this.userInfo.roleType, this.userInfo.clientId).then((resp: any) => {
      let rolesList = resp;
      rolesList = rolesList.filter((a: any) => a.roleid != '1000' && a.roleid != '2006');
      that.rolesList = rolesList;
    });

  }

  getPageConfig() {
    return {
      "data": [
        {
          "key": "userid",
          "name": "Name",
          "hidden": "Y",
          "sorting": "N",
          "order": 1
        },
        {
          "key": "name",
          "name": "Name",
          "hidden": "N",
          "sorting": "Y",
          "order": 2
        },
        {
          "key": "rolename",
          "name": "Role",
          "hidden": "N",
          "sorting": "Y",
          "order": 3
        },
        {
          "key": "emailid",
          "name": "Email Id",
          "hidden": "N",
          "sorting": "N",
          "order": 4
        },
        {
          "key": "clientdomain",
          "name": "Domain",
          "hidden": "N",
          "sorting": "Y",
          "order": 4
        },
        {
          "key": "updatetime",
          "name": "Updated On",
          "hidden": "N",
          "sorting": "Y",
          "order": 5
        },
        {
          "key": "status",
          "name": "Status",
          "hidden": "N",
          "sorting": "Y",
          "order": 98
        },
        {
          "key": "actions",
          "name": "Actions",
          "hidden": "N",
          "sorting": "N",
          "order": 99,
          "enable_add": "T",
          "enable_edit": "T",
          "enable_delete": "F",
          "enable_statuschange": "T",
          "enable_view": "F",
          "enable_filter": "T",
        }
      ],
      "help": "",
      "statuslist": [
        {
          "key": "Active",
          "value": "1"
        },
        {
          "key": "Suspend",
          "value": "2"
        },
        {
          "key": "Inactive",
          "value": "3"
        },
        {
          "key": "Draft",
          "value": "4"
        },
        {
          "key": "Deleted",
          "value": "5"
        }
      ],
      "dashboard": "Y"
    };
  }

  StatusChange(item: any) {
    let displayStatus: any[] = [];
    let itemStatusName: any = '';
    if (item?.status == '1') {
      itemStatusName = 'Active';
      displayStatus = this.statusList.filter(x => x.value == '2' || x.value == '3' || x.value == '5');
    }
    else if (item?.status == '2') {
      itemStatusName = 'Suspend';
      displayStatus = this.statusList.filter(x => x.value == '1' || x.value == '3' || x.value == '5');
    }
    else if (item?.status == '3') {
      itemStatusName = 'Inactive';
      displayStatus = this.statusList.filter(x => x.value == '1' || x.value == '5');
    }
    else {
      this.common.infoNotify('Status Change is not allowed!');
      return;
    }

    let itemTitle = 'Status Change';
    const dialogStatusRef = this.dialog.open(StatusChangeComponent, {
      width: 500 + 'px',
      disableClose: false,
      data: {
        status: item?.status || '',
        emailid: item.emailid,
        name: item.name,
        rolename: item.rolename,
        dialogTitle: itemTitle,
        itemStatusName: itemStatusName,
        statusList: displayStatus
      },
    });
    dialogStatusRef.afterClosed().subscribe(result => {
      if (result?.reload == true) {
        this.setPage(0);
      }
    });
  }

  searchFilter() {
    this.filterData = {
      roleid: this.searchRole,
      status: this.searchStatus,
      campusid: this.searchCampus,
      clientid: this.searchClient
    };
    this.filterChips = [];
    Object.keys(this.filterData).forEach(key => {
      switch (key) {
        case 'roleid':
          let roleName: any = this.rolesList.find((x: any) => x.roleid == this.searchRole)?.name;
          if (!this.common.isEmpty(roleName)) {
            this.filterChips.push({ key: `Role:${roleName}`, value: key });
          }
          break;
        case 'status':
          let statusName: any = this.statusList.find((x: any) => x?.value == this.searchStatus)?.key;
          if (!this.common.isEmpty(statusName)) {
            this.filterChips.push({ key: `Status:${statusName}`, value: key });
          }
          break;
        case 'campusid':
          let campusName: any = this.campusList.find((x: any) => x.id == this.searchCampus)?.name;
          if (!this.common.isEmpty(campusName)) {
            this.filterChips.push({ key: `Campus:${campusName}`, value: key });
          }
          break;
        case 'clientid':
          let clientName: any = this.clientsList.find((x: any) => x.id == this.searchClient)?.name;
          if (!this.common.isEmpty(clientName)) {
            this.filterChips.push({ key: `College:${clientName}`, value: key });
          }
          break;
      }
    });

    this.setPage(0);
  }
  clearFilter() {
    this.searchRole = '0';
    this.searchStatus = '1';
    this.searchClient = '-1';
    this.searchCampus = '0';
    this.filterChips = [];
    this.filterData = {};
    this.setPage(0);
  }
  async loadClients() {
    let that = this;
    this.platform.getClients().then((resp: any) => {
      that.clientsList = resp;
    });
  }
  async loadCampuses() {
    let that = this;
    this.platform.getUserCampuses(this.userInfo.userId, this.userInfo.roleType, this.userInfo.clientId).then((resp: any) => {
      that.campusList = resp;
    });
  }
}

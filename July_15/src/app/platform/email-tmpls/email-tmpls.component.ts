import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, APICallService, CommonService } from '@core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-email-tmpls',
  templateUrl: './email-tmpls.component.html',
  styleUrls: ['./email-tmpls.component.scss'],
})
export class EmailTmplsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  userInfo: any = {};
  filterData: any = {};
  filterChips: any[] = [];
  breadscrums: any[] = [
    {
      title: 'List',
      items: [
        {
          title: 'Email Templates',
          url: '/template/list',
        },
      ],
      active: 'List',
    },
  ];
  pageTitle: string = "Email Templates List";
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
  statusList: any[] = [];
  columns: any[] = [];
  rows: any[] = [];
  tmplTypesList: any[] = [];
  searchTmplType: any = '';
  searchStatus: any = '1';
  constructor(
    private authService: AuthService,
    private _router: Router,
    private _api: APICallService,
    public dialog: MatDialog,
    private common: CommonService 
  ) {
    super();
    this.shimmerEffect = true;
    if (!this.common.isEmptyObj(this.authService.currentUserValue)) {
      this.userInfo = this.authService.currentUserValue;
    }
  }

  ngOnInit() {
    this.clearComponent();
    this.init();
    this.loadTemplateTypes();
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
    this.showPagination = false;
    this.filterChips = [];
    this.filterData = {
      tmpltype: this.searchTmplType,
      status: this.searchStatus
    };
    this.filterText = '';
    this.sortProperty = '';
    this.sortOrder = 1;
    this.pageSize = 10;
  }

  init() {
    let pagedData: any = this.getPageConfig();

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
    console.log(row);
    this._router.navigate(['platform/emailtmpls/', 'edit', row.code]);
  }

  addNew() {
    this._router.navigate(['platform/emailtmpls/', 'add']);
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
  searchFilter() {
    this.filterData = {
      tmpltype: this.searchTmplType,
      status: this.searchStatus
    };
    this.filterChips = [];
    Object.keys(this.filterData).forEach(key => {
      switch (key) {
        case 'tmpltype':
          let emailCode: any = this.tmplTypesList.find((x: any) => x.emailcode == this.searchTmplType)?.name;
          if (!this.common.isEmpty(emailCode)) {
            this.filterChips.push({ key: `Role:${emailCode}`, value: key });
          }
          break;
        case 'status':
          let statusName: any = this.statusList.find((x: any) => x?.value == this.searchStatus)?.key;
          if (!this.common.isEmpty(statusName)) {
            this.filterChips.push({ key: `Status:${statusName}`, value: key });
          }
          break;
      }
    });

    this.setPage(0);
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
        tmpltype: '',
        search: this.filterText,
        pageSize: this.pageSize,
        start: pagerOffset,
        orderColumn: this.sortProperty || this.columns[0]?.key || '1',
        orderDir: this.sortOrder === 1 ? 'DESC' : 'ASC'
      }
    };
    this.loading = true;
    this.submitEffect = true;
    this._api.post('/appapi/emailtmpl/list', searchData).subscribe(results => {
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

  getPageConfig() {
    return {
      "data": [
        {
          "key": "code",
          "name": "Name",
          "hidden": "Y",
          "sorting": "N",
          "order": 1
        },
        {
          "key": "emailcode",
          "name": "Template Code",
          "hidden": "N",
          "sorting": "Y",
          "order": 2
        },
        {
          "key": "emailsub",
          "name": "Template Subject",
          "hidden": "N",
          "sorting": "Y",
          "order": 3
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
          "key": "Inactive",
          "value": "0"
        },
      ]
    };
  }
  clearFilter() {
    this.setPage(0);
  }
  async loadTemplateTypes() {
    let that = this;
    let apiResp = await this._api.post('/appapi/emailtmpl/GetTmpls', {}).toPromise().then((resp: any) => resp as any);
    if (apiResp.code == '0') {
      if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
        that.tmplTypesList = apiResp.data.list;
      }
    }
  }
}

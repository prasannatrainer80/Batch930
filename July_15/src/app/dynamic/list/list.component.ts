import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APICallService, CommonService, MasterService } from '@core';
import { Router, ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';
import { DynamicStatusComponent } from '../dynamic-status/dynamic-status.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MasterService]
})
export class ListComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy {
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  filterForm!: FormGroup;
  filterData: any = {};
  filterChips: any[] = [];
  formFields: any[];

  moduleName: string = '';
  breadscrums: any[] = [
    {
      "title": "",
      "items": [],
      "active": ""
    }
  ];
  pageTitle: string = "";
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
  selectedElement: any = {};
  loading = false;
  actions: any = {
    key: 'actions',
    name: 'Actions',
    hidden: 'Y',
    sorting: 'N',
    enable_view: "F",
    enable_filter: "F",
    enable_add: "F",
    enable_edit: "F",
    enable_delete: "F",
    enable_statuschange: "F"
  };
  statusList: any[] = [];
  columns: any[] = [];
  rows: any[] = [];
  dashboardSummary: any[] = [];

  constructor(
    private _base: MasterService,
    private common: CommonService,
    private apiCall: APICallService,
    private dialog: MatDialog, private router: Router,
    private activatedRoute: ActivatedRoute, private el: ElementRef) {
    super();
    this.shimmerEffect = true;
    this.activatedRoute.paramMap.subscribe((params: any) => {
      if (this.moduleName != params.get('module')) {
        let initLoad: boolean = this.common.isEmpty(this.moduleName) ? false : true;
        this.moduleName = params.get('module');
        this.shimmerEffect = true;
        this.clearComponent();
        if (initLoad) {
          this.init();
        }
      }
    });
  }

  clearComponent() {
    this.loading = false;
    this.breadscrums = [
      {
        "title": "",
        "items": [],
        "active": ""
      }
    ];
    this.actions = {
      key: 'actions',
      name: 'Actions',
      hidden: 'Y',
      sorting: 'N',
      enable_view: "F",
      enable_filter: "F",
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

  ngOnInit() {
    this.init();
  }

  init() {
    this.apiCall.post(`/dataapi/config/get`, { module: this.moduleName, action: 'list' }).subscribe((pagedData: any) => {
      if (!this.common.isEmptyObj(pagedData?.breadcrumb)) {
        this.breadscrums = pagedData?.breadcrumb;
        this.pageTitle = this.breadscrums[0]?.title;
      }

      if (!this.common.isEmptyObj(pagedData?.dashboard) && pagedData?.dashboard == 'Y') {
        this.loadDashboardSummary(this.moduleName);
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
      this.setPage(0);
      if (!this.common.isEmptyObj(pagedData?.statuslist)) {
        this.statusList = pagedData?.statuslist;
      }

      if (this.actions?.enable_filter == 'T' || this.actions?.enable_filter == 'Y') {
        this.apiCall.post(`/dataapi/config/get`, { module: this.moduleName, action: 'filters' }).subscribe((filers: any) => {
          this.formFields = this._base.getTemplateFields(filers?.data);
          this.filterForm = this.toFilterFormGroup(this.formFields);
          console.log("XXXXXXXXXXXXXXX", this.filterForm)
          this.formFields?.filter((x: any) => x?.controlType.indexOf('dropdown') > -1 && x?.changeinput == "" && x?.options?.length == 0)?.forEach((element: any) => {
            this.DropdownFill(element.key);
          });

          this.formFields?.filter((x: any) => x?.controlType.indexOf('dropdown') > -1 && x?.changeinput != "" && x?.changeinput?.split(',')?.length > 0)?.forEach((element: any) => {
            this.DropdownFillOnLoad(element.key);
          });
        });
      }

    });
  }

  async loadDashboardSummary(keyName: any) {
    this.apiCall.post('/dataapi/module/dashboard', { module: keyName }).subscribe(results => {
      this.dashboardSummary = results?.data || [];
    });
  }

  getCSS(value: string) {
    if (this.common.isEmpty(value)) return null;
    if (value.indexOf('|') > 0) {
      return value.split('|')[1];
    }
    else
      return value;
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
    if (this.actions.enable_filter == 'T') {
      searchData = { ...searchData, ... this.filterData };
    }

    searchData = {
      ...searchData, ...{
        module: this.moduleName,
        search: this.filterText,
        pagelimit: this.pageSize,
        pageoffset: pagerOffset,
        orderby: this.sortProperty || this.columns[0]?.key || '1',
        ordertype: this.sortOrder === 1 ? 'DESC' : 'ASC'
      }
    };

    this.loading = true;
    this.submitEffect = true;

    this.apiCall.post('/dataapi/module/search', searchData).subscribe(results => {
      this.rows = results?.data?.rows || [];
      if (pagerOffset == 0) {
        this.totalItems = results?.data?.page?.totalElements || this.rows?.length || 0;
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

  deleteItem(itemCode: any) {
    let itemTitle = 'Delete';
    let item = this.rows?.find(x => x.code == itemCode);
    if (item != null) {
      itemTitle = item?.name || item?.title || 'Delete';
    }
    // this.openDialog('delete', '', itemCode);
  }

  addNew() {
    // this.router.navigate([this.moduleName, 'add']);
    if (this.actions?.display_add != 'POPUP') {
      if (!this.common.isEmpty(this.actions['url_add'])) {
        this.router.navigate([this.actions['url_add']]);
      }
      else {
        this.router.navigate([this.moduleName, 'add']);
      }
    }
    else {
      this.openDialog('add', 'New');
    }
  }

  menuAction(itemCode: any, menuIndex: any) {
    if (!this.common.isEmpty(this.actions['menuurl' + menuIndex])) {
      this.router.navigate([this.actions['menuurl' + menuIndex], itemCode]);
    }
  }

  viewItem(itemCode: any) {
    this.router.navigate([this.moduleName, 'view', itemCode]);
  }

  editItem(itemCode: any) {
    //this.router.navigate([this.moduleName, 'edit', itemCode]);
    if (this.actions?.display_edit != 'POPUP') {
      if (!this.common.isEmpty(this.actions['url_edit'])) {
        this.router.navigate([this.actions['url_edit'], itemCode]);
      }
      else {
        this.router.navigate([this.moduleName, 'edit', itemCode]);
      }
    }
    else {
      let itemTitle = 'Edit';
      let item = this.rows?.find(x => x.code == itemCode);
      if (item != null) {
        itemTitle = item?.name || item?.title || 'Edit';
      }
      this.openDialog('edit', itemTitle, itemCode);
    }
  }

  openDialog(actionType: string, itemTitle: string, itemCode: string = '') {
    let dialogWidth: number = 700;
    // let dialogHeight: number = 600;
    let popupSize: string = 'MEDIUM';
    if (!this.common.isEmpty(this.actions['size_' + actionType])) {
      switch (this.actions['size_' + actionType].toUpperCase()) {
        case 'SMALL':
          popupSize = 'SMALL';
          dialogWidth = 500;
          break;
        case 'LARGE':
          popupSize = 'LARGE';
          dialogWidth = 1024;
          break;
      }
    }

    const dialogRef = this.dialog.open(DynamicModalComponent, {
      width: dialogWidth + 'px',
      // height: dialogHeight + 'px',
      disableClose: false,
      data: {
        size: popupSize,
        // height: `height: ${dialogHeight - 150}px`,
        action: actionType,
        module: this.moduleName,
        code: itemCode,
        dialogTitle: itemTitle
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.reload == true) {
        this.setPage(0);
      }
    });
  }

  statusChange(itemCode: any) {
    let itemTitle = '';
    let item = this.rows?.find(x => x.code == itemCode);
    if (item != null) {
      itemTitle = item?.name || item?.title;
    }
    const dialogStatusRef = this.dialog.open(DynamicStatusComponent, {
      width: 500 + 'px',
      disableClose: false,
      data: {
        module: this.moduleName,
        code: itemCode,
        status: item?.status || '-1',
        dialogTitle: itemTitle,
        statusList: this.statusList
      },
    });
    dialogStatusRef.afterClosed().subscribe(result => {
      if (result?.reload == true) {
        this.setPage(0);
      }
    });
  }
  changeDate(evt: any, key: string) {
    let val = formatDate(evt.value, 'yyyy-MM-dd', 'en-GB');
    this.filterForm.get(key)?.setValue(val);
  }


  DropdownFillOnLoad(elementId: string) {
    this.loading = true;
    const payLoad: any = {
      module: this.moduleName,
      action: 'filters',
      key: elementId,
      val: "",
      loadtype: "self"
    };

    let itemKeys: any[] = [];
    itemKeys = this.formFields?.find(x => x.key == elementId)?.changeinput?.split(',');
    if (itemKeys?.length > 0) {
      for (let i = 0; i < itemKeys.length; i++) {
        payLoad[itemKeys[i]] = this.formFields?.find(x => x.key == itemKeys[i])?.value;
      }
    }

    this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
      this.loading = false;
      if (!this.common.isEmpty(itemData?.data?.key)) {
        this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;
      }
    });
  }

  DropdownFill(elementId: string) {
    this.loading = true;
    const payLoad: any = {
      module: this.moduleName,
      action: 'filters',
      key: elementId,
      val: "",
      loadtype: "self"
    };

    this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
      this.loading = false;
      if (!this.common.isEmpty(itemData?.data?.key)) {
        this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;
      }
    });
  }

  TargetChange(elementId: string, targetId: string, elementValue: any) {
    let element: any = this.formFields?.find((x: any) => x?.key == elementId);
    if (!this.common.isEmptyObj(element) && element?.onchngshow == true) {
      let showValue: string = `${element?.key?.toLowerCase()}_${elementValue?.toLowerCase()}`;

      this.formFields.filter((x: any) => x?.showonchng == true && !this.common.isEmpty(x?.grpname)).forEach((s: any) => {
        if (s?.grpname?.toLowerCase().indexOf(showValue) > -1 || s.key == elementId) {
          s.hidden = false;
        }
        else {
          s.hidden = true;
        }
      });

    }

    if (!this.common.isEmpty(targetId) && targetId.toUpperCase() != 'NA') {
      this.loading = true;
      let payLoad: any = {
        module: this.moduleName,
        action: 'filters',
        key: elementId,
        loadtype: "target"
      };

      let itemKeys: any[] = [];
      itemKeys = this.formFields.find(x => x.key == targetId)?.changeinput?.split(',');
      if (itemKeys?.length > 0) {
        let formPayLoad = this.filterForm.getRawValue();
        for (let i = 0; i < itemKeys.length; i++) {
          payLoad[itemKeys[i]] = formPayLoad[itemKeys[i]];
        }
      }

      this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
        this.loading = false;
        if (!this.common.isEmpty(itemData?.data?.key)) {
          this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;

          const hasAltCtrl: boolean = this.formFields.find(x => x.key == itemData?.data?.key)?.showaltctrl || false;

          if (hasAltCtrl) {
            if (this.common.isEmptyObj(itemData?.data?.options)
              || (itemData?.data?.options?.length == 1 && itemData?.data?.options[0]?.value == "")) {
              this.formFields.find(x => x.key == itemData?.data?.key).altctrl = true;
            }
            else {
              this.formFields.find(x => x.key == itemData?.data?.key).value = "";
              this.formFields.find(x => x.key == itemData?.data?.key).altctrl = false;
            }
          }
        }
      });
    }
  }

  __DropdownFill(elementId: string) {
    this.loading = true;
    const payLoad: any = {
      module: this.moduleName,
      action: 'filters',
      key: elementId,
      val: "",
      loadtype: "self"
    };
    this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
      this.loading = false;
      if (!this.common.isEmpty(itemData?.data?.key)) {
        this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;
      }
    });
  }

  __TargetChange(elementId: string, targetId: string, elementValue: any) {
    if (this.common.isEmpty(targetId) || targetId.toUpperCase() == 'NA') return;

    this.loading = true;
    let payLoad: any = {
      module: this.moduleName,
      action: 'filters',
      key: elementId,
      loadtype: "target"
    };

    let itemKeys: any[] = [];
    itemKeys = this.formFields.find(x => x.key == targetId)?.changeinput?.split(',');
    if (itemKeys?.length > 0) {
      let formPayLoad = this.filterForm.getRawValue();
      for (let i = 0; i < itemKeys.length; i++) {
        payLoad[itemKeys[i]] = formPayLoad[itemKeys[i]];
      }
    }

    this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
      this.loading = false;
      if (!this.common.isEmpty(itemData?.data?.key)) {
        this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;
      }
    });
  }

  toFilterFormGroup(masters: any[]) {
    let group: any = {};
    masters.forEach(mst => { group[mst.key] = new FormControl(''); });
    return new FormGroup(group);
  }
  searchFilter() {
    this.filterData = { ...{}, ... this.filterForm.getRawValue() };
    this.filterChips = [];
    Object.keys(this.filterData).forEach(key => {
      let value = this.filterData[key];
      if (!this.common.isEmpty(value)) {
        let element: any = this.formFields.find(x => x.key == key);

        if (element?.controlType == 'dropdown' && !this.common.isEmptyObj(element?.options)) {
          let ddlKey: any = element.options.find((x: any) => x.value == value)?.key;
          if (!this.common.isEmpty(ddlKey)) {
            this.filterChips.push({ key: `${element.label}:${ddlKey}`, value: key });
           
          }
        }
        else if (element?.controlType != 'hidden') {
          this.filterChips.push({ key: `${element.label}: ${key}`, value: key });
        }
      }
    });
    this.setPage(0);
  }
  clearFilter() {
    this.filterForm = this.toFilterFormGroup(this.formFields);
    this.filterChips = [];
    this.filterData = {};
    this.setPage(0);
  }
}

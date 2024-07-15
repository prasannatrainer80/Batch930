import { Component, OnInit } from '@angular/core';
import { APICallService, AuthService, CommonService, PlatformService, User } from '@core';
import { UntypedFormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  myControl: FormControl = new FormControl();

  breadscrums: any[] = [
    {
      title: 'Add',
      items: [
        {
          title: 'Users',
          url: '/users/list',
        },
      ],
      active: 'Add',
    },
  ];
  userform!: UntypedFormGroup;
  userInfo: any = {}
  userrolesdata: any = {};
  action: string;
  dialogTitle: string;
  userRoles: any[] = [];
  collegesList: any[] = [];
  countriesList: any[] = [];
  prRole: string = "0";
  prCampus: string = "0";
  campusList: any[] = [];
  currUserInfo!: User;
  proles: string[] = [];
  pcampuses: string[] = [];

  priorityRoles: any[] = [];
  priorityCampuses: any[] = [];
  userCode: string = "";
  constructor(private _api: APICallService, private _common: CommonService,
    private platfrom: PlatformService, private authService: AuthService,
    private _router: Router,
    private activatedRoute: ActivatedRoute) {
    this.action = "add";
    this.userInfo = {
      title: "",
      userid: 0,
      username: "",
      loginid: "",
      clientdomain: "",
      roleid: "0",
      userroles: [],
      collegecode: "",
      usercolleges: [],
      countryid: "0",
      mobileno: "",
      address: "",
      city: "",
      zipcode: "",
      campusid: "0",
      usercampuses: [],
      proles: [],
      pcampuses: []
    }
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.userCode = this._common.isEmpty(params.get('code')) ? "" : params.get('code');
      if (this.userCode != "") {
        this.action = "edit";
      }
    });
    this.dialogTitle = this.action === 'edit' ? 'Edit User' : "Add User"
    if (!this._common.isEmptyObj(this.authService.currentUserValue)) {
      this.currUserInfo = this.authService.currentUserValue;
    }

  }
  ngOnInit() {
    if (this.currUserInfo.roleType != '1') {
      this.loadCampuses(this.action);
    }
    this.loadRolesData(this.action);
    this.loadCountries();

    //this.loadColleges(this.action);
    if (this.action === 'edit') {
      // get user based on userid,loginid
      let that = this;
      this._api.post('/appapi/user/bycode', { code: this.userCode, }).subscribe({
        next(resp: any) {
          that.userInfo = resp.data;
          if (resp.code == '0' && resp.data != undefined) {

            let userroles = that.userInfo.userroles;
            let proles: string[] = [];
            userroles.forEach((ele: any) => {
              proles.push(ele.roleid)
            });
            that.userInfo.proles = proles;
            that.proles = proles;

            if (that.userRoles != undefined && that.userRoles.length > 0) {
              let priorityRoles: any[] = [];
              that.userRoles.forEach((ele: any) => {
                let urole = userroles?.filter((a: any) => a.roleid == ele.roleid);
                if (urole != undefined && urole.length > 0) {
                  priorityRoles.push(ele);
                }
              });
              that.priorityRoles = priorityRoles;
            }

            if (that.currUserInfo.roleType != '1') {

              let usercampuses = that.userInfo.usercampuses;
              let pcampuses: string[] = [];
              usercampuses.forEach((ele: any) => {
                pcampuses.push(ele.campusid)
              });
              that.userInfo.pcampuses = pcampuses;
              that.pcampuses = pcampuses;
              if (that.campusList != undefined && that.campusList.length > 0) {
                let priorityCampuses: any[] = [];
                that.campusList.forEach(ele => {
                  let uCamps = usercampuses?.filter((a: any) => a.campusid == ele.id);
                  if (uCamps != undefined && uCamps.length > 0) {
                    priorityCampuses.push(ele);
                  }
                });
                that.priorityCampuses = priorityCampuses;
              }
            }
          }
        },
        error(msg: any) {
          console.log(msg);
        },
      });
    }
    else {
    }
  }

  async loadCountries() {
    let that = this;
    this.platfrom.getCountries().then((resp: any) => {
      that.countriesList = resp;
    });
    // this._api.post('/appapi/Masters/GetCountries', {}).subscribe({
    //   next(resp: any) {
    //     if (resp.code == '0' && resp.data.list.length > 0) {
    //       that.countriesList = resp.data.list;
    //     }
    //   },
    //   error(msg: any) {
    //     console.log(msg);
    //   },
    // });
  }
  loadColleges(action: string) {
    let that = this;
    this._api.post('/appapi/Masters/GetColleges', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          let collegesList = resp.data.list;
          if (action == 'edit') {
            collegesList.forEach((ele: any) => {
              ele.checked = false;
            });
          }
          that.collegesList = collegesList;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  loadRolesData(action: string) {
    let that = this;
    this.platfrom.getUserRoles(this.currUserInfo.roleId, this.currUserInfo.roleType, this.currUserInfo.clientId).then((resp: any) => {
      let rolesList = resp;
      rolesList = rolesList.filter((a: any) => a.roleid != '1000' && a.roleid != '2006');
      if (action == 'edit') {
        rolesList.forEach((ele: any) => {
          ele.checked = false;
        });
      }
      that.userRoles = rolesList;
    });
    // this._api.post('/appapi/masters/getroles', {}).subscribe({
    //   next(resp: any) {
    //     if (resp.code == '0') {
    //       let userrolesdata = resp.data.list;
    //       userrolesdata = userrolesdata.filter((a: any) => a.roleid != '2006');//remove student
    //       userrolesdata = userrolesdata.filter((a: any) => a.roleid != '1000');
    //       if (action == 'edit') {
    //         userrolesdata.forEach((ele: any) => {
    //           ele.checked = false;
    //         });
    //       }
    //       that.userRoles = userrolesdata;
    //     }
    //   },
    //   error(msg: any) {
    //     console.log(msg);
    //   },
    // });
  }
  onSubmit() {
    let that = this;
    if (this._common.isEmpty(this.userInfo.title)) {
      this._common.errorNotify('Please select user title');
      return;
    }
    if (this._common.isEmpty(this.userInfo.username)) {
      this._common.errorNotify('Please enter user name');
      return;
    }
    // if (this._common.isEmpty(this.userInfo.clientdomain)) {
    //   this._common.errorNotify('Please enter user domain');
    //   return;
    // }
    if (this._common.isEmpty(this.userInfo.loginid)) {
      this._common.errorNotify('Please enter user email id');
      return;
    }
    if (this._common.isEmpty(this.userInfo.countryid)) {
      this._common.errorNotify('Please select user country');
      return;
    }
    if (this._common.isEmpty(this.userInfo.mobileno)) {
      this._common.errorNotify('Please enter user mobile number');
      return;
    }
    if (this._common.isEmpty(this.userInfo.roleid)) {
      this._common.errorNotify('Please enter user priority role');
      return;
    }
    let campuses: any[] = [];
    let uroles: any[] = [];
    if (this.currUserInfo.roleType != '1') {
      if (this._common.isEmpty(this.userInfo.campusid)) {
        this._common.errorNotify('Please enter user priority campus');
        return;
      }
      this.campusList.forEach((ele: any) => {
        let rexists = that.pcampuses.filter((a: any) => a == ele.id);
        if (rexists != undefined && rexists.length > 0) {
          campuses.push({ campusid: ele.id, status: "1" });
        }
      });
      this.userRoles.forEach((ele: any) => {
        let rexists = that.proles.filter((a: any) => a == ele.roleid);
        if (rexists != undefined && rexists.length > 0) {
          uroles.push({ roleid: ele.roleid, status: "1" });
        }
      });
    }
    let payLoad = {
      action: this.action,
      userid: this.userInfo.userid,
      name: this.userInfo.username,
      loginid: this.userInfo.loginid,
      emailid: this.userInfo.loginid,
      roleid: this.userInfo.roleid,
      clientid: 1,
      clientdomain: this.userInfo.clientdomain,
      logintype: 1,
      loginip: "127.0.0.1",
      userroles: uroles,
      usercampuses: campuses,
      title: this.userInfo.title,
      campusid: this.userInfo.campusid,
      contacts: {
        countryid: this.userInfo.countryid,
        mobileno: this.userInfo.mobileno,
        address: this.userInfo.address,
        city: this.userInfo.city,
        zipcode: this.userInfo.zipcode
      }
    };
    if (this.action === 'add') {
      this._api.post('/appapi/user/Invite', payLoad).subscribe({
        next(resp: any) {
          if (resp.code == '0') {
            that._api.successNotify(resp.message);
            setTimeout(() => {
              that._router.navigate(['users', 'list']);
            }, 2000);
          }
          else {
            that._api.errorNotify(resp?.message);
            setTimeout(() => {
              that._router.navigate(['users', 'list']);
            }, 2000);
          }
        },
        error(msg: any) {
          console.log(msg);
          that._api.errorNotify(msg)
        },
      });
    }
    else {
      this._api.post('/appapi/user/update', payLoad).subscribe({
        next(resp: any) {
          if (resp.code == '0') {
            that._api.successNotify(resp.message);
            setTimeout(() => {
              that._router.navigate(['users', 'list']);
            }, 2000);
          }
          else {
            that._api.errorNotify(resp?.message);
            setTimeout(() => {
              that._router.navigate(['users', 'list']);
            }, 2000);
          }
        },
        error(msg: any) {
          console.log(msg);
          that._api.errorNotify(msg)
        },
      });
    }
  };

  userRoleChange1(roleid: any) {
    this.prRole = roleid;
  }
  userRoleChange(proles: any) {
    this.proles = proles;
    let roles: any = [];
    this.userRoles.forEach((ele: any) => {
      let rexists = proles.filter((a: any) => a == ele.roleid);
      let alrdyexists = roles.filter((a: any) => a.roleid == ele.roleid);
      if (rexists != undefined && rexists.length > 0 && alrdyexists.length == 0) {
        roles.push(ele);
      }
    });
    if (roles.length > 0) {
      this.priorityRoles = roles;
    }
  }

  userCampusChange1(campusId: any) {
    this.prCampus = campusId;
  }
  userCampusChange(pcampuses: any) {
    this.pcampuses = pcampuses;
    let campuses: any = [];
    this.campusList.forEach((ele: any) => {
      let rexists = pcampuses.filter((a: any) => a == ele.id);
      let alrdyexists = campuses.filter((a: any) => a.id == ele.id);
      if (rexists != undefined && rexists.length > 0 && alrdyexists.length == 0) {
        campuses.push(ele);
      }
    });
    if (campuses.length > 0) {
      this.priorityCampuses = campuses;
    }
  }
  async loadCampuses(action: string) {
    let that = this;
    this.platfrom.getCampus().then((resp: any) => {
      if (action == 'edit') {
        resp.forEach((ele: any) => {
          ele.checked = false;
        });
      }
      that.campusList = resp;
    });
  }
}

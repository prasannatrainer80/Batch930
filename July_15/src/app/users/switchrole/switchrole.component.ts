import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, APICallService, CommonService, User, PlatformService } from '@core';

@Component({
  selector: 'app-switchrole',
  templateUrl: './switchrole.component.html',
  styleUrls: ['./switchrole.component.scss']
})
export class SwitchRoleComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  submitEffect: boolean = false;

  hasSelection: boolean = true;

  hasCollege: boolean = false;
  collegeList: any[] = [];
  collegeId: string = '';

  hasCampus: boolean = false;
  campusList: any[] = [];
  campusId: string = '';

  hasRoles: boolean = false;
  roleList: any[] = [];
  roleId: string = '';

  userInfo!: User;
  constructor(
    public authService: AuthService,
    private common: CommonService,
    private apiCall: APICallService,
    private platform: PlatformService,
    public dialogRef: MatDialogRef<SwitchRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.submitEffect = false;
    if (!this.common.isEmptyObj(this.authService.currentUserValue)) {
      this.userInfo = this.authService.currentUserValue;
    }
  }

  ngOnInit() {
    try {
      this.roleList = JSON.parse(this.userInfo.roleList);
      if (this.roleList?.length > 1) {
        this.hasSelection = true;
      }
      this.loadCampuses();

      // if (this.userInfo.roleType == '1') {
      //   //  load colleges
      //   this.loadClients();
      // }
      // else {
      //   //  load campus
      //   this.loadCampuses();
      //   // load roles 
      //   this.loadRolesData();
      // }
    } catch (e) { }
  }
  // async loadClients() {
  //   let that = this;
  //   this.platform.getClients().then((resp: any) => {
  //     if (resp.length > 1) {
  //       that.hasCollege = true;
  //       that.hasSelection = true;
  //     }
  //     that.collegeList = resp;
  //     that.collegeId = that.userInfo.clientId;
  //   });
  // }
  async loadCampuses() {
    let that = this;
    this.platform.getUserCampuses(this.userInfo.userId, this.userInfo.roleType, this.userInfo.clientId).then((resp: any) => {
      if (resp.length > 1) {
        that.hasCampus = true;
        that.hasSelection = true;
      }
      that.campusList = resp;
      that.campusId = that.userInfo.campusId;
    });
  }
  // async loadRolesData() {
  //   let that = this;
  //   this.apiCall.post('/appapi/user/GetPriorityRoles', { userId: this.userInfo.userId }).subscribe({
  //     next(resp: any) {
  //       console.log(resp);
  //       if (resp != null && resp.code == '0' && resp.data.list != undefined && resp.data.list.length > 0) {
  //         let roles = resp.data.list;
  //         if (roles.length > 1) {
  //           that.hasRoles = true;
  //           that.hasSelection = true;
  //         }
  //         that.roleList = roles;
  //         that.roleId = that.userInfo.roleId;
  //       }
  //     },
  //     error(msg: any) {

  //     },
  //   });
  // }

  submitForm() {
    this.submitEffect = true;

    if (this.userInfo.roleId != this.roleId) {

      let payload: any = {
        // college: this.collegeId,
        campus: this.campusId,
        role: this.roleId
      };
      let that = this;
      this.apiCall.post('/appapi/user/SwitchSelection', payload).subscribe({
        next(resp: any) {
          that.submitEffect = false;

          if (resp != null && resp.code == '0') {

            if (that.hasCollege) {
              that.userInfo.clientId = that.collegeId;
            }
            if (that.hasCampus) {
              that.userInfo.campusId = that.campusId;
            }
            if (that.hasRoles) {
              that.userInfo.roleId = that.roleId;
              that.userInfo.roleName = that.roleList.find(x => x.roleid == this.roleId)?.name;
            }
            that.authService.switchSelection(that.userInfo);
            that.dialogRef.close({ reload: true });
          } else {
            that.apiCall.errorNotify(resp?.message)
            that.dialogRef.close({ reload: false });
          }
        },
        error(msg: any) {
          that.submitEffect = false;
          that.apiCall.errorNotify('Something went wrong!');
          that.dialogRef.close({ reload: false });
        },
      });
    }
    else {
      this.submitEffect = false;
      this.dialogRef.close({ reload: false });
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ reload: false });
  }
}

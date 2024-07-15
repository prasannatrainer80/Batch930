import { Injectable } from '@angular/core';
import { APICallService } from './apicall.service';
import { AuthService } from './auth.service';
import { CommonService, AppCache } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {

  public MapRoles: AppCache[] = [];
  public Countries: AppCache[] = [];
  public UserCampuses: AppCache[] = [];
  public Campuses: AppCache[] = [];
  public TCSIReportOptions: AppCache[] = [];
  public Clients: AppCache[] = [];

  public currentUser: any;
  constructor(private _common: CommonService,
    private _auth: AuthService,
    private _api: APICallService) {
    this.currentUser = this._auth.currentUserValue;
  }
  async getUserRoles(rid: string, rtype?: string, clientid?: string) {
    let userRoles: any = [];
    try {
      if (this._common.isEmpty(rid)) {
        rid = this.currentUser.roleId;
      }
      if (this._common.isEmpty(rtype)) {
        rtype = this.currentUser.roleType;
      }
      if (this._common.isEmpty(clientid)) {
        clientid = this.currentUser.clientId;
      }

      if (this.MapRoles == null || this.MapRoles == undefined || this.MapRoles.length == 0) this.MapRoles = [];
      var postdata = { roleid: rid, roletype: rtype, clientid: clientid };
      var keyName = "maproles_" + postdata.roleid + "_" + postdata.roletype + "_" + postdata.clientid;

      userRoles = this.MapRoles.find(a => a.key == keyName)?.val;

      if (userRoles == null || userRoles == undefined || userRoles.legth == 0) {
        let apiResp = await this._api.post('/appapi/masters/getroles', postdata).toPromise().then((resp: any) => resp as any);
        if (apiResp.code == '0') {
          if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
            userRoles = apiResp.data.list;
            this.MapRoles.push({ key: keyName, val: userRoles });
          }
        }
        return userRoles;
      }
      else {
        return userRoles;
      }
    } catch (e) {
      return userRoles;
    }
  }
  async getUserCampuses(userid: string, rtype?: string, clientid?: string) {
    let userCampuses: any = [];
    try {
      if (this._common.isEmpty(userid)) {
        userid = this.currentUser.userid;
      }

      if (this._common.isEmpty(clientid)) {
        clientid = this.currentUser.clientId;
      }
      if (this._common.isEmpty(rtype)) {
        rtype = this.currentUser.roleType;
      }
      if (this.UserCampuses == null || this.UserCampuses == undefined || this.UserCampuses.length == 0) this.UserCampuses = [];
      var postdata = { userid: userid, roletype: rtype, clientid: clientid };
      var keyName = "usercampuses_" + postdata.userid + "_" + postdata.roletype + "_" + postdata.clientid;

      userCampuses = this.UserCampuses.find(a => a.key == keyName)?.val;

      if (userCampuses == null || userCampuses == undefined || userCampuses.legth == 0) {
        let apiResp = await this._api.post('/appapi/user/getcampuses', postdata).toPromise().then((resp: any) => resp as any);
        if (apiResp.code == '0') {
          if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
            userCampuses = apiResp.data.list;
            this.UserCampuses.push({ key: keyName, val: userCampuses });
          }
        }
        return userCampuses;
      }
      else {
        return userCampuses;
      }
    } catch (e) {
      return userCampuses;
    }
  }
  async getClients() {
    let clients: any = [];
    try {
      if (this.Clients == null || this.Clients == undefined || this.Clients.length == 0) this.Clients = [];
      var keyName = "clients";
      clients = this.Clients.find(a => a.key == keyName)?.val;
      if (clients == null || clients == undefined || clients.legth == 0) {
        let apiResp = await this._api.post('/appapi/Masters/GetColleges', {}).toPromise().then((resp: any) => resp as any);
        if (apiResp.code == '0') {
          if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
            clients = apiResp.data.list;
            this.Clients.push({ key: keyName, val: clients });
          }
        }
        return clients;
      }
      else {
        return clients;
      }
    } catch (e) {
      return clients;
    }
  }

  async getCampus() {
    let campuses: any = [];
    try {
      if (this.Campuses == null || this.Campuses == undefined || this.Campuses.length == 0) this.Campuses = [];
      var keyName = "campuses";
      campuses = this.Campuses.find(a => a.key == keyName)?.val;
      if (campuses == null || campuses == undefined || campuses.legth == 0) {
        let apiResp = await this._api.post('/appapi/Masters/GetCampuses', {}).toPromise().then((resp: any) => resp as any);
        if (apiResp.code == '0') {
          if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
            campuses = apiResp.data.list;
            this.Campuses.push({ key: keyName, val: campuses });
          }
        }

        return campuses;
      }
      else {
        return campuses;
      }
    } catch (e) {
      return campuses;
    }
  }
  async getCountries() {
    let countries: any = [];
    try {
      if (this.Countries == null || this.Countries == undefined || this.Countries.length == 0) this.Countries = [];
      var keyName = "countries";
      countries = this.Countries.find(a => a.key == keyName)?.val;
      if (countries == null || countries == undefined || countries.legth == 0) {
        let apiResp = await this._api.post('/appapi/Masters/GetCountries', {}).toPromise().then((resp: any) => resp as any);
        if (apiResp.code == '0') {
          if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
            countries = apiResp.data.list;
            this.Countries.push({ key: keyName, val: countries });
          }
        }
        return countries;
      }
      else {
        return countries;
      }
    } catch (e) {
      return countries;
    }
  }
  async getTcsiReportOptions() {
    let tcsioptions: any = [];
    try {
      if (this.TCSIReportOptions == null || this.TCSIReportOptions == undefined || this.TCSIReportOptions.length == 0) this.TCSIReportOptions = [];
      var keyName = "tcsireportoptions";
      tcsioptions = this.TCSIReportOptions.find(a => a.key == keyName)?.val;
      if (tcsioptions == null || tcsioptions == undefined || tcsioptions.legth == 0) {
        let apiResp = await this._api.post('/appapi/rgrade/GetTcsiReportOptions', {}).toPromise().then((resp: any) => resp as any);
        if (apiResp.code == '0') {
          if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
            tcsioptions = apiResp.data.list;
            this.TCSIReportOptions.push({ key: keyName, val: tcsioptions });
          }
        }
        return tcsioptions;
      }
      else {
        return tcsioptions;
      }
    } catch (e) {
      return tcsioptions;
    }
  }
}

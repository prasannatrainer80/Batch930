import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor() { }

  //#region authentication
  public auth_login: string = `/loginapi/auth/signin`;
  //#endregion

  //#region dynamic route endpoints
  public course_insert_tmpl: string = `/reqapi/college/templateinsert`;
  public course_update_tmpl: string = `/reqapi/college/templateupdate`;
  public course_search_tmpl: string = `/reqapi/college/search`;

  public insert_tmpl: string = `/reqapi/app/!module!/template/insert`;
  public update_tmpl: string = `/reqapi/app/!module!/template/update`;
  public search_url: string = `/reqapi/app/!module!/search`;
  public insert_url: string = `/reqapi/app/!module!/insert`;
  public update_url: string = `/reqapi/app/!module!/update`;
  public delete_url: string = `/reqapi/app/!module!/delete`;
  public statuschange_url: string = `/reqapi/app/!module!/statusChange`;
  public upload_url: string = `/reqapi/upload/file`;
  public upload_s3_url: string = `/reqapi/upload/s3file`;
  //#endregion

  //#region Administration setup

  public course_Types: string = `/appapi/coursetype/list`;
  public courses_ByTypes: string = `/courseapp/manage/listbycoursetype`;

  public courses_Subjects: string = `/courseapp/CourseSub/SubListByCourse`;
  public subjects_List: string = `/courseapp/Subjects/List`;
  public course_Subject_Add: string = `/courseapp/CourseSub/Add`;
  public course_Subject_UpdateStatus: string = `/courseapp/CourseSub/updatestatus`;
  public course_Subject_Get: string = `/courseapp/CourseSub/Get`;
  public course_Subject_Edit: string = `/courseapp/CourseSub/Update`;

  public specl_Add: string = `/courseapp/Specialisations/Add`;
  public specl_List: string = `/courseapp/Specialisations/List`;
  public specl_UpdateStatus: string = `/courseapp/Specialisations/UpdateStatus`;
  public speclSubs_Add: string = `/courseapp/SpecSub/Add`;
  public speclSubs_UpdateStatus: string = `/courseapp/SpecSub/UpdateStatus`;


  public enrollfee_Get: string = `/courseapp/feeenrollment/getfeeenrollmentbyid`;
  public enrollfee_List: string = `/courseapp/feeenrollment/list`;
  public enrollfee_Add: string = `/courseapp/feeenrollment/add`;
  public enrollfee_Update: string = `/courseapp/feeenrollment/update`;
  public enrollfee_StatusChange: string = `/courseapp/feeenrollment/updatestatus`;

  public resultgrades_ListSummary: string = `/appapi/RGrade/ListSummary`;
  public resultgrades_List: string = `/appapi/RGrade/List`;
  public resultgrades_StatusChange: string = `/appapi/RGrade/ChangeStatus`;
  public resultgrades_Add: string = `/appapi/RGrade/Add`;
  public resultgrades_Update: string = `/appapi/RGrade/Update`;

  public resultgrades_outcometypes: string = `/appapi/RGrade/GetOutcomeTypes`;
  public resultgrades_gradetypes: string = `/appapi/Masters/GetResultGradeTypes`;

  public sidformat_set: string = `/appapi/SIDFormat/Set`;
  public sidformat_get: string = `/appapi/SIDFormat/get`;

  public vet_intakes_list: string = `/courseapp/Intake/list`;
  public vet_intakes_add: string = `/courseapp/Intake/add`;
  public vet_intakes_update: string = `/courseapp/Intake/update`;
  public vet_intakes_updatestatus: string = `/courseapp/Intake/UpdateStatus`;

  public vet_intakes_StartDatesList: string = `/courseapp/Intake/GetIntakeStartDatesList`;
  public vet_intakes_TemplatesList: string = `/courseapp/Intake/GetTemplatesList`;

  public elicos_intakes_add: string = `/courseapp/Intake/AddElicos`;



  //#endregion

  //#region user management
  public user_Get: string = `/appapi/user/get`;
  public user_List: string = `/appapi/user/list`;
  public user_Invite: string = `/appapi/user/Invite`;
  public user_Update: string = `/appapi/user/update`;
  public user_Activate: string = `/appapi/user/activate`;
  public user_GetRoles: string = `/appapi/masters/getroles`;

  public user_StatusChange: string = `/appapi/user/changestatus`;
  //#endregion

  //#region masters
  public masters_Origins: string = `/appapi/masters/getorigins`;
  public get_countries: string = `/appapi/Masters/GetCountries`;
  public get_colleges: string = `/appapi/Masters/GetColleges`;
  public get_GetOfferDocsList: string = `/appapi/Masters/GetOfferDocsList`;
  //#endregion


  public student_reg_search: string = `/reqapi/app/studentreg/search`;
  public student_reg_get: string = `/courseapp/student/get`;
  public student_reg_add: string = `/courseapp/student/Add`;
  public student_reg_list: string = `/courseapp/student/List`;
  public student_reg_changestatus: string = `/courseapp/student/ChangeStatus`;
  public student_reg_update: string = `/courseapp/student/Update`;
  public student_reg_UpdateFileDet: string = `/courseapp/student/UpdateFileDet`;
  public student_reg_GetFileDet: string = `/courseapp/student/GetFileDet`;


  public get_GetFeeDetByCourseCode: string = `/courseapp/CourseFee/FeeDetByCourseCode`;
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { APICallService, AuthService, CommonService } from '@core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DocxService } from '@core/service/docx.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeeScheduleComponent } from './fee-schedule/fee-schedule.component';

// import * as PizZip from 'pizzip';
// import * as Docxtemplater from 'docxtemplater';
// import { saveAs } from 'file-saver';

// import * as JSZipUtils from 'jszip-utils';


interface Status {
  id: string;
  statusId: string;
  statusdesc: string;
  createdon: string;
  updatedon: string;
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  list: any
  campusName: string = '';
  campusId: any;
  clientId: any;
  roleId: any;
  apiService = inject(APICallService);
  authService = inject(AuthService);
  http = inject(HttpClient);

  searchKey: any = '';
  showData: boolean = false
  allstudents: [];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalCount: number;
  selectedItem: any;
  showDetails: boolean = false;
  formattedData: any;
  groupedData: any;

  dialog = inject(MatDialog)
  statuses: Status[] = [];
  allStatusNames: any = [];
  statusdescription: any
  selectedStatusId: string | null = null;
  mappedData: any []
  courseTable: any = []
  breadscrums = [
    {
      title: 'Offer Management',
      items: [{ title: 'Offer Management' }],
      active: 'Offer Management',
    },
  ];

  displayedColumns: string[] = [
    'code',
    'firstname',
    'emailid',
    'studenttype',
    'selectedcourse',
    'status',
    'startdate',
    'closedate',
     'actions'
    ];

  searchItems = [
    // {key: 'All', value: 'All'},
    { key: 'studentid', value: 'Student Id' },
    { key: 'firstname', value: 'First Name' },
    { key: 'middlename', value: 'Middle Name' },
    { key: 'lastname', value: 'Last Name' },
    { key: 'nickname', value: 'Nick Name' },
    { key: 'collegecode', value: 'College Code' },
    { key: 'coursetype', value: 'Course Type' },
    { key: 'emailid', value: 'Email' },
    { key: 'gender', value: 'Gender' },
    { key: 'origin', value: 'Origin' },
    { key: 'agent', value: 'Agent Name' }
  ]

  statusesMap: Map<string, string> = new Map();

  constructor(private cdr: ChangeDetectorRef, private commonService: CommonService,  private docxService: DocxService) {

  }

  ngOnInit(): void {
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.initialLoad()
    // this.getApplicationStatus()
    this.getstudentstatus()
    this.dataSource = new MatTableDataSource<any>([]);
    this.getStdList()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async loadData() {
    const url = '/studentapi/Student/AllCampusList';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'];
      const item = list?.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  initialLoad(){
    this.getallStudents('All','');
  }
  onSearch(filterValue: any, key?: any) {
    console.log("Key and Value: ", key, filterValue)
    this.getallStudents(this.selectedStatusId);
    this.showData = false
    if (this.searchKey)
      this.showData = true
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }

  onSearchClear() {
    this.searchKey = '';
  }

  async getallStudents(value: any, key?: any) {
    const url = '/studentapi/Student/GetStudentsListByKey';

    const payload = {
      key: "status",
      byval: this.selectedStatusId
    };

    this.apiService.post(url, payload).subscribe({
      next: (res: any) => {
        this.showData = true
        console.log("Studetn Details: ", res)
        this.allstudents = res.data.previewdata.studentpersonalInfo
        console.log("ALL STUDENTS: ", this.allstudents)
        this.mappedData = this.allstudents.map((entry: any) => ({
          dob: this.removeTimeFromDate(entry.dob),
          startdate: this.removeTimeFromDate(entry.startdate),
          closedate: this.removeTimeFromDate(entry.closedate),
          code: entry.code,
          coursecode: entry.coursecode,
          duration:entry.duration,
          emailid:entry.emailid,
          enrollmentfee:entry.enrollmentfee,
          firstname: entry.firstname,
          intakecode: entry.intakecode,
          intakeyear: entry.intakeyear,
          lastname: entry.lastname,
          materialfee: entry.materialfee,
          middlename: entry.middlename,
          origincode: entry.origincode,
          selectedcourse:entry.selectedcourse,
          status: entry.status,
          statusdescription: entry.statusdescription,
          studenttype: entry.studenttype,
          title: entry.title,
          tutionfee: entry.tutionfee
        }));
         console.log("MAPPPPPPPED:", this.mappedData)
        this.dataSource = new MatTableDataSource<any>(this.mappedData);
        this.cdr.detectChanges()
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
        this.totalCount = res.data.totalRecords;
        console.log(this.totalCount)

      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
 removeTimeFromDate(dateString) {
    return dateString.split(' ')[0]; // Split by space and take the first part (date)
  }
  showStudentDetails(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }

  onClose() {
    this.selectedItem = null;
    this.showDetails = false;
  }

 

 
  async previewOffer(row){
    console.log("Selected Student Row code: ", row.code)
    this.courseTable = this.docxService.getCoursesByCode(this.mappedData, row.code )
    console.log("Table Data: ", this.courseTable)
    this.docxService.showPreviewOffer(this.mappedData , this.courseTable);
  }


  onStatusSelected(selectedStatusId) {
    this.selectedStatusId = selectedStatusId;
    console.log('Selected Status ID:', this.selectedStatusId);
  }
  async getApplicationStatus() {
    const url = '/studentapi/Student/applicationstatus';
    await this.apiService.post(url, {}).subscribe((res: any) => {
      this.statuses = res.data.list;
      res.data.list.forEach(status => {
        this.statusesMap.set(status.statusId, status.statusdesc);
      });
    });
   
  }

  async getstudentstatus() {
    const statusMaster = "/studentapi/Student/statusMaster"
    const payload = {}
    await this.apiService.post(statusMaster, payload).subscribe(
      (response) => {
        const allStatusNames = response?.data?.list

        allStatusNames.forEach(status => {
          this.statusesMap.set(status.id, status.statusdescription);
        });

        console.log(this.statusesMap)

        this.allStatusNames = allStatusNames
        console.log(this.allStatusNames)
        const Statusmaster = this.allStatusNames.filter((e) => {
          return e.statusid == this.groupedData?.studentInfo?.status
        })
        this.statusdescription = Statusmaster[0]?.statusdescription

      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
  }

  async getStdList() {
    const url = '/studentapi/Student/GetStudentsListByKey';
    const payload = {
      key: "status", byval: "1"
    };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.list = res.data.previewdata.studentpersonalInfo      ;
      console.log('Std List: ', this.list);
    });
  }

  feeSchedule(row){
    this.courseTable = this.docxService.getCoursesByCode(this.mappedData, row.code )
    console.log("Student Data sending to dialog: ", this.mappedData[0])
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.data = {
      data: this.mappedData[0],
      courseTable :this.courseTable
    }
    matDialogConfig.width = '1250px'
  
    matDialogConfig.disableClose = true
    const dialogRef = this.dialog.open(FeeScheduleComponent, matDialogConfig)
  }

}

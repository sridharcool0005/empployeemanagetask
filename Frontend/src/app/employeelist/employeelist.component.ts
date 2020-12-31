import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../apiCalls/api-call.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  emailSearch: string;
  nameSearch: string;
  employeeDetails: Employee[];

  constructor(private userService: ApiCallService) {
  }

  ngOnInit() {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.userService.getEmployeeDetails().subscribe((res: any) => {
      // console.log(res);
      this.employeeDetails = res;
    });
  }

  deleteEmployee(empId, id) {
    const data = { _id: empId };
    this.userService.deleteEmployee(data).subscribe((res: any) => {
      // console.log(res);
      alert(res.message);
      this.employeeDetails.splice(id, 1);
    });
  }

  employeefilter() {
    const data:any = {}
    if (this.emailSearch) {
      data.email = this.emailSearch
    }
    if (this.nameSearch) {
      data.name = this.nameSearch;
    }
    this.userService.employeefilter(data).subscribe((res: any) => {
      // console.log(res);
      this.employeeDetails = res.result;
    });
  }

}


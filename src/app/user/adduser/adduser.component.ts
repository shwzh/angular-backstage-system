import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [];

  pageIndex = 1;
  total = 140;
  pageSize = 10;
  loading = true;

  constructor(public httpclient: HttpClient) { }

  ngOnInit() {

  }

  requestData() {
    this.loading = true;
    const api = 'http://10.203.97.101:8080/osbapi_web/rest/projects';
    this.httpclient.get(api).subscribe((response: any) => {
      console.log(response);
      this.data = response.result;
      this.loading = false;
    });
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }
}

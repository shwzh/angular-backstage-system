
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { equal } from 'assert';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css',
]
})

export class EdituserComponent implements OnInit {
  i = 1;
  editCache = {};
  inputValue = null;
  inputValue1 = null;
  dataSet = [];
  data = [];
  tableData = [];
  loading = false;
  isVisible = false;
  status = 300;
  message = 'success';

  constructor(public httpclient: HttpClient) { }
  showModal(): void {
    this.isVisible = true;
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  handleOk(): void {
    console.log('点击了确定键');
    // 这里面是发请求的112
    this.sendMsg();
    this.isVisible = false;
  }

  sendMsg() {
    console.log(this.inputValue, this.inputValue1, 'zhangyan');
    this.loading = true;
    const api = 'http://10.203.97.101:8080/osbapi_web/rest/projects';
    if (this.status === 200) {
      alert('修改成功!');
    } else {
      alert('修改失败,错误原因：' + this.message);
    }
    // let self = this;
    // this.httpclient.post(api).subscribe((projectName: '', readTimeOut: self.inputValue, connectTimeOut: self.inputValue1 ) => {
    //   console.log(response);
    //   self.data = response.result;
    //   self.loading = false;
    //   self.getTableData()
    // });
  }

  requestData() {
    this.loading = true;
    // const api = 'http://10.203.97.101:8080/osbapi_web/rest/projects';
    const api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
    // const self = this;
    this.httpclient.get(api).subscribe((response: any) => {
      console.log(response, 'iiiiiiiiiiii');
      this.dataSet = response.result;
      this.loading = false;
    });
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  startEdit(key: string): void {
    // this.editCache[ key ].edit = true;
    // alert('zhangyan');
    this.showModal();
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    Object.assign(this.dataSet[ index ], this.editCache[ key ].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }


  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[ item.key ]) {
        this.editCache[ item.key ] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        key    : i.toString(),
        name   : `Edrward ${i}`,
        age    : 32,
        address: `London Park no. ${i}`
      });
    }
    this.updateEditCache();
    this.requestData();
  }

  editMsg() {
    alert('123');
  }
}

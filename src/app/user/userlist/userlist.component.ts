import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse,  } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { $ } from 'protractor';
import { NzAlertModule } from 'ng-zorro-antd';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: [
    './userlist.component.css',
    '../../../bootstrap/bootstrap-3.3.7-dist/css/bootstrap.min.css',
  ]
})

export class UserlistComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];
  loading = false;

  startEdit(serviceName: string): void {
    this.editCache[ serviceName ].edit = true;
  }

  cancelEdit(serviceName: string): void {
    this.editCache[ serviceName ].edit = false;
  }

  saveEdit(mainKey: string): void {
    // 检查数据合法性
    console.log(mainKey);
    this.sendMsg(mainKey);
  }

  updateEditCache(): void {
    // console.log(this.dataSet, 'lllllllll');
    this.dataSet.map((item) => {
      item.mainKey = item.serviceName + item.serviceFullName + item.serviceProject + item.serverInfo;
    });

  this.dataSet.forEach(item => {
      if (!this.editCache[ item.mainKey ]) {
        this.editCache[ item.mainKey ] = {
          edit: false,
          data: { ...item }
        };

      }
    });
  }

  ngOnInit(): void {
    // for (let i = 0; i < 100; i++) {
    //   this.dataSet.push({
    //     title: '',
    //     username: '',
    //     serviceName: null,
    //     catid : '',
    //     dateline: '',
    //     pic: '',
    //   });
    // }
    // this.requestData();
  }

  constructor(public httpclient: HttpClient) { }

  requestData() {
    this.loading = true;
    const api = 'http://10.203.97.101:8080/osbweb/rest/projects?server=PTD01';
    // const api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
    // this.httpclient.get(api).pipe(catchError(this.handleError));
    this.httpclient.get(api).subscribe((response: any) => {
      console.log(response);
      this.dataSet = response.data;
      this.updateEditCache();
      this.loading = false;
    });
  }

  sendMsg(mainKey: any) {
    const index = this.dataSet.findIndex(item => item.mainKey === mainKey);
    console.log(index, 'llllllll');
    const before = this.dataSet[ index ];
    const after = this.editCache[ mainKey ].data;

    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json', })};
    const api = 'http://10.203.97.101:8080/osbweb/rest/update';
    const data = {
      serviceName: after.serviceName,
      serviceURI: after.serviceURI,
      serviceFullName: after.serviceFullName,
      serviceProject: after.serviceProject,
      readTimeOut: after.readTimeOut,
      connectionTimeOut: after.connectionTimeOut,
      serverInfo: after.serverInfo
      };
      console.log(data);

    this.httpclient.post(api, data, httpOptions).subscribe((res: any) => {
        console.log(res, res.code, typeof res.code);
        if (res.code === 200) {
          console.log(after, index);
          Object.assign(before, after);
          // this.dataSet[index] = this.editCache[ serviceName ].data;

          this.editCache[ mainKey ].edit = false;
          // console.log(this.dataSet[ index ]);
          alert('修改成功');
        } else {
          // this.dataSet[ index ] = this.dataSet[ index ];
          const errorCode = res.code;
          const message = res.msg;
          this.editCache[ mainKey ].edit = false;
          alert('修改失败:' + errorCode + '详情:' + message );
        }
    });
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from "@angular/router";
import { AuthenService } from './authen.service';
import { SystemConstants } from '../../common/system.constants';
import 'rxjs/add/operator/map';
import { UtilityService } from './utility.service';
import { NotificationService } from './notification.service';
import { MessageConstants } from '../../common/message.constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private headers: Headers;

  constructor(private _http: Http,
    private _router: Router,
    private _authenService: AuthenService,
    private _utilityService: UtilityService,
    private _notificationService: NotificationService)
  { }

  get(uri: string) {
    let self = this;
    self.headers.delete("Authorization");
    self.headers.append("Authorization", "Bearer " + self._authenService.getLoggedInUser().access_token);
    return self._http.get(SystemConstants.BASE_API + uri, { headers: self.headers }).map(self.extractData);
  }

  post(uri: string, data?: any) {
    let self = this;
    self.headers.delete("Authorization");
    self.headers.append("Authorization", "Bearer " + self._authenService.getLoggedInUser().access_token);
    return self._http.post(SystemConstants.BASE_API + uri, data, { headers: self.headers }).map(self.extractData);
  }

  put(uri: string, data?: any) {
    let self = this;
    self.headers.delete("Authorization");
    self.headers.append("Authorization", "Bearer " + self._authenService.getLoggedInUser().access_token);
    return self._http.put(SystemConstants.BASE_API + uri, data, { headers: self.headers }).map(self.extractData);
  }

  delete(uri: string, key: string, id: string) {
    let self = this;
    self.headers.delete("Authorization");
    self.headers.append("Authorization", "Bearer " + self._authenService.getLoggedInUser().access_token);
    return self._http.delete(SystemConstants.BASE_API + uri + "/?" + key + "=" + id, { headers: self.headers }).map(self.extractData);
  }
  postFile(uri: string, data?: any) {
    let self = this;
    let newHeader = new Headers();
    newHeader.delete("Authorization");
    newHeader.append("Authorization", "Bearer " + self._authenService.getLoggedInUser().access_token);
    return self._http.post(SystemConstants.BASE_API + uri, data, { headers: newHeader }).map(self.extractData);
  }
  public handleError(error: any) {
    let self = this;
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      self._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      self._utilityService.navigateToLogin();
    }
    else {
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'System error';
      self._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
}

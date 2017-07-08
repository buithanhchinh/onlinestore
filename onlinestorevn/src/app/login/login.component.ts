import { MessageConstants } from './../common/message.constants';
import { AuthenService } from './../core/services/authen.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { UriConstants } from '../common/uri.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  vm: any = {};
  constructor(private _nofiticationService: NotificationService, 
              private _authenService: AuthenService,
              private _router: Router) { }

  ngOnInit() {
  }
  login(){   
      this.loading = true;
      this._authenService.login(this.vm.username, this.vm.password).subscribe(data=>{
        this._router.navigate([UriConstants.LOGIN])
      }, error=>{
        this._nofiticationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
        this.loading = false;
      });
  }
}

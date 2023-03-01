import { Component, OnInit, OnDestroy, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/_service/global.service';
import { UserService } from 'src/app/_service/master/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  trueLogin = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  BranchCode: any;
  YEars: any;
  getBranch: any;
  getYears: any;

  constructor(
    private _http: HttpClient,
    public _UserService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private appRef: ApplicationRef
  ) {
    this._UserService.Vuser = {
      password: '',
      username: '',
    };
  }
  ngOnInit(): void { }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      this.spinner.show();
      this._UserService.LoginP().subscribe((data) => {
        this.spinner.hide();

        if (data === null) {
          alert('invaild user name');
        } else {
          this.trueLogin = true;
          if (data.type == "A") {
            localStorage.setItem('token', data.token);
            // this.cd.detectChanges();
            // localStorage.setItem('id', data.id.toString());
            this.cd.detectChanges();
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('email', data.email);
            localStorage.setItem('Lang', 'ar');
            localStorage.setItem('textDir', 'Rtl');
            this._UserService.isAuthed = true;
            this._UserService.saveCurrentUser();
            this.router.navigateByUrl("");
          } else {
            alert("ليس لك صلاحية الدخول")
          }
        }
      });
    }
  }
  Goo() {
    this._UserService.LoginP().subscribe((data) => {
      if (data === null) {
        alert('invaild user name');
      } else {
        this.trueLogin = true;
        this.cd.detectChanges();

        localStorage.setItem('token', data.xToken);
        this.cd.detectChanges();

        localStorage.setItem('id', data.id.toString());
        this.cd.detectChanges();
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('dStoreCode', data.dStoreCode);
        localStorage.setItem('dCustCode', data.dCustCode);
        localStorage.setItem('email', data.email);
        localStorage.setItem('Lang', 'ar');
        this.cd.detectChanges();
        localStorage.setItem('textDir', 'Rtl');
        this.cd.detectChanges();
        localStorage.setItem('branchCode', this.BranchCode);
        localStorage.setItem('Year', this.YEars);
        var bran = this.getBranch.filter(
          (k) => k.branchCode == this.BranchCode
        );
        localStorage.setItem('BranchName', bran[0].branchAraName);
        this.appRef.tick();
        this._UserService.isAuthed = true;
        this.router.navigate(['/']);
        this._UserService.saveCurrentUser();
      }
    });
  }
}

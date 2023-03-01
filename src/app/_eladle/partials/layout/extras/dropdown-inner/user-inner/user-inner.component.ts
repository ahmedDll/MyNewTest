import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { UserService } from 'src/app/_service/master/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  // variables
  selectedLang:string;
  currentLang: string;
  username: string;
  user:string;

  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  private unsubscribe: Subscription[] = [];
  langs = languages;

  constructor(
    private translate: TranslationService,
    private _UserService:UserService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    console.log(this.langs);
    // this.onChangeLanguage(this.currentLang);

  }

  ngOnInit(): void {

  }

  islogout() {
    this._UserService.logOut()
    document.location.reload();
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  onChangeLanguage(lang: string): void {
    this.selectedLang = lang;
    const htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = this.selectedLang === 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = this.selectedLang;
    this.document.body.className = this.selectedLang === 'ar' ? 'body_Ar' : 'body_En';
  //  localStorage.setItem('lang', this.selectedLang);
    this.translate.use(this.selectedLang);
   
  }


}


const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'ar',
    name: 'Arabic',
    flag: './assets/media/flags/egypt.svg',
  },


];

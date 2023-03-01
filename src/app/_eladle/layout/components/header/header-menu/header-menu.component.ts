import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/modules/i18n';
import { UserService } from 'src/app/_service/master/user.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  public BranchName = localStorage.getItem('BranchName');
  public Year = localStorage.getItem('Year');
  selectedLang!: string;
  currentLang: string;

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private _UserService: UserService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.currentLang = localStorage.getItem('currentLang' || 'ar');
    // this.translationService.use(this.currentLang);
    const htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = localStorage.getItem('textDir');
    this.document.body.className = localStorage.getItem("Lang") === 'en' ? 'body_En' : 'body_Ar';
  }

  ngOnInit(): void {

  }

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }


  Chngelang() {
    if (localStorage.getItem('Lang') == 'en') {
      localStorage.setItem('Lang', 'ar');
      this.translationService.setLanguage('ar');
      localStorage.setItem('textDir', 'rtl');

      const htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
      htmlTag.dir = this.selectedLang === 'ar' ? 'ltr' : 'rtl';
      htmlTag.lang = this.selectedLang;
      this.document.body.className = this.selectedLang === 'ar' ? 'body_Ar' : 'body_En';
      try {
        this.translationService.use(this.selectedLang);
      } catch {

      }
    }
    else {
      localStorage.setItem('Lang', 'en');
      this.translationService.setLanguage('en');
      localStorage.setItem('textDir', 'ltr');

      const htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
      htmlTag.dir = this.selectedLang === 'ar' ? 'rtl' : 'ltr';
      htmlTag.lang = this.selectedLang;
      this.document.body.className = this.selectedLang === 'en' ? 'body_En' : 'body_Ar';
      try {
        this.translationService.use(this.selectedLang);
      } catch { }
    }

    document.location.reload();
  }
  islogout() {
    this._UserService.logOut()
    document.location.reload();
  }

}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};

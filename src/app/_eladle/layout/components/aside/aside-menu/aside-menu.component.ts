import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/modules/i18n';
import { IgroupPermission } from 'src/app/_interface/security/igroup-permission';
import { IProgram } from 'src/app/_interface/security/iprogram';
import { UserService } from 'src/app/_service/master/user.service';
import { GroupPermissionService } from 'src/app/_service/security/group-permission.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;
  IProgram: IProgram[] = [];
  selectedLang!: string;

  constructor(
    public _UserService: UserService,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService,
    @Inject(DOCUMENT) private document: Document,
  ) {

    this._UserService.GetPrograms(localStorage.getItem('id'),
      localStorage.getItem('Lang')).subscribe(data => {
        this.IProgram = data;
        this.cd.detectChanges();

      });
    const htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    htmlTag.dir = localStorage.getItem('textDir');
    this.document.body.className = localStorage.getItem("Lang") === 'en' ? 'body_En' : 'body_Ar';
  }
  getallmenudata() {

  }
  ngOnInit(): void {

    this.cd.detectChanges();
  }

  getchidList(progid: any) {
    return this.IProgram.filter(x => x.parentId == progid);
  }
  getParentList() {
    return this.IProgram.filter(x => x.parentId == 0);
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

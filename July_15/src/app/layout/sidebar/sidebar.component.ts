import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { APICallService, AuthService } from '@core';
import { RouteInfo } from './sidebar.metadata';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy {
  public sidebarItems!: RouteInfo[];
  public innerHeight?: number;
  public bodyTag!: HTMLElement;
  listMaxHeight?: string;
  listMaxWidth?: string;
  userFullName?: string;
  userImg?: string;
  userType?: string;
  headerHeight = 60;
  currentRoute?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private apicallService: APICallService,
    private router: Router
  ) {
    super();
    this.elementRef.nativeElement.closest('body');
  }

  @HostListener('window:resize', ['$event'])
  windowResizecall() {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }
  callToggleMenu(event: Event, length: number) {
    if (length > 0) {
      const parentElement = (event.target as HTMLInputElement).closest('li');
      const activeClass = parentElement?.classList.contains('active');

      if (activeClass) {
        this.renderer.removeClass(parentElement, 'active');
      } else {
        this.renderer.addClass(parentElement, 'active');
      }
    }
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.userFullName = this.authService.currentUserValue.userName;
      this.userType = this.authService.currentUserValue.roleName;
      const userRole = this.authService.currentUserValue.roleId;

      // this.userImg = this.authService.currentUserValue.img;

      // Load Sidebar menu items 
      this.subs.sink = this.apicallService.post('/appapi/masters/GetMenus', {}).subscribe({
        next: (res: any) => {
          if (res?.code == '0') {
            this.sidebarItems = this.getMenuItem(res?.data?.list, userRole, '0', 0);
         
          }
        }
      });
    }

    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  getMenuItem(menuList: any, roleId: any, parentId: any, level: number = 0) {
    let menuRoutes: any = [];
    const parents = menuList?.filter((x: any) => x.pcode == parentId && x?.roles?.indexOf(roleId) !== -1 && x?.display == '1');
    // const parents = menuList?.filter((x: any) => x.pcode == parentId);
    parents?.forEach((parent: any) => {
      let menuItem: RouteInfo =
      {
        path: parent?.path || '',
        title: parent?.title || '',
        iconType: level > 0 ? '' : (parent?.iconType || 'material-icons-two-tone'),
        icon: level > 0 ? '' : (parent?.icon || ''),
        class: level == 0 ? '' : (level > 1 ? `ml-menu${level}` : 'ml-menu'),
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      };
      const childs = menuList?.filter((x: any) => x.pcode == parent.mcode);
      if (childs?.length > 0) {
        menuItem.class = level == 0 ? 'menu-toggle' : (level > 1 ? `ml-sub-menu${level}` : 'ml-sub-menu');
        menuItem.submenu = this.getMenuItem(menuList, roleId, parent.mcode, (level + 1));
      }
      menuRoutes.push(menuItem);
    
    });
    return menuRoutes;
  }

  initLeftSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }
  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }
  checkStatuForResize(firstTime: boolean) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }
  mouseHover() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }
  mouseOut() {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}

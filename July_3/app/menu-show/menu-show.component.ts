import { Component } from '@angular/core';
import { Menu } from '../menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-show',
  templateUrl: './menu-show.component.html',
  styleUrl: './menu-show.component.css'
})
export class MenuShowComponent {
  menus : Menu[];
  constructor(private _menuSerivce : MenuService) {
      this._menuSerivce.showMenu().subscribe(x => {
        this.menus = x;
      })      
  }
}

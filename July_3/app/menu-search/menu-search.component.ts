import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { Observable } from 'rxjs';
import { Menu } from '../menu';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrl: './menu-search.component.css'
})
export class MenuSearchComponent {
  id : number;
  menu : Menu;
  constructor(private _menuService : MenuService) {  
  }
  
  searchMenu() {
    return this._menuService.searchMenu(this.id).subscribe(x => {
      this.menu = x;
    })
    
  }
}

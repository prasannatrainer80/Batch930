import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {

    id : number;

    user : User;

    constructor(private _userService : UserService) {

    }

    show() {
      this._userService.searchUser(this.id).subscribe(x => {
        this.user = x;
      })
    }

}

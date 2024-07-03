import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrl: './user-show.component.css'
})
export class UserShowComponent {

  users : User[];

  constructor(private _userService : UserService) {
    this._userService.showUsers().subscribe(x => {
      this.users = x;
    })
  }
}

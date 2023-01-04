import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {KanbanizeService} from "./service/kanbanize.service";
import {toast} from "bulma-toast";
import {UserDataModel} from "./model/userData.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogged = this.authService.getUserData() != undefined;
  userData: UserDataModel | undefined;

  constructor(private authService: AuthService, private kanbanizeService: KanbanizeService) {
  }

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (!userData) {
      this.isLogged = false;
    } else {
      this.kanbanizeService.getUser(userData.board, userData.key).subscribe(
        (response) => {
          this.authService.saveUserData(userData.key, userData.board, response.data);
          this.userData = this.authService.getUserData();
        },
        () => {
          toast(
            {
              message: 'An error occurred.',
              type: 'is-danger'
            }
          );
          this.authService.deleteUserData();
          this.isLogged = false;
        }
      )
    }
  }
}

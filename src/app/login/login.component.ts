import { Component } from '@angular/core';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {toast} from "bulma-toast";
import {AuthService} from "../service/auth.service";
import {KanbanizeService} from "../service/kanbanize.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  faInfoCircle = faInfoCircle;

  formData = {
    key: '',
    board: ''
  };
  loading = false;

  constructor(private authService: AuthService, private kanbanizeService: KanbanizeService) {}

  login() {
    this.loading = this.validate();

    this.authService.saveUserData(this.formData.key, this.formData.board, undefined);
    this.kanbanizeService.getUser().subscribe(
      (response) => {
        toast(
          {
            message: 'Welcome, ' + response.data.realname + '!',
            type: 'is-success'
          }
        );
        this.authService.saveUserData(this.formData.key, this.formData.board, response.data);
        window.location.reload();
      },
      () => {
        this.authService.deleteUserData();
        toast(
          {
            message: 'Your key or board is invalid to Kanbanize.',
            type: 'is-danger'
          }
        );
        this.loading = false;
      }
    );
  }

  validate(): boolean {
    if (this.formData.key.length <= 4) {
      toast(
        {
          message: 'Your api key ins\'t valid.',
          type: 'is-danger'
        }
      );

      return false;
    }

    if (this.formData.board.length <= 4 || !this.formData.board.includes('kanbanize.com')) {
      toast(
        {
          message: 'Your board url is invalid.',
          type: 'is-danger'
        }
      );

      return false;
    }

    return true;
  }

}

import { Component, OnInit } from '@angular/core';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import * as bulmaToast from 'bulma-toast'
import {toast} from "bulma-toast";
import {AuthService} from "../service/auth.service";
import {KanbanizeService} from "../service/kanbanize.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  formData = {
    key: '',
    board: ''
  };
  loading = false;

  constructor(private authService: AuthService, private kanbanizeService: KanbanizeService) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = this.validate();

    this.kanbanizeService.
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

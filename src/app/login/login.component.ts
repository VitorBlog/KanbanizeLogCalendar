import { Component, OnInit } from '@angular/core';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

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

  constructor() { }

  ngOnInit(): void {
  }

}

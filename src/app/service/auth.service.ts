import {Injectable} from "@angular/core";
import {UserAuthResponse} from "./kanbanize.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getUserData(): UserAuthResponse | undefined {
    const data = localStorage.getItem("userData");
    if (!data) {
      return;
    }

    const userData = JSON.parse(data);
    if (!userData || !userData.key) {
      return;
    }

    return userData;
  }

  saveUserData(response: UserAuthResponse) {
    localStorage.setItem("userData", JSON.stringify(response));
  }

  deleteUserData() {
    localStorage.removeItem('userData');
  }
}

import {Injectable} from "@angular/core";
import {UserModel} from "../model/user.model";
import {UserDataModel} from "../model/userData.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  getUserData(): UserDataModel | undefined {
    const data = localStorage.getItem("userData");
    if (!data) {
      return;
    }

    const userData = JSON.parse(data);
    if (!userData || !userData.key) {
      return;
    }

    userData.board = userData.board.replace('.kanbanize.com', '');
    return userData;
  }

  saveUserData(key: string, board: string, response: UserModel) {
    localStorage.setItem("userData", JSON.stringify(new UserDataModel(key, board, response)));
  }

  deleteUserData() {
    localStorage.removeItem('userData');
  }
}

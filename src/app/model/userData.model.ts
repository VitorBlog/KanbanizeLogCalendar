import {UserModel} from "./user.model";

export class UserDataModel {
  key: string;
  board: string;
  user: UserModel;

  constructor(key: string, board: string, user: UserModel) {
    this.key = key;
    this.board = board;
    this.user = user;
  }
}

import {UserModel} from "./user.model";

export class UserDataModel {
  key: string;
  board: string;
  user: UserModel | undefined;

  constructor(key: string, board: string, user: UserModel | undefined) {
    this.key = key;
    this.board = board;
    this.user = user;
  }
}

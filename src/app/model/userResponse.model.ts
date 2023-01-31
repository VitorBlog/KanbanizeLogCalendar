import {UserModel} from "./user.model";

export class UserResponse {
  data: UserModel;

  constructor(data: UserModel) {
    this.data = data;
  }
}

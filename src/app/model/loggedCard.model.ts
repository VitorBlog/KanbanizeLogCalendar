import {LoggedTimeResponse} from "./loggedTimeResponse.model";

export class LoggedCardModel {
  id: string;
  title: string;
  log: LoggedTimeResponse[];

  constructor(id: string, title: string, log: LoggedTimeResponse[]) {
    this.id = id;
    this.title = title;
    this.log = log;
  }
}

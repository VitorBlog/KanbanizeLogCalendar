import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {UserDataModel} from "../model/userData.model";

@Injectable({
  providedIn: 'root',
})
export class KanbanizeService {

  private BASE_PATH = '/api/v2/';
  private DEPRECATED_BASE_PATH = '/index.php/api/kanbanize/';

  constructor(private http: HttpClient) {
  }

  getUser(url: string, key: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      this.mountUrl(url, this.BASE_PATH + 'me'), this.generateOptions(key));
  }

  getLoggedTime(userData: UserDataModel, request: GetLoggedTimeRequest): Observable<LoggedTimeResponse[]> {
    return this.http.post<LoggedTimeResponse[]>(
      this.mountUrl(userData.board, this.DEPRECATED_BASE_PATH + 'get_log_time_activities'), request, this.generateOptions(userData.key));
  }

  mountUrl(url: string, path: string): string {
    return 'https://host.vitorpaulo.dev/cors/https://' + url + path;
  }

  generateOptions(key: string) {
    return {
      headers: {
        'apikey': key,
        'accept': 'application/json'
      }
    };
  }
}
export class UserResponse {
  data: UserModel;

  constructor(data: UserModel) {
    this.data = data;
  }
}

export class LoggedTimeResponse {
  id: string;
  date: string;
  author: string;
  cardid: string;
  boardid: string;
  cardtype: string;
  cardtitle: string;
  columnname: string;
  loggedtime: number;
  description: string;
  loggedtimeid: number;
  loggedinsubtaskid: any;
  loggedinsubtask: boolean;

  constructor(id: string, date: string, author: string, cardid: string, boardid: string, cardtype: string, cardtitle: string, columnname: string, loggedtime: number, description: string, loggedtimeid: number, loggedinsubtaskid: any, loggedinsubtask: boolean) {
    this.id = id;
    this.date = date;
    this.author = author;
    this.cardid = cardid;
    this.boardid = boardid;
    this.cardtype = cardtype;
    this.cardtitle = cardtitle;
    this.columnname = columnname;
    this.loggedtime = loggedtime;
    this.description = description;
    this.loggedtimeid = loggedtimeid;
    this.loggedinsubtaskid = loggedinsubtaskid;
    this.loggedinsubtask = loggedinsubtask;
  }
}

export class GetLoggedTimeRequest {
  fromdate: string;
  todate: string;
  author: string;

  constructor(fromdate: Date, todate: Date, author: string) {
    this.fromdate = fromdate.toISOString().split('T')[0];
    this.todate = todate.toISOString().split('T')[0];
    this.author = author;
  }
}

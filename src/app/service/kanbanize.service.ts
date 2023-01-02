import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class KanbanizeService {

  private basePath = '/index.php/api/kanbanize';

  constructor(private http: HttpClient) {
  }

  verifyBoard(url: string): Observable<Object> {
    return this.http.post(this.mountUrl(url, 'login'), {}, this.generateOptions(''));
  }

  getLogTime(request: GetLogTimeRequest): Observable<GetLogTimeResponse[]> {
    return this.http.post<GetLogTimeResponse[]>(
      this.mountUrl('', 'get_log_time_activities'), request, this.generateOptions(''));
  }

  mountUrl(url: string, functionName: string): string {
    return 'https://' + url + this.basePath + functionName;
  }

  generateOptions(key: string) {
    return {
      headers: {
        'accept': 'application/json',
        'apikey': key
      }
    };
  }
}

export class GetLogTimeRequest {
  fromdate: Date;
  todate: Date;
  author: string;

  constructor(fromdate: Date, todate: Date, author: string) {
    this.fromdate = fromdate;
    this.todate = todate;
    this.author = author;
  }
}
export class GetLogTimeResponse {
  id: string;
  date: Date;
  author: string;
  cardid: string;
  boardid: string;
  cardtype: string;
  cardtitle: string;
  loggedtime: number;
  columnname: string;
  description: string;
  loggedtimeid: number;
  loggedinsubtask: boolean;
  loggedinsubtaskid: string | null;

  constructor(id: string, date: Date, author: string, cardid: string, boardid: string, cardtype: string, cardtitle: string, loggedtime: number, columnname: string, description: string, loggedtimeid: number, loggedinsubtask: boolean, loggedinsubtaskid: string | null) {
    this.id = id;
    this.date = date;
    this.author = author;
    this.cardid = cardid;
    this.boardid = boardid;
    this.cardtype = cardtype;
    this.cardtitle = cardtitle;
    this.loggedtime = loggedtime;
    this.columnname = columnname;
    this.description = description;
    this.loggedtimeid = loggedtimeid;
    this.loggedinsubtask = loggedinsubtask;
    this.loggedinsubtaskid = loggedinsubtaskid;
  }
}

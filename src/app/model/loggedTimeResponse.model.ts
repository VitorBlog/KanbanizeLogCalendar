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

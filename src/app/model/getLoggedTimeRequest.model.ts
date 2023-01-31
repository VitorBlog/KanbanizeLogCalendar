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

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

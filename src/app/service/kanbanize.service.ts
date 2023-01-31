import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {UserDataModel} from "../model/userData.model";
import {UserResponse} from "../model/userResponse.model";
import {LoggedTimeResponse} from "../model/loggedTimeResponse.model";
import {GetLoggedTimeRequest} from "../model/getLoggedTimeRequest.model";

@Injectable({
  providedIn: 'root',
})
export class KanbanizeService {

  private BASE_PATH = '/api/v2/';
  private DEPRECATED_BASE_PATH = '/index.php/api/kanbanize/';

  constructor(private http: HttpClient) {}

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

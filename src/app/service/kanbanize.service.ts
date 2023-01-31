import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserResponse} from "../model/userResponse.model";
import {LoggedTimeResponse} from "../model/loggedTimeResponse.model";
import {GetLoggedTimeRequest} from "../model/getLoggedTimeRequest.model";

@Injectable({
  providedIn: 'root',
})
export class KanbanizeService {

  private prefix = 'https://@';

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.prefix}/api/v2/me`);
  }

  getLoggedTime(request: GetLoggedTimeRequest): Observable<LoggedTimeResponse[]> {
    return this.http.post<LoggedTimeResponse[]>(`${this.prefix}/index.php/api/kanbanize/get_log_time_activities`, request);
  }
}

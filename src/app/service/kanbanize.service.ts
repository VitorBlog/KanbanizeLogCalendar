import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";

@Injectable({
  providedIn: 'root',
})
export class KanbanizeService {

  private basePath = '/api/v2/';

  constructor(private http: HttpClient) {
  }

  getUser(url: string, key: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      this.mountUrl(url, 'me'), this.generateOptions(key));
  }

  mountUrl(url: string, functionName: string): string {
    return 'https://' + url + this.basePath + functionName;
  }

  generateOptions(key: string) {
    return {
      headers: {
        'apikey': key
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

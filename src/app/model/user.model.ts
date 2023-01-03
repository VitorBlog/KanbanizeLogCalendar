export class UserModel {
  user_id: number
  email: string
  username: string
  realname: string
  avatar: any
  is_tfa_enabled: number
  is_enabled: number
  is_confirmed: number
  registration_date: string
  timezone: string
  language: string

  constructor(user_id: number, email: string, username: string, realname: string, avatar: any, is_tfa_enabled: number, is_enabled: number, is_confirmed: number, registration_date: string, timezone: string, language: string) {
    this.user_id = user_id;
    this.email = email;
    this.username = username;
    this.realname = realname;
    this.avatar = avatar;
    this.is_tfa_enabled = is_tfa_enabled;
    this.is_enabled = is_enabled;
    this.is_confirmed = is_confirmed;
    this.registration_date = registration_date;
    this.timezone = timezone;
    this.language = language;
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {GetLoggedTimeRequest, KanbanizeService} from "../service/kanbanize.service";
import {toast} from "bulma-toast";
import {LoggedCardModel} from "../model/loggedCard.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

  showDate = new Date();
  dates: Date[] = [];
  loading = true;
  totalHours = 0;

  loggedCards = new Map<string, LoggedCardModel>();
  hours = new Map<number, number>();

  constructor(private authService: AuthService, private kanbanizeService: KanbanizeService) { }

  ngOnInit(): void {
    this.dates = this.getAllDaysInMonth();

    const userData = this.authService.getUserData();
    if (!userData) {
      return;
    }

    this.kanbanizeService.getLoggedTime(
      userData,
      new GetLoggedTimeRequest(
        this.dates[0],
        this.dates[this.dates.length - 1],
        userData.user.username
      )
    ).subscribe(
      (response) => {
        response.forEach(
          (log) => {
            this.totalHours += log.loggedtime;

            const date = new Date(log.date).getDate();
            const hours = this.hours.has(date)? this.hours.get(date)!! : 0;
            if (this.loggedCards.has(log.cardid)) {
              this.loggedCards.get(log.cardid)?.log.push(log);
            } else {
              this.loggedCards.set(log.cardid, new LoggedCardModel(log.cardid, log.cardtitle, [log]));
            }

            this.hours.set(date, hours + log.loggedtime);
            console.log(date, log.loggedtime + ' + ' + hours)
          }
        );

        this.loading = false;
      },
      (error) => {
        console.log(error);
        toast(
          {
            message: 'An error occurred.',
            type: 'is-danger'
          }
        );
        this.authService.deleteUserData()
      }
    )
  }

  getAllDaysInMonth() {
    const date = new Date(this.showDate.getFullYear(), this.showDate.getMonth(), 1);
    const dates = [];

    while (date.getMonth() == this.showDate.getMonth()) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  getMonth(): string {
    return this.months[this.showDate.getMonth()];
  }

  formatDate(date: number) {
    return date <= 9? '0' + date : date;
  }

  getTodayLogs(): LoggedCardModel[] {
    let hours = 0;

    const loggedCards = [];
    for (let card of this.loggedCards.values()) {
      const logs = card.log.filter((log) => new Date(log.date).getDate() == this.showDate.getDate());
      logs.forEach(
        (log) => hours += log.loggedtime
      );

      if (logs.length > 0) {
        loggedCards.push(new LoggedCardModel(card.id, card.title, logs));
      }
    }

    return loggedCards;
  }

  formatTime(hours: number): string {
    const hoursLeft = Math.floor(hours);
    const min = Math.floor((hours - hoursLeft) * 60);

    return hoursLeft + 'h ' + min + 'm'
  }

  getTodayHours(): string {
    console.log(this.hours)
    return this.formatTime(this.hours.has(this.showDate.getDate())? this.hours.get(this.showDate.getDate())!! : 0);
  }
}

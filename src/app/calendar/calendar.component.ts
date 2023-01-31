import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {KanbanizeService} from "../service/kanbanize.service";
import {toast} from "bulma-toast";
import {LoggedCardModel} from "../model/loggedCard.model";
import {GetLoggedTimeRequest} from "../model/getLoggedTimeRequest.model";

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

  constructor(private authService: AuthService, private kanbanizeService: KanbanizeService) {}

  ngOnInit(): void {
    this.getAllDaysInMonth();
    this.load();
  }

  load() {
    const userData = this.authService.getUserData();
    if (!userData || !userData.user) {
      this.authService.deleteUserData();
      return;
    }

    this.totalHours = 0;
    this.hours.clear();
    this.loggedCards.clear();

    this.kanbanizeService.getLoggedTime(
      new GetLoggedTimeRequest(
        this.dates[0],
        this.dates[this.dates.length - 1],
        userData.user.username
      )
    ).subscribe(
      (response) => {
        response.forEach(
          (log) => {
            const date = new Date(log.date);
            const day = new Date(log.date).getDate();

            this.totalHours += (date.getMonth() == this.showDate.getMonth()? log.loggedtime : 0);

            const hours = this.hours.has(day)? this.hours.get(day)!! : 0;
            if (this.loggedCards.has(log.cardid)) {
              this.loggedCards.get(log.cardid)?.log.push(log);
            } else {
              this.loggedCards.set(log.cardid, new LoggedCardModel(log.cardid, log.cardtitle, [log]));
            }

            this.hours.set(day, hours + log.loggedtime);
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
    );
  }

  getAllDaysInMonth() {
    const dates: Date[] = [];
    const date = new Date(this.showDate.getFullYear(), this.showDate.getMonth(), 1);

    const previousDate = new Date(this.showDate.getFullYear(), this.showDate.getMonth(), 1);
    for (let day = date.getDay(); day > 0; day--) {
      previousDate.setDate(previousDate.getDate() - 1);
      dates.push(new Date(previousDate));
    }
    dates.reverse();

    while (date.getMonth() == this.showDate.getMonth()) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    date.setDate(date.getDate() - 1);
    for (let day = date.getDay(); day < 6; day++) {
      date.setDate(date.getDate() + 1);
      dates.push(new Date(date));
    }

    this.dates = dates;
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

  formatTime(hours: number, showMinutes: boolean = true): string {
    const hoursLeft = Math.floor(hours);
    const min = Math.floor((hours - hoursLeft) * 60);

    return hoursLeft + 'h' + (showMinutes? ' ' + min + 'm': '');
  }

  getHours(date: number = this.showDate.getDate(), showMinutes: boolean = true): string {
    return this.formatTime(this.hours.has(date)? this.hours.get(date)!! : 0, showMinutes);
  }

  changeDate(date: Date) {
    if (date.getMonth() == this.showDate.getMonth()) {
      this.showDate = date;
    } else {
      this.changeMonth(this.showDate.getMonth() > date.getMonth()? -1 : 1);
    }
  }

  changeMonth(total: number) {
    this.loading = true;
    this.showDate = new Date(this.showDate.getFullYear(), this.showDate.getMonth() + total, 1);
    this.getAllDaysInMonth();
    this.load();
  }
}

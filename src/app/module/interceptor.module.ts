import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {KanbanizeInterceptor} from "../interceptor/kanbanize.interceptor";

@NgModule({
  providers: [
    KanbanizeInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KanbanizeInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorModule {}

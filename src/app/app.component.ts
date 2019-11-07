import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

import Tooltip from 'tooltip.js'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  color:string="#579634";
  events:string="New Appointment"
  colors(col){
    debugger
    if (col==1) {
      this.color="#97bee4"
      this.events="Doctor1 Appointment"
    } else if (col==2) {
      this.color="#946cce"
      this.events="Doctor2 Appointment"
    }
    else{
      this.color="#579634"
      this.events="New Appointment"
    }
  }


  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date(), classNames:'fc-draggable fc-start-resizer', backgroundColor:this.color, textColor:'#0014ff' }
  ];

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('1997-05-14'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    debugger
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      debugger
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: this.events,
        start: arg.date,
        allDay: arg.allDay,
          backgroundColor:this.color,
          textColor:'#0014ff',
        className: 'fc-draggable fc-start-resizer'
      })
    }
  }

  //Add tooltip to events  
  eventrender(event)
  {
    debugger

     event.element[0].querySelectorAll(".fc-content")[0].setAttribute("data-tooltip", event.event.title);
  }
  
  onEventRender(info: any) { 
    console.log('onEventRender', info.el); 
    const tooltip = new Tooltip(info.el, { 
      title: info.event.title,  
      trigger: 'hover', 
      container: 'body',
      
      template:'<div class="tooltip" style="color: black; display: block; padding: 5px;background: #6aa7d4;  z-index: 10; " role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      delay: {show: 100, hide: 200}     
    }); 
  } 



}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'dateCount'}) 
export class DateCountPipe implements PipeTransform {  
  transform(value: any): number {    
    let today:Date = new Date(); 
    //get current date and time    
    let todayWithNoTime:any = new Date(today.getFullYear(), today.getMonth(), today.getDate())    
    var dateDifference = Math.abs(value - todayWithNoTime);
    //returns value in miliseconds    
    const secondsInDay = 86400; //60 seconds * 60 minutes in an hour * 24 hours in a day    
    var dateDifferenceSeconds = dateDifference*0.001; 
    //converts miliseconds to seconds    
    var dateCounter = dateDifferenceSeconds/secondsInDay;    
    if (dateCounter >= 1 && value > todayWithNoTime){      
      return dateCounter;    
    }else{ 
      return 0;    
    }  
  }
}

@Component({
  selector: 'app-pig-info',
  templateUrl: './pig-info.component.html',
  styleUrls: ['./pig-info.component.css']
})

export class PigInfoComponent implements OnInit {
  displayStyle = "none";

  @Input() pig:any;
  @Output() open = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  openPopup(evt:any, pigName:string, pigPhone:number, pigBreed:string, pigID:number, pigLocation:string, pigLongitude:number, pigLatitude:number, pigExtra:string, pigReportID:number) {
    this.displayStyle = "block";
    evt["pigName"] = pigName
    evt["pigPhone"] = pigPhone
    evt["pigBreed"] = pigBreed
    evt["pigID"] = pigID
    evt["pigLocation"] = pigLocation
    evt["pigLongitude"] = pigLongitude
    evt["pigLatitude"] = pigLatitude
    evt["pigExtra"] = pigExtra;
    evt["pigReportID"] = pigReportID;

    this.open.emit(evt)
  }

  closePopup() {
    this.displayStyle = "none";
  }

}

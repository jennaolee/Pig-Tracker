import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { PigsService } from '../pigs.service';
import { Router } from '@angular/router'
import { Piggy } from '../piggy.Piggy';

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
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {
  displayStyle = "none";

  pigs:Piggy[];
  query: string = "";

  constructor(private ps: PigsService, private router:Router) {
    this.pigs = [];   
  }

  onPersonDelete(evt:any){
    const del_pig_report_id = evt["ind"]
    this.pigs = this.ps.delete(del_pig_report_id)
  
  }

  onPigEdit(ind: string) {
    // console.log(`pig ${evt["pigName"]} has been opened`)
    this.router.navigate(["/edit", ind])

  }

  onCreatePigOpen() {
    this.router.navigate(["/add"])
  }

  get() {
    return this.pigs
  }
   
  ngOnInit(): void {
    this.pigs = this.ps.get() 

  }

  sortByName() {
    this.pigs.sort(function(a,b) {
      return a.name.localeCompare(b.name)
    })
  }

  sortByLocation() {
    this.pigs.sort(function(a,b) {
      return a.location.localeCompare(b.location)
    })
  }

  sortByTime() {
    this.pigs.sort(function(a,b) {
      return String(a.date_time).localeCompare(String(b.date_time))
    })
  }

  sortByStatus() {
    this.pigs.sort(function(a,b) {
      return a.status.localeCompare(b.status)
    })
  }


}
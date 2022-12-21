
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})

export class PigComponent implements OnInit {

  @Input() pig:any;
  @Output() delete = new EventEmitter()
  displayStyle = "none";

  constructor(private router: Router, private http: HttpClient) { }

  onDelete(evt:any,ind:string){
    let password = window.prompt("Enter the password to delete the pig report")

    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value=' + password)
    .subscribe((data:any)=>{

      let correctHash = "84892b91ef3bf9d216bbc6e88d74a77c"

      if (String(data.Digest) == correctHash) {
        evt["ind"] = ind
        this.delete.emit(evt)

      } else {
        window.alert("Incorrect password. Cannot delete pig")
      }

    })

    
  }

  onEdit(name:string, phone:number, breed:string, pID:number, location:string, longitude:number, latitude:number, extra:string, date_time:number, status:string, report_id:number){
    
    let navigationExtras: NavigationExtras = {
      state: {
        Name: name,
        Phone: phone,
        Breed: breed,
        PID: pID,
        Location: location,
        Longitude: longitude,
        Latitude:latitude,
        Extra: extra,
        Date_Time: date_time,
        Status: status,
        Report_ID: report_id

      }
    }
    this.router.navigate(["/edit", report_id], navigationExtras)
  }

  ngOnInit(): void {
  }
}

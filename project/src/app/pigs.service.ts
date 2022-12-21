import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PigsService implements OnInit {

  pigs:any = [];
  pig:any;

  constructor(private http: HttpClient) {

    this.pigs = [];
    this.http.get<Object>('https://272.selfip.net/apps/cglX0SU8fS/collections/pig/documents/')
    .subscribe((data:any)=>{
      this.pig = data
     
      for(let i = 0; i < this.pig.length; i++) {
        this.pigs.push(data[i]["data"])
      }
    })
    
    
  }

  get(){
    return this.pigs
  }

  ngOnInit(): void {
    this.pigs = [];
  }

  add(pig:any, status:string, report_id:number){
    pig.date_time = (new Date()).getTime();
    pig.status = status;
    pig.report_id = report_id
    
    this.http.post('https://272.selfip.net/apps/cglX0SU8fS/collections/pig/documents/',
    {"key":String(pig.report_id), "data":pig}
    ).subscribe((data:any)=>{
      this.pigs.push(pig)
    })
  }

  delete(del_pig_report_id:string){
    this.pigs = this.pigs.filter((p: { report_id: string; })=>p.report_id!==del_pig_report_id)
    this.http.delete('https://272.selfip.net/apps/cglX0SU8fS/collections/pig/documents/' + del_pig_report_id + '/').subscribe((data:any)=> {
    })

    return this.pigs
  }

  edit(pig:any, old_report_id:string) {
    this.http.put('https://272.selfip.net/apps/cglX0SU8fS/collections/pig/documents/' + old_report_id + '/',
    {"key":pig.report_id, "data":pig}
    ).subscribe((data:any)=>{
      this.pigs.push(pig)
    })
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { PigsService } from '../pigs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Piggy } from '../piggy.Piggy';

@Component({
  selector: 'app-edit-pig',
  templateUrl: './edit-pig.component.html',
  styleUrls: ['./edit-pig.component.css']
})

export class EditPigComponent implements OnInit {
  @Input() pig:Piggy;
  @Output() edit = new EventEmitter()
  form: FormGroup

  constructor(private ps: PigsService, private router: Router) {
    let navigation = this.router.getCurrentNavigation();
    let state = navigation?.extras.state as {
      Name: string,
      Phone:number,
      Breed: string,
      PID: number,
      Location: string,
      Longitude:number,
      Latitude:number,
      Extra: string,
      Date_Time: number,
      Status: string
      Report_ID:number;
    }

    this.pig = {
      "name": state.Name,
      "phone": state.Phone,
      "breed": state.Breed,
      "pID": state.PID,
      "location": state.Location,
      "longitude": state.Longitude,
      "latitude": state.Latitude,
      "extra": state.Extra,
      "date_time": state.Date_Time,
      "status": state.Status,
      "report_id": state.Report_ID
    }

    let formControls = {
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
    
      ]),
      phone: new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), 
        Validators.maxLength(10)
    
      ]),
      breed: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
    
      ]),
      pID: new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
    
      ]),
      location: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
    
      ]),
      longitude: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
    
      ]),
      latitude: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
    
      ]),
      extra: new FormControl('',[

      ]),

      status: new FormControl('',[
        Validators.required,    
      ]), 
    }

    this.form = new FormGroup(formControls)
  }

  ngOnInit(): void {
    this.form.get('name')!.setValue(this.pig.name);
    this.form.get('phone')!.setValue(this.pig.phone);
    this.form.get('breed')!.setValue(this.pig.breed);
    this.form.get('pID')!.setValue(this.pig.pID);
    this.form.get('location')!.setValue(this.pig.location);
    this.form.get('longitude')!.setValue(this.pig.longitude);
    this.form.get('latitude')!.setValue(this.pig.latitude);
    this.form.get('extra')!.setValue(this.pig.extra);
    this.form.get('status')!.setValue(this.pig.status);
  }

  onSubmit(values:any){
    values.date_time = this.pig.date_time
    values.report_id = this.pig.report_id
    this.ps.edit(values, String(this.pig.report_id))
    this.router.navigate(["/"]).then(() => {
      window.location.reload()
    })
  }

  returnToMain() {
    this.router.navigate(["/"])
  }

  

}

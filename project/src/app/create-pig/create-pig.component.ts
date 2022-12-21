import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { PigsService } from '../pigs.service';
import { Router } from '@angular/router'

type ExistingLocation = {
  loc:string;
  long:number;
  lat:number;
}

@Component({
  selector: 'app-create-pig',
  templateUrl: './create-pig.component.html',
  styleUrls: ['./create-pig.component.css']
})

export class CreatePigComponent implements OnInit {
  displayStyle = "none";
  form: FormGroup
  report_id:number = 0;
  existingLocations:ExistingLocation[];

  @Output() add = new EventEmitter()

  constructor(private ps: PigsService, private router: Router) { 

    let formControls = {
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
    
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

    this.existingLocations = [
      {
        loc: "SFU Burnaby",
        long: 49.276765,
        lat: -122.917957
      },

      {
        loc: "SFU Surrey",
        long: 49.1870,
        lat: -122.8495
      },

      {
        loc: "SFU Vancouver",
        long: 49.2846,
        lat: -123.1115
      },

      {
        loc: "Metrotown",
        long: 49.226150,
        lat: -122.999113
      },

      {
        loc: "UBC Vancouver",
        long: 49.2606,
        lat: -123.2460
      }
    ]
  }

  ngOnInit(): void {

    let tempArr = this.ps.get()
    let tempLocArr = this.existingLocations
    
    for(let i = 0; i < tempArr.length; i++) {
     
      for(let j = this.existingLocations.length -1; j < this.existingLocations.length; j++) {
        if(tempArr[i].location == this.existingLocations[j].loc) {

        } else if((tempArr[i].location != tempLocArr[j].loc) 
        && (tempArr[i].location != "SFU Burnaby")
        && (tempArr[i].location != "SFU Surrey")
        && (tempArr[i].location != "SFU Vancouver")
        && (tempArr[i].location != "Metrotown")
        && (tempArr[i].location != "UBC Vancouver")
        ) {

          let newOption = {
            loc: tempArr[i].location,
            long: tempArr[i].longitude,
            lat: tempArr[i].latitude
          }

          tempLocArr.push(newOption)
          j = this.existingLocations.length;
        }
      }
    }
    this.existingLocations = []
    this.existingLocations = tempLocArr;

  }

  getReportID() {
    this.report_id = Math.floor(Math.random() * 1000000);
    return this.report_id;

  }

  onSubmit(values:any){
    values.report_id = this.getReportID();
    let k = 0;

    while(k < this.existingLocations.length && values.location != this.existingLocations[k].loc) {
      k++;
    }

    if(k == this.existingLocations.length) {
      let newOption:ExistingLocation = {
        loc: values.location,
        long: values.longitude,
        lat: values.latitude
      }

      this.existingLocations.push(newOption)    
    } 
    
    this.ps.add(values, values.status, values.report_id)
    this.router.navigate(["/"])
  }

  returnToMain() {
    this.router.navigate(["/"])

  }

  inputLL(values:any) {
    this.displayStyle = "none";

    if(values.location == "SFU Burnaby") {
      values.longitude = 49.276765 
      values.latitude = -122.917957
      this.form.get('longitude')!.setValue(values.longitude);
      this.form.get('latitude')!.setValue(values.latitude);

    } else if (values.location == "SFU Surrey") {
      values.longitude = 49.1870
      values.latitude = -122.8495
      this.form.get('longitude')!.setValue(values.longitude);
      this.form.get('latitude')!.setValue(values.latitude);
      
    } else if (values.location == "SFU Vancouver") {
      values.longitude = 49.2846
      values.latitude = -123.1115
      this.form.get('longitude')!.setValue(values.longitude);
      this.form.get('latitude')!.setValue(values.latitude);

    } else if (values.location == "Metrotown") {
      values.longitude = 49.226150
      values.latitude = -122.999113
      this.form.get('longitude')!.setValue(values.longitude);
      this.form.get('latitude')!.setValue(values.latitude);

    } else if (values.location == "UBC Vancouver") {
      values.longitude = 49.2606
      values.latitude = -123.2460
      this.form.get('longitude')!.setValue(values.longitude);
      this.form.get('latitude')!.setValue(values.latitude);
      
    } else {

      for(let i = 0; i < this.existingLocations.length; i++) {
        this.displayStyle = "none";

        if(values.location == this.existingLocations[i].loc) {
          values.longitude = this.existingLocations[i].long;
          values.latitude = this.existingLocations[i].lat;

          this.form.get('longitude')!.setValue(values.longitude);
          this.form.get('latitude')!.setValue(values.latitude);
        } else {
          this.form.get('longitude')!.setValue("");
          this.form.get('latitude')!.setValue("");
          this.displayStyle = "block"
        }

      }
      
    }
  
  }
}

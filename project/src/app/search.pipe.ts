import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pigs: any[], querystring:string): any[] {
    return pigs.filter(p=>{
      return p.name.toLowerCase().includes(querystring.toLowerCase());
    });
  }

}

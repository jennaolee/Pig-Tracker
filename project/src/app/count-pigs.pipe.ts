import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countPigs'
})
export class CountPigsPipe implements PipeTransform {

  transform(pigs:any[]): number {
    return pigs.length;
  }

}

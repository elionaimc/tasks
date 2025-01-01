import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date): string {
    value = new Date(value);
    return '☉ ' + value.toLocaleString();
  }

}

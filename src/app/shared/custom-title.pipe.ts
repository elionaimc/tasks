import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTitle'
})
export class CustomTitlePipe implements PipeTransform {

  transform(value: string): string {
    value = (value.length >= 38) ? value.substring(0, 38).toUpperCase() + '...' : value.substring(0, 38).toUpperCase();
    return value;
  }

}

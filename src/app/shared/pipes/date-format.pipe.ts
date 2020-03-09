import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const now = new Date();
    const actual = new Date(value);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const diff = Math.abs(now.getTime() - actual.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    

    return diffDays > 1 ? `${months[actual.getMonth()]} ${actual.getDate()}` : actual.toLocaleTimeString('en-US');
  }

}

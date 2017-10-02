import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToHtml'
})
export class StringToHtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == null){
      return '';
    }
    let url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
        url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g;

        var html = value.trim();
        if (html) {
            html = html
                .replace(url1, '$1<a target="_blank" style="color : #FD694D;" href="http://$2">$2</a>$3')
                .replace(url2, '$1<a target="_blank" style="color : #FD694D;" href="$2">$2</a>$5');
        }
        return html;
  }

}

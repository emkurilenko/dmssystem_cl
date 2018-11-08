import { Pipe, PipeTransform } from '@angular/core';
import { DocumentInfo } from '../model/document-info';

@Pipe({
  name: 'documentNameFilter'
})
export class DocumentNameFilterPipe implements PipeTransform {

  transform(documentInfo: DocumentInfo[], nameDoc: string): DocumentInfo[] {
    if (nameDoc == null || nameDoc === '') {
      return documentInfo;
    }
    return documentInfo.filter(v => v.fileName.includes(nameDoc.toLowerCase()) || v.fileName.includes(nameDoc.toUpperCase()));
  }

}

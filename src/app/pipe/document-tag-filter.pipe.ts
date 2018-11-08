import { Pipe, PipeTransform } from '@angular/core';
import { DocumentInfo } from '../model/document-info';
import { Tag } from '../model/tag';

@Pipe({
  name: 'documentTagFilter'
})
export class DocumentTagFilterPipe implements PipeTransform {

  transform(documentInfo: DocumentInfo[], tagSearch: string): DocumentInfo[] {
    if (tagSearch == null || tagSearch === '') {
      return documentInfo;
    }
    // return documentInfo.filter(n => n.tags.filter(t => t.name.includes(tagSearch)));
    return documentInfo.filter(n => n.tags.find(t => t.name.includes(tagSearch)));
  }

}

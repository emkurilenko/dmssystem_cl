import { Tag } from './tag';
import { ContentType } from './content-type';

export class DocumentInfo {
    id: number;
    fileName: string;
    description: string;
    publisher: string;
    contentType: ContentType;
    creationDate: Date;
    updateDate: Date;
    tags: Tag[];
}

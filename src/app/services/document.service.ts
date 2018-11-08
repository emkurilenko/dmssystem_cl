import { Injectable } from '@angular/core';
import { BackendBaseServicesService } from './backend-base-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentInfo } from '../model/document-info';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BackendBaseServicesService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private url = this.baseURL + 'api/document/';

  constructor(private _httpClient: HttpClient) {
    super();
  }

  /**
   * saveDocument
   */
  public saveDocument(formData: FormData) {
    return this._httpClient.post(this.url, formData, {
      responseType: 'text'
    });
  }

  /**
   * updateDocument
   */
  public updateDocument(document: DocumentInfo): Observable<DocumentInfo> {
    return this._httpClient.put<DocumentInfo>(this.url, document, {
      headers: this.httpHeaders
    });
  }


  /**
   * getDocumentById
   */
  public getDocumentById(id: number): Observable<DocumentInfo> {
    return this._httpClient.get<DocumentInfo>(this.url + id);
  }

  /**
   * getDocumentListByPage
   */
  public getDocumentListByPage(page: number) {
    return this._httpClient.get(this.url + 'listPage?page=' + page);
  }

  public getDocumentList(): Observable<DocumentInfo[]> {
    return this._httpClient.get<DocumentInfo[]>(this.url + 'list');
  }

  public attachTagDocument(id: number, tag: string): Observable<DocumentInfo> {
    return this._httpClient.put<DocumentInfo>(this.url + 'attach/' + id.toString(), tag, {
      headers: this.httpHeaders
    });
  }

  /**
   * deleteDocument
   */
  public deleteDocument(id: number) {
    return this._httpClient.delete(this.url + id);
  }

  /**
   * unfastenTagDocument
   */
  public unfastenTagDocument(id: number, tag: string) {
    return this._httpClient.put<DocumentInfo>(this.url + 'unfasten/' + id.toString(), tag, {
      headers: this.httpHeaders
    });
  }
}

import { Component, OnInit, Input, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentInfo } from 'src/app/model/document-info';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentService } from 'src/app/services/document.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styles: []
})
export class ViewDocumentComponent implements OnInit {

  documentInfo: DocumentInfo;

  // tslint:disable-next-line:max-line-length
  // urlOffice = 'https://view.officeapps.live.com/op/embed.aspx?src=http://dmsystemapi.herokuapp.com/api/document/download/';
  urlOffice = 'https://docs.google.com/viewer?url=http://dmsystemapi.herokuapp.com/api/document/download/';
  urlDownload = 'https://dmsystemapi.herokuapp.com/api/document/download/';
  constructor(private router: Router, private sanitizer: DomSanitizer, private service: DocumentService) { }

  ngOnInit() {
    this.documentInfo = JSON.parse(localStorage.getItem('viewDocument'));
    if (!this.documentInfo) {
      alert('Error! Local Storage empty!');
      this.router.navigate(['list-document']);
      return;
    }

    this.urlDownload = this.urlDownload + this.documentInfo.id;
  }

  getSecURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlOffice + this.documentInfo.id.toString() + '&embedded=true');
  }

  public onSelect(item) {
    console.log('tag selected: value is ' + item.name);
  }

  backToList(): void {
    this.router.navigate(['list-document']);
  }

  updateItem(): void {
    this.router.navigate(['update-document']);
  }


  onItemAdded(item) {
    this.service.attachTagDocument(this.documentInfo.id, item.name).pipe().subscribe(data => {
      swal({
        position: 'top',
        type: 'success',
        title: 'Тег успешно добавлен!',
        showConfirmButton: false,
        timer: 500
      });
    }, error => {
      console.log(error.value);
    });
  }
}

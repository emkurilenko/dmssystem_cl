import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DocumentInfo } from 'src/app/model/document-info';
import { DocumentService } from 'src/app/services/document.service';
import { Tag } from 'src/app/model/tag';


@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styles: []
})
export class ListDocumentComponent implements OnInit {
  // urlOffice = 'https://view.officeapps.live.com/op/embed.aspx?src=http://dmsystemapi.herokuapp.com/api/document/download/';
  urlOffice = 'https://docs.google.com/viewer?url=http://dmsystemapi.herokuapp.com/api/document/download/';
  documentInfo: DocumentInfo[];
  searchByNameTag: string;
  searchByNameDoc: string;
  page = 0;
  pages: Array<number>;

  constructor(private router: Router, private service: DocumentService) { }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getDocumentList();
  }

  ngOnInit() {
    this.getDocumentList();
  }

  getDocumentList() {
    this.service.getDocumentListByPage(this.page).subscribe(data => {
      this.documentInfo = data['content'];
      this.pages = new Array(data['totalPages']);
    });
  }

  deleteDocument(documentInfo: DocumentInfo): void {
    swal({
      title: 'Уверены?',
      text: 'Удалить файл ' + documentInfo.fileName + '?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Удалить!',
      cancelButtonText: 'Отмена'
    }).then(result => {
      if (result.value) {
        this.service.deleteDocument(documentInfo.id).subscribe(data => {
          this.documentInfo = this.documentInfo.filter(c => c !== documentInfo);
        }, error => {
          swal({
            position: 'top',
            type: 'error',
            title: 'Ошибка',
            showConfirmButton: false,
            timer: 1500
          });
        });

        swal('Успешно!',
          'Данные удалены',
          'success'
        );
      }
    });
  }

  viewFile(id: number): void {
    console.log(id);
    this.router.navigateByUrl(this.urlOffice + id.toString() + '&embedded=true');
  }

  viewDocument(documentInfo: DocumentInfo): void {
    localStorage.removeItem('viewDocument');
    localStorage.setItem('viewDocument', JSON.stringify(documentInfo));
    this.router.navigate(['view-document']);
  }

  createDocument(): void {
    this.router.navigate(['add-document']);
  }

  public onSelectTag(item) {
    this.searchByNameTag = item.name;
  }

  onItemRemove(tag, id: number) {
    this.service.unfastenTagDocument(id, tag.name).pipe().subscribe(data => {
      swal({
        position: 'top',
        type: 'success',
        title: 'Тег успешно откреплен!',
        showConfirmButton: false,
        timer: 500
      });
    }, error => {
      console.log(error.value);
    });
  }

  onItemAdded(tag, id: number) {
    this.service.attachTagDocument(id, tag.name).pipe().subscribe(data => {
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

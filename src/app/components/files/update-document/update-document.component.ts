import { Component, OnInit } from '@angular/core';
import { DocumentInfo } from 'src/app/model/document-info';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styles: []
})
export class UpdateDocumentComponent implements OnInit {

  documentInfo: DocumentInfo;
  updateForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: DocumentService) { }

  ngOnInit() {
    this.documentInfo = JSON.parse(localStorage.getItem('viewDocument'));
    if (!this.documentInfo) {
      alert('Error! Local Storage empty!');
      this.router.navigate(['list-document']);
      return;
    }

    this.updateForm = this.formBuilder.group({
      id: [],
      fileName: ['', Validators.required],
      description: ['', Validators.required],
      publisher: ['', Validators.required],
      tags: [],
      contentType: [],
      creationDate: [],
      updateDate: []
    });

    this.updateForm.setValue(this.documentInfo);
  }

  onTagAdded(item) {
    this.service.attachTagDocument(this.documentInfo.id, item.name).pipe().subscribe(data => {
    }, error => {
      console.log(error.value);
    });
  }

  onTagRemove(tag) {
    this.service.unfastenTagDocument(this.documentInfo.id, tag.name).pipe().subscribe(data => {
    }, error => {
      console.log(error.value);
    });
  }
  updateItem() {
    console.log(this.updateForm.value);
    this.service.updateDocument(this.updateForm.value).pipe(first()).subscribe(data => {
      this.router.navigate(['list-document']);
      swal({
        position: 'top',
        type: 'success',
        title: 'Документ обновлен',
        showConfirmButton: false,
        timer: 1500
      });
    },
      error => {
        alert(error);
      });
  }
}

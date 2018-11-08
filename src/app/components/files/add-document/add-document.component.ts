import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { DocumentService } from 'src/app/services/document.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styles: []
})
export class AddDocumentComponent implements OnInit {
  newDocumentForm: FormGroup;
  fileToUpload: File;

  tagsItems = [];
  creationDate: Date;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: DocumentService) {
    this.newDocumentForm = new FormGroup({
      tagsItems: new FormControl(),
    });
  }
  acceptedFileTypes = SUPPORTED_FILE_EXTENSIONS.concat(SUPPORTED_FILE_MIME_TYPES);

  ngOnInit() {
    this.newDocumentForm = this.formBuilder.group({
      publisher: ['', Validators.maxLength(50)],
      description: ['', Validators.maxLength(2500)]
    });
  }

  get description() {
    return this.newDocumentForm.get('description');
  }

  get publisher() {
    return this.newDocumentForm.get('publisher');
  }


  createNewDocument() {
    console.log(this.fileToUpload.name);
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('description', this.description.value);
    if (this.creationDate != null) {
      formData.append('creationDate', this.creationDate.toUTCString());
    }
    formData.append('publisher', this.publisher.value);
    this.tagsItems.forEach(tag => {
      formData.append('tags[]', tag.value);
    });
    this.service.saveDocument(formData).subscribe(data => {
      this.router.navigate(['list-document']);
      swal({
        position: 'top',
        type: 'success',
        title: 'Документ успешно добавлен!',
        showConfirmButton: false,
        timer: 1500
      });
    },
      error => {
        console.log(error);
        swal({
          position: 'top',
          type: 'error',
          title: 'Ошибка',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }
}


const SUPPORTED_FILE_EXTENSIONS: string[] = [
  '.xlsx', '.xls', '.doc', '.docx', 'pdf'
];

const SUPPORTED_FILE_MIME_TYPES: string[] = [
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf'
];

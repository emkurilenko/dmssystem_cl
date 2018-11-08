import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { TagInputModule } from 'ngx-chips';

// Material angular

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';


import { ViewDocumentComponent } from './components/files/view-document/view-document.component';
import { ListDocumentComponent } from './components/files/list-document/list-document.component';
import { AddDocumentComponent } from './components/files/add-document/add-document.component';
import { DocumentTagFilterPipe } from './pipe/document-tag-filter.pipe';
import { DocumentNameFilterPipe } from './pipe/document-name-filter.pipe';
import { UpdateDocumentComponent } from './components/files/update-document/update-document.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewDocumentComponent,
    ListDocumentComponent,
    AddDocumentComponent,
    DocumentTagFilterPipe,
    DocumentNameFilterPipe,
    UpdateDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    SlimLoadingBarModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    TagInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

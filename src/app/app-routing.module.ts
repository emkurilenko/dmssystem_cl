import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDocumentComponent } from './components/files/view-document/view-document.component';
import { ListDocumentComponent } from './components/files/list-document/list-document.component';
import { AddDocumentComponent } from './components/files/add-document/add-document.component';
import { UpdateDocumentComponent } from './components/files/update-document/update-document.component';

const routes: Routes = [
  {path: 'add-document', component: AddDocumentComponent},
  {path: 'view-document', component: ViewDocumentComponent},
  {path: 'update-document', component: UpdateDocumentComponent},
  {path: 'list-document', component: ListDocumentComponent},
  {path: '', pathMatch: 'full', redirectTo: 'list-document'},
  {path: '**', pathMatch: 'full', redirectTo: 'list-document'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

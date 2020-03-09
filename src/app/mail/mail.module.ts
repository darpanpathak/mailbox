import { SharedModule } from './../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { ComposeComponent } from './compose/compose.component';
import { InboxComponent } from './inbox/inbox.component';
import { NavbarModule } from './../shared/modules/navbar/navbar.module';
import { SidebarModule } from './../shared/modules/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { CKEditorModule } from 'ngx-ckeditor';
import { ReadMailComponent } from './read-mail/read-mail.component';

const routes: Routes = [
  {
    path: "",
    component: MailComponent,
    children: [
      {
        path: "inbox",
        component: InboxComponent
      },
      {
        path: 'read/:id',
        component: ReadMailComponent
      }
    ]
  }
]

@NgModule({
  declarations: [MailComponent, ComposeComponent, InboxComponent, ReadMailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    SharedModule,
    ModalModule.forRoot(),
    CKEditorModule
  ],
  entryComponents: [ComposeComponent]
})
export class MailModule { }

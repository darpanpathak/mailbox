import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports : [SidebarComponent]
})
export class SidebarModule { }

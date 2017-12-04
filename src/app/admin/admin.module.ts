import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../shared/auth.guard'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'users', component: UsersComponent },
          { path: '', component: ComplaintsComponent }
        ]
      }
    ]
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthGuard],
  declarations: [AdminComponent, UsersComponent, ComplaintsComponent]
})
export class AdminModule { }

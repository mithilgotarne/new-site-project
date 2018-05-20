import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  // {path: 'users', component: UsersComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, AngularFireAuthModule, AngularFireDatabaseModule],
  providers: [],
  declarations: [RegisterComponent, UsersComponent]
})

export class RegisterModule { }

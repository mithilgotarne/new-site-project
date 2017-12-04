import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

const routes : Routes = [
    {path: '', component: RegisterComponent}
] 

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule,AngularFireAuthModule, AngularFireDatabaseModule],
    providers: [],
    declarations: [RegisterComponent]
})

export class RegisterModule {}
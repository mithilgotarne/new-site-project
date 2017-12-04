import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComplaintBoxComponent } from './complaint-box.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

const routes : Routes = [
    {path: '', component: ComplaintBoxComponent}
] 

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule, AngularFireDatabaseModule, AngularFireAuthModule],
    providers: [],
    declarations: [ComplaintBoxComponent],
})

export class ComplaintBoxModule {}
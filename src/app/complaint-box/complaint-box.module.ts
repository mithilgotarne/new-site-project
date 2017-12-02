import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComplaintBoxComponent } from './complaint-box.component';

const routes : Routes = [
    {path: '', component: ComplaintBoxComponent}
] 

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule],
    providers: [],
    declarations: [ComplaintBoxComponent],
})

export class ComplaintBoxModule {}
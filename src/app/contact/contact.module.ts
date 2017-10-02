import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';


import { ContactComponent } from './contact.component';

import { InfoService } from '../shared/info.service'; 

const routes : Routes = [
    {path: '', component: ContactComponent}
] 

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    providers: [InfoService],
    declarations: [ContactComponent]
})

export class ContactModule{}
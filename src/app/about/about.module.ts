import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { InfoService } from '../shared/info.service';

import { AboutComponent } from './about.component';

const routes : Routes = [
    {path: '', component: AboutComponent}
] 

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    providers: [InfoService],
    declarations: [AboutComponent]
})

export class AboutModule {}
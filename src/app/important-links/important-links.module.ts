import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ImportantLinksComponent } from './important-links.component';
import { InfoService }from '../shared/info.service';

const routes : Routes = [
    {path: '', component: ImportantLinksComponent}
] 

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule],
    providers: [InfoService],
    declarations: [ImportantLinksComponent],
})

export class ImportantLinksModule {}
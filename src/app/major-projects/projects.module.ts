import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MajorProjectsComponent } from './major-projects.component';
import { SocialInitiativesSingleComponent } from './social-initiatives-single.component';

const routes : Routes = [
    {path: '', component: MajorProjectsComponent},
    {path: ':id', component: SocialInitiativesSingleComponent}
] 

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [MajorProjectsComponent, SocialInitiativesSingleComponent]
})

export class ProjectsModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PhotosComponent, SingleAlbumComponent } from '../photos';

const routes : Routes = [
    {path: '', component: PhotosComponent},
    {path: ':id', component: SingleAlbumComponent}
] 

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [PhotosComponent, SingleAlbumComponent]
})

export class PhotosModule {}
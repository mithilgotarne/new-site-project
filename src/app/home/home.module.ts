import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InfoService } from '../shared/info.service';
import { FacebookService } from '../shared/facebook.service';
import { Observable } from 'rxjs/Rx';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component'

const routes : Routes = [
    {path: '', component: HomeComponent}
]

@NgModule({
    providers: [InfoService, FacebookService],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    declarations: [SliderComponent, AboutComponent, HomeComponent, PostsComponent],
    exports: [HomeComponent]
})

export class HomeModule{}
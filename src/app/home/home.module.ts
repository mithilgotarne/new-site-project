import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoService } from '../shared/info.service';
import { Observable } from 'rxjs/Rx';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router'

const routes : Routes = [
    {path: '', component: HomeComponent}
]

@NgModule({
    providers: [InfoService],
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [SliderComponent, AboutComponent, HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule{}
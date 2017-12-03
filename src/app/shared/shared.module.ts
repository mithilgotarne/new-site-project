import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StringToHtmlPipe } from './string-to-html.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule],
    declarations: [StringToHtmlPipe, PageHeaderComponent, LoadingSpinnerComponent],
    exports: [CommonModule, FormsModule, HttpModule, StringToHtmlPipe, PageHeaderComponent, LoadingSpinnerComponent]
})

export class SharedModule{}
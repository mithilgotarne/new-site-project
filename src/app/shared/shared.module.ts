import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StringToHtmlPipe } from './string-to-html.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
    imports: [CommonModule, FormsModule, HttpModule],
    declarations: [StringToHtmlPipe, PageHeaderComponent],
    exports: [CommonModule, FormsModule, HttpModule, StringToHtmlPipe, PageHeaderComponent]
})

export class SharedModule{}
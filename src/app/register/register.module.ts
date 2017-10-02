import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { SmsService } from '../shared/sms.service';

const routes : Routes = [
    {path: '', component: RegisterComponent}
] 

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule],
    providers: [SmsService],
    declarations: [RegisterComponent]
})

export class RegisterModule {}
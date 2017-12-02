import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';

const routes : Routes = [
    {path: '', component: RegisterComponent}
] 

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule,],
    providers: [],
    declarations: [RegisterComponent]
})

export class RegisterModule {}
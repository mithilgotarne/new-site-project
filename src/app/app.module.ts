import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    //AngularFireModule.initializeApp(environment.firebase),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],    
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule {
}

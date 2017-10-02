import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';



const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', loadChildren: 'app/home/home.module#HomeModule' },
      { path: 'about/:id', loadChildren: 'app/about/about.module#AboutModule' },
      { path: 'social-initiatives', loadChildren: 'app/major-projects/projects.module#ProjectsModule' },
      { path: 'gallery', loadChildren: 'app/photos/photos.module#PhotosModule' },
      { path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule' },
      { path: 'register', loadChildren: 'app/register/register.module#RegisterModule' },
      { path: 'complaint-box', loadChildren: 'app/complaint-box/complaint-box.module#ComplaintBoxModule' },
      { path: 'important-links', loadChildren: 'app/important-links/important-links.module#ImportantLinksModule' },]
  },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
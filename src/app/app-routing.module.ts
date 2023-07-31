import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OuthPageComponent } from './outh-page/outh-page.component';
import { ShorturlinfoComponent } from './shorturlinfo/shorturlinfo.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'Url/:Id', component: ShorturlinfoComponent
  },
  {
    path: 'Login', component: OuthPageComponent
  },
  {
    path: 'About', component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

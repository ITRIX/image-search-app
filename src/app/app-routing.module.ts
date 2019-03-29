import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/component/home/home.component';
import { FavoriteComponent } from 'src/app/component/favorite/favorite.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favorite', component: FavoriteComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

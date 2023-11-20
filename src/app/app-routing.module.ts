import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { ReviewComponent } from './pages/review/review.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'review',
  component: ReviewComponent
},
{
  path: 'ruta-inexistenta',
  component: NotFoundComponent
},

{
  path: '', redirectTo: 'home', pathMatch:'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

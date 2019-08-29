import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartLoadGuard } from './cart-load.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"products", component:ProductsComponent},
  {path:"product/:id", component:ProductDetailComponent},
  {path:"cart", component:CartComponent, canActivate:[CartLoadGuard]},
  {path:"contact", component:ContactComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

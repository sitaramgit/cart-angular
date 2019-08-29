import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, CanActivate } from '@angular/router';
import { Observable } from 'rxjs'; 
import { HeaderComponent } from './components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class CartLoadGuard implements CanActivate { 
  canActivate():boolean{
    if(this.cartCount()==0){
      return false;
    }else{
      return true;
    }
  }

  cartCount(){
    let cart = localStorage.getItem('cart_products');
    let ret:any;
    if(!cart){
      ret = [];
    }
    else{
      ret = cart.split(",");
    }
    return ret.length; 
  }
}

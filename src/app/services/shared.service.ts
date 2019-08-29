import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  constructor() {   }

  private count = this.cartCount();
  private currentCartCount = new BehaviorSubject(this.count);
  currentMessage = this.currentCartCount.asObservable();

  updateCartCount(count:any){
    this.currentCartCount.next(count);
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

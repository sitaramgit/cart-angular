import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CrmPorductsService {


     public cartCount = new Observable<any>((observer: Subscriber<any>) => {
      observer.next(this.updateCartProductIds());
    });

  constructor(private http: HttpClient, private shareSer:SharedService) { }
 public url:string = 'http://45.33.18.167/vtiger365/leads.php?';
 public imgPath:string = "http://45.33.18.167/vtiger365/";

 getAllProducts():Observable<any>{
  return this.http.get(this.url+'module=Products&view=List');
 }

 getCartProducts():Observable<any>{
  let cart = localStorage.getItem('cart_products'); 
  return this.http.get(this.url+'module=Products&view=CartList&records='+cart);
 }

 getSingleProduct(id):Observable<any>{ 
  return this.http.get(this.url+'module=Products&view=Detail&record='+id);
 }
 
  //add to cart
 addToCartAndStoreLocal(product_id){
   let catrs = this.getCartProductIds();
   let check = catrs.includes(product_id);
   if(catrs == [])
   {
    catrs.push(product_id); 
    localStorage.setItem('cart_products',catrs.toString());
   }

   if(!check){
    catrs.push(product_id); 
    localStorage.setItem('cart_products',catrs.toString());
    console.log(catrs);
   }else{
    alert('already added in cart');
     console.log('already added in cart');
   }

   let count = this.getCartProductIds();
   this.shareSer.updateCartCount(count.length);
 
 }

 getCartProductIds(){
   let cart = localStorage.getItem('cart_products');
   if(!cart){
     return [];
   }
   return cart.split(",");
  //  return JSON.parse(cart);
 }



 updateCartProductIds(){
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

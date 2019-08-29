import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CrmPorductsService } from 'src/app/services/crm-porducts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
 

  private products:any;
  constructor(private proSer:CrmPorductsService,
              private shareSer:SharedService,
              private userSer:UserService,
              private router:Router
              ) { }

  ngOnInit() {
    this.cartProducts();
    
  }
  private imgPath:string = this.proSer.imgPath;

  cartProducts(){
    this.proSer.getCartProducts().subscribe(
      data => {
        this.products = data; 
        },
      err => console.log(err),
      () => {this.setInvoice();}
    )
  }

  removeFromCart(id){
    let ids = this.proSer.getCartProductIds();
    var filteredAry = ids.filter(function(e) { return e !== id });
    localStorage.setItem('cart_products',filteredAry.toString());
    document.getElementById('tr_'+id).remove();
    let count = this.proSer.getCartProductIds(); 
    this.shareSer.updateCartCount(count.length);
    this.invovice();
  }
  setInvoice(){
    setTimeout(()=>{
      this.invovice();
    },1000);
    
  }
  invovice(){
    let unit_price:any = document.getElementsByClassName('unit_price');
    let quantity:any = document.getElementsByClassName('quantity');
    let productTotal:any = document.getElementsByClassName('productTotal');
    //total price
    let totalPrice:any = 0;
    
   
   //total quantity

   let totalQty:any = 0;
    for(let q=0; q<quantity.length; q++){
      let qty = parseInt(quantity[q].value);
      totalQty = totalQty + qty;
      let totPrice = qty * parseInt(unit_price[q].innerHTML);
      productTotal[q].innerHTML = totPrice;
      totalPrice = totalPrice + totPrice;

    }
    document.getElementById('totProduct').innerHTML = totalQty;

    document.getElementById('grandTotal').innerHTML = totalPrice;
    document.getElementById('subTotal').innerHTML = totalPrice;
  
  }


  checkoutPage(){

    let unit_price:any = document.getElementsByClassName('unit_price');
    let quantity:any = document.getElementsByClassName('quantity');
    let productTotal:any = document.getElementsByClassName('productTotal');
    let productId:any = document.getElementsByClassName('productId');

    let checkout= [];
    for(let i=0; i<productId.length; i++){

      checkout.push({
         product_id:productId[i].value,
         quantity:parseInt(quantity[i].value),
         each_price:parseInt(unit_price[i].innerHTML),
         total_price:parseInt(productTotal[i].innerHTML)
    });
      
    } 

  let final = {
    final_products:checkout,
    grand_total: document.getElementById('grandTotal').innerHTML
  }

    localStorage.setItem('checkout',JSON.stringify(final));
    // localStorage.removeItem('cart_products');
    // this.shareSer.updateCartCount(0);
    let logged = this.userSer.loggedin();
    if(logged){
      this.router.navigate(['/checkout']);
    }else{
      this.router.navigate(['/login']);
    }
  }








}

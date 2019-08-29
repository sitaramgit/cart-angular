import { Component, OnInit } from '@angular/core';
import { CrmPorductsService } from 'src/app/services/crm-porducts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products:any;
  constructor(private proSer:CrmPorductsService) { }

  ngOnInit() {
    this.allProducts();
  }
  private path:string = this.proSer.imgPath;
  private allProducts(){
    this.proSer.getAllProducts().subscribe(
      (data)=>{  this.products = data},
      (err:HttpErrorResponse)=>{ console.log(err) },
      ()=>{}
      )
  }

 private addToCart(procuct){ 
  this.proSer.addToCartAndStoreLocal(procuct.id);
  }
}

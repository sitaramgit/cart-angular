import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrmPorductsService } from 'src/app/services/crm-porducts.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private actRoute:ActivatedRoute, private crmSer:CrmPorductsService) { }
  private productId:any;
  private proDetail:any;
  ngOnInit() {
    this.productId = this.actRoute.snapshot.params.id;
    this.getProductDetail();
  }
  private servePath = this.crmSer.imgPath;
  getProductDetail(){
    this.crmSer.getSingleProduct(this.productId)
    .subscribe(
      data => this.proDetail = data,
      err =>console.log(err)
    )
  }

  addTocart(id){
    this.crmSer.addToCartAndStoreLocal(id);
  }





}

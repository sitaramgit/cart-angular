import { Component, OnInit } from '@angular/core';
import { CrmPorductsService } from 'src/app/services/crm-porducts.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private  cart:any;
  constructor(private proSer:CrmPorductsService,private shareSer:SharedService) { 
    
  }
  
  ngOnInit() {
    this.cart = this.proSer.getCartProductIds().length;


    this.shareSer.currentMessage.subscribe(
      data => this.cart =data
    )

  }

}

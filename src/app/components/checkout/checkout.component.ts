import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private showForm:boolean = false;
  constructor(private usrSer:UserService) { }


  ngOnInit() {
  }

  changeMethod(val){
    if(val == 'cash_on_delivery'){
      this.showForm = false;
    }else{
      this.showForm = true;
    }
  }

  submitCheckout(frm){
    let data = localStorage.getItem('checkout')
    this.usrSer.createInvoice(data).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }

}

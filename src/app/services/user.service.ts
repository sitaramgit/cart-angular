import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrmPorductsService } from './crm-porducts.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private crmSer:CrmPorductsService) { }

  loggedin(){
    let user = localStorage.getItem('user');
    if(!user){
      return false;
    }else{
      return true;
    }
  }
  // https://github.com/salaros/vtwsclib-php/wiki
  storeRegisterData(data):Observable<any>{
    return this.http.get(this.crmSer.url+"module=Contacts&view=Edit&data="+JSON.stringify(data));
  }

  authenticateUser(data):Observable<any>{
    return this.http.get(this.crmSer.url+"module=Contacts&view=Login&email="+data.email+"&password="+data.password);
  }

  createInvoice(data):Observable<any>{
    return this.http.get(this.crmSer.url+"module=Invoice&view=Edit&data="+JSON.stringify(data));
  }
  
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userDetail:any = null;
  constructor(private userSer:UserService, private router:Router) { }

  ngOnInit() {
    this.showUserDetails();
  }

  showUserDetails(){

    let user = localStorage.getItem('login_details');
    if(!user){
     this.userDetail=null;
    }else{
      this.userDetail = JSON.parse(user) ;
    }
  }

  loginForm(form){
    console.log(form.value);
    this.userSer.authenticateUser(form.value).subscribe(
      data => this.authenticate(data),
      err => console.log(err)
    );
  }

  authenticate(data){
    if(data['result']=='error'){
      alert(data['message']);
    }else{
      localStorage.setItem('user',JSON.stringify(data)); 
      localStorage.removeItem('login_details');
      this.router.navigate(['/checkout']);
    }
  }



}

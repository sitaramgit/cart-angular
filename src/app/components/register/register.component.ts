import { Component, OnInit } from '@angular/core'; 
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = {
    firstname:'',
    lastName:'',
    mobile:'',
    otherphone:'',
    email:'',
    mailingstreet:'',
    country:'',
    state:'',
    zip:''

  }
  constructor(private usr:UserService, private router:Router) { }

  ngOnInit() {

    

  }

  formSubmit(fm){ 
    this.usr.storeRegisterData(fm.value).subscribe(
      data=>this.loginSuccess(data),
      err => console.log(err)
    )
  }

  loginSuccess(data){
    if(data['result'] == "success"){
      localStorage.setItem('login_details',JSON.stringify(data));
      this.router.navigate(['/login']);
    }else{
      alert(data['message']);
    }
    

  }

}

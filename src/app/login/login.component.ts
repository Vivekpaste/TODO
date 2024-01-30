import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isResultLoaded = false;
  isUpdateFormActive = false;
  form!: FormGroup;
  Email: string = "";
  Password: string = "";


  constructor(
    private FormBuilder:FormBuilder,
    private http: HttpClient,
   
    private router:Router) {}

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      email:"",
      pass_word:""
    });
  }



  validateEmail = (email: any)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email.match(emailRegex)){
      return true;
    }
    else {
      return false;
    }
    
}

  submit():void{
    let user = this.form.getRawValue()
    console.log(user);

    if(user.email == "" || user.pass_word == ""){
      Swal.fire("Error","Please enter all the fields","error")

    }
    else if(!this.validateEmail(user.email)){
      Swal.fire("Error","Please enter a valid email","error")
    }else{
      this.http.post("http://localhost:5000/login",user,{
        withCredentials:true
      })
      .subscribe(()=> this.router.navigate(['/viewtask']),(err)=>{
        Swal.fire("Error",err.error.message,"error")
      })
    }
  }
  Logout()
  {
    
  }


}

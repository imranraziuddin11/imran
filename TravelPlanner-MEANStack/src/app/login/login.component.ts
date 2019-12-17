import { Component, OnInit } from '@angular/core';
import { SigninService } from '../services/signin.service';
import { CommunicationService } from '../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private signinService: SigninService, private router: Router, private communicationService: CommunicationService)  { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.signinService.getData().subscribe(data => {
    console.log(data);
    if (data["status"] == true) {
      this.communicationService.updateData(data);
      if(data["data"]["type"] == "admin"){
        this.router.navigate(['admin']);
      }else {
        this.router.navigate(['home']);
      }
    } 
  });
  }

  callGoogleAuth(): void{
    window.open("/auth/google", '_self');
  }

}

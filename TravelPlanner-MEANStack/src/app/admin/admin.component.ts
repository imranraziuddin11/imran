import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { AdminService } from '../services/admin.service';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userData: object;
  requests: Array<object> = [];
  packages: Array<object>;

  constructor(private communicationService: CommunicationService,private adminService: AdminService,private packageService: PackageService) { }

  ngOnInit() {
    this.userData = this.communicationService.getData();
    console.log("User Data");
    console.log(this.userData);
    this.userData["data"]["type"] = this.titleCase(this.userData["data"]["type"]);
    this.userData["data"]["name"] = this.titleCase(this.userData["data"]["name"]);
    this.adminService.getData().subscribe(data => {
      console.log(data);
      this.requests = data["data"];
    });
    this.packageService.getData().subscribe(data => {
      console.log(data);
      this.packages = data["data"];
    });
  }

  logoutUser():void{
    window.open("/logout", "_self");
  }

  titleCase(string_name: string): string {
    if (string_name !== null && typeof(string_name) === "string") {
        var string_name_array = string_name.split(' ');
        for (var i = 0; i < string_name_array.length; i++) {
            string_name_array[i] = string_name_array[i].charAt(0).toUpperCase() + string_name_array[i].substr(1);
            var hyphen_case_split = string_name_array[i].split("-");
            if (hyphen_case_split.length > 1) {
                for (var j = 0; j < hyphen_case_split.length; j++) {
                    hyphen_case_split[j] = hyphen_case_split[j].charAt(0).toUpperCase() + hyphen_case_split[j].substr(1);
                }
                string_name_array[i] = hyphen_case_split.join("-");
            }
        }
        var titleCase_string = string_name_array.join(' ');
        return titleCase_string;
    } else {
        console.log("Only string can be processed");
    }
  }


  processUserRequest(index):void{
    console.log(this.requests[index]);
    this.adminService.processData(this.requests[index]).subscribe(data => {
      console.log(data);
      this.pop_toast(data["message"], 2000);
      this.adminService.getData().subscribe(data => {
        console.log(data);
        this.requests = data["data"];
      });
    });
    
  }

  processPackageRemove(index): void {
    this.packageService.removePackage(this.packages[index]["package_id"]).subscribe(data => {
      console.log(data);
      this.packageService.getData().subscribe(data => {
        console.log(data);
        this.packages = data["data"];
      });
    });
  }

  

  pop_toast(message, duration): void {
    console.log("triggering toast");
    var durationActive = duration;
    var toastDiv = document.createElement('DIV');
    toastDiv.setAttribute('id', 'mirToastDiv');
    toastDiv.setAttribute('style', 'transition: all 0.2s linear;background-color: #0067b8 ;width : 350px;font-size:1.2rem;padding:8px;text-align: center;color: #fff;position: fixed; top:5%; right: 2%;opacity: 0;transition: opacity 0.3s, top 0.4s;');
    var toastMessage = document.createTextNode(message.toString());
    toastDiv.appendChild(toastMessage);
    document.getElementsByTagName('body')[0].appendChild(toastDiv);

    var in_transition_duration = 200;
    var out_transition_duration = 400;
    durationActive += in_transition_duration + out_transition_duration;

    setTimeout(function() {
        toastDiv.style.top = '10%';
        toastDiv.style.opacity = '1';
        setTimeout(function() {
            toastDiv.style.top = '15%';
            toastDiv.style.opacity = '0';
            setTimeout(function() { document.getElementsByTagName('body')[0].removeChild(toastDiv); }, durationActive + 1800);
        }, durationActive);
    }, in_transition_duration);
  }

}

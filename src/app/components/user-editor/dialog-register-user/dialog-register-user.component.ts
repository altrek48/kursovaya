import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-dialog-register-user',
  templateUrl: './dialog-register-user.component.html',
  styleUrls: ['./dialog-register-user.component.scss']
})
export class DialogRegisterUserComponent implements OnInit {
   user: User;
  constructor(private baseServiceService: BaseServiceService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  registration(user: User) {
    console.log("Registraaaaaation");
    this.baseServiceService.registration(user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );;
  }

}

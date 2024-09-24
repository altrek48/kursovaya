import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-login-user',
  templateUrl: './dialog-login-user.component.html',
  styleUrls: ['./dialog-login-user.component.scss']
})
export class DialogLoginUserComponent implements OnInit {
  editingUser: User;
  constructor(private baseServiceService: BaseServiceService, private router: Router) {
    this.editingUser = new User();
  }

  login() {
  console.log('Login method called');
  this.baseServiceService.login(this.editingUser).subscribe(
    (response) => {
      console.log('Login successful', response);
      this.router.navigate(['/students']);
    },
    (error) => {
      console.error('Login failed', error);
    }
  );
}

  ngOnInit(): void {
  }

}

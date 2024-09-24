import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-dialog-register-user',
  templateUrl: './dialog-register-user.component.html',
  styleUrls: ['./dialog-register-user.component.scss']
})
export class DialogRegisterUserComponent implements OnInit {
   user: User;
  constructor(private baseServiceService: BaseServiceService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  registration(user: User) {
    this.baseServiceService.registration(user);
  }

}

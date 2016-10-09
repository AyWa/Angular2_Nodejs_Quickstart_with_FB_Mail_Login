import { Component, OnInit } from '@angular/core';
import { UserService } from '../service_login/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  private isCollapsed = true;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}

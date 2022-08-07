import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private cookie: CookieService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    console.log("something")
    this.cookie.deleteAll();
    this.route.navigate(['/login']);
  }
}

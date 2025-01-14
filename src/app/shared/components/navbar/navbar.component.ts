import { Component, OnInit } from '@angular/core';
import { routes, AppRoute } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  routes: AppRoute[] = [];

  ngOnInit() {
    this.routes = routes.filter((route) => route.data?.showInNavbar);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: {'url': String, 'name': String}[] =[];
  constructor() { }

  ngOnInit() {
    this.menuItems = [
      {
        'url': '/home',
        'name': 'Home'
      },
      {
        'url': '/favorite',
        'name': 'Favorite'
      }
    ];
  }

}

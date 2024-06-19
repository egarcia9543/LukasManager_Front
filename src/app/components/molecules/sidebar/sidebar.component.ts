import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: any[] = [];
  ngOnInit() {
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    this.menuItems = [
      {
      name: 'Inicio',
      icon: 'home',
      route: 'home'
      },
      {
        name: 'Informes',
        icon: 'data_thresholding',
        route: 'reports'
      },
    ]
  }
}

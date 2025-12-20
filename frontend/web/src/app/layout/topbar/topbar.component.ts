import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        CommonModule,
        MenubarModule,
        RouterModule
    ],
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

    items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: '/dashboard'
        },
        {
            label: 'Clients',
            icon: 'pi pi-users',
            routerLink: '/clients'
        },
        {
            label: 'Actes',
            icon: 'pi pi-file',
            routerLink: '/actes'
        }
    ];
}

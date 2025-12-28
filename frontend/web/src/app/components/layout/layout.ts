import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, MenuModule, AvatarModule, TranslateModule],
    templateUrl: './layout.html',
    styleUrl: './layout.scss'
})
export class LayoutComponent {
    sidebarVisible = true;
    userMenuItems: MenuItem[] = [
        { label: 'Profile', icon: 'pi pi-user' },
        { label: 'Settings', icon: 'pi pi-cog' },
        { separator: true },
        { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout() }
    ];

    constructor(
        private keycloak: KeycloakService,
        public languageService: LanguageService
    ) { }

    logout() {
        this.keycloak.logout();
    }
}

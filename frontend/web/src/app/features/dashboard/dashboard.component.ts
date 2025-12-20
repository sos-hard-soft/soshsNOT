import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ButtonModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    stats = {
        clients: 0,
        actes: 0,
        actesDraft: 0
    };

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Phase 1 : statiques
        // Phase 2 : API stats (plus tard)
        this.stats = {
            clients: 12,
            actes: 7,
            actesDraft: 4
        };
    }

    go(path: string): void {
        this.router.navigate([path]);
    }
}

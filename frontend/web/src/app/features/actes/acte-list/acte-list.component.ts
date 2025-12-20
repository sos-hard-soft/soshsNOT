import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ActeService } from '../../../core/services/acte.service';
import { Acte } from '../../../core/models/acte.model';

@Component({
    selector: 'app-acte-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        ButtonModule,
        CardModule
    ],
    templateUrl: './acte-list.component.html'
})
export class ActeListComponent implements OnInit {

    actes: Acte[] = [];

    constructor(
        private acteService: ActeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.acteService.getAll().subscribe(r => this.actes = r);
    }

    open(acte: Acte): void {
        this.router.navigate(['/actes', acte.id]);
    }

    create(): void {
        this.router.navigate(['/actes/new']);
    }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActeService } from '../../services/acte.service';
import { Acte } from '../../models/acte.model';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
    selector: 'app-actes',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TagModule,
        InputTextModule
    ],
    templateUrl: './actes.html'
})
export class ActesComponent implements OnInit {
    actes = signal<Acte[]>([]);

    constructor(private acteService: ActeService, private router: Router) { }

    ngOnInit() {
        this.loadActes();
    }

    loadActes() {
        this.acteService.getAll().subscribe(data => this.actes.set(data));
    }

    goToCreate() {
        this.router.navigate(['/actes/nouveau']);
    }

    getSeverity(cloture: boolean) {
        return cloture ? 'success' : 'warn';
    }

    viewActe(id: string) {
        console.log('viewActe called with id:', id);
        this.router.navigate(['/actes', id]);
    }
}

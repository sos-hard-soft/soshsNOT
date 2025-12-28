import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ActeService } from '../../../services/acte.service';

@Component({
    selector: 'app-acte-view',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        TableModule,
        TagModule
    ],
    templateUrl: './acte-view.html'
})
export class ActeViewComponent implements OnInit {
    acte: any = null;
    acteId: string | null = null;
    loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private acteService: ActeService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.acteId = this.route.snapshot.paramMap.get('id');
        if (this.acteId) {
            this.loadActe(this.acteId);
        }
    }

    loadActe(id: string) {
        this.loading = true;
        this.acteService.getById(id).subscribe({
            next: (data) => {
                this.acte = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error loading acte:', err);
                this.loading = false;
                this.cdr.detectChanges();
                this.router.navigate(['/actes']);
            }
        });
    }

    goBack() {
        this.router.navigate(['/actes']);
    }

    closeActe() {
        // TODO: Implement close functionality
        alert('Functionality to be implemented');
    }

    editActe() {
        this.router.navigate(['/actes/modifier', this.acteId]);
    }
}

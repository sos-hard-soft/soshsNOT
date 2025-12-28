import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { FileExplorerComponent } from '../../../components/file-explorer/file-explorer';
import { MessageService } from 'primeng/api';
import { ClientService } from '../../../services/client.service';
import { ClientPhysique, Adresse } from '../../../models/client.model';

@Component({
    selector: 'app-physique-detail',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        DatePickerModule,
        FluidModule,
        ToastModule,
        TableModule,
        DialogModule,
        TextareaModule,
        TabsModule,
        FileExplorerComponent
    ],
    providers: [MessageService],
    templateUrl: './physique-detail.html'
})
export class PhysiqueDetailComponent implements OnInit {
    editMode = false;
    client: ClientPhysique = {
        client_type: 'client_physique',
        isActive: true,
        cin: '',
        nom: '',
        prenom: '',
        nationalite: 'Marocaine',
        adresses: []
    } as any;

    dateNaissance: Date | undefined;

    // Address Dialog
    showAdresseDialog = false;
    newAdresse: Adresse = {
        adresse: '',
        ville: '',
        pays: 'Maroc',
        principale: false
    };

    cinExists = false;

    constructor(
        private clientService: ClientService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.editMode = true;
            this.loadClient(id);
        }
    }

    loadClient(id: string) {
        // Since we don't have a getById endpoint for Physique specifically in the Service (except generic get all),
        // we might ideally need one. But usually getAllPhysiques filters. 
        // For now, let's assume we fetch all and find, OR better, add getById to service.
        // Let's assume we add getById to service or use the generic one if it returns specific fields.
        // Actually ClientService.getAll() returns Client[], we might need a specific endpoint.
        // Ideally: GET /api/clients/physiques/{id}
        // I will add this to the service in parallel.
        this.clientService.getPhysiqueById(id).subscribe({
            next: (data) => {
                this.client = data;
                if (data.dateNaissance) {
                    this.dateNaissance = new Date(data.dateNaissance);
                }
                this.cdr.detectChanges(); // Force update
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Client introuvable' });
                this.router.navigate(['/clients']);
            }
        });
    }

    checkCin() {
        if (!this.client.cin || this.editMode) return;
        this.clientService.checkCinExists(this.client.cin).subscribe(exists => {
            this.cinExists = exists;
        });
    }

    addAdresse() {
        if (!this.client.adresses) {
            this.client.adresses = [];
        }
        if (this.client.adresses.length === 0) {
            this.newAdresse.principale = true;
        }
        this.client.adresses.push({ ...this.newAdresse });
        this.newAdresse = { adresse: '', ville: '', pays: 'Maroc', principale: false };
        this.showAdresseDialog = false;
    }

    removeAdresse(index: number) {
        this.client.adresses?.splice(index, 1);
    }

    save() {
        if (this.cinExists) return;

        const payload = {
            ...this.client,
            dateNaissance: this.formatDate(this.dateNaissance)
        };

        if (this.editMode && payload.id) {
            // We need an update endpoint
            // Usually PUT /api/clients/physiques/{id}
            this.clientService.updatePhysique(payload.id, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Client mis à jour' });
                    setTimeout(() => this.router.navigate(['/clients']), 1000);
                },
                error: (err) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message })
            });
        } else {
            this.clientService.createPhysique(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Client créé' });
                    setTimeout(() => this.router.navigate(['/clients']), 1000);
                },
                error: (err) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message })
            });
        }
    }

    private formatDate(date: any): string | undefined {
        if (!date) return undefined;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    cancel() {
        this.router.navigate(['/clients']);
    }
}

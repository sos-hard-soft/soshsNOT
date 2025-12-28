import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActeService } from '../../../services/acte.service';
import { ClientService } from '../../../services/client.service';
import { ACTE_TYPES, ActePartie } from '../../../models/acte.model';

@Component({
    selector: 'app-acte-create',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        DatePickerModule,
        SelectModule,
        FluidModule,
        ToastModule,
        AutoCompleteModule,
        TableModule,
        SelectButtonModule
    ],
    providers: [MessageService],
    templateUrl: './acte-create.html'
})
export class ActeCreateComponent implements OnInit {
    editMode = false;
    acteId: string | null = null;

    newActe: any = {
        numeroActe: '',
        type: null,
        dateActe: new Date(),
        cloture: false,
        parties: []
    };

    acteTypes = ACTE_TYPES;

    // Party Management
    clientTypeOptions: any[] = [{ label: 'Physique', value: 'physique' }, { label: 'Morale', value: 'morale' }];
    selectedClientType: string = 'physique';

    qualites = [
        { label: 'Vendeur', value: 'VENDEUR' },
        { label: 'Acquéreur', value: 'ACQUEREUR' },
        { label: 'Donateur', value: 'DONATEUR' },
        { label: 'Donataire', value: 'DONATAIRE' },
        { label: 'Créancier', value: 'CREANCIER' },
        { label: 'Débiteur', value: 'DEBITEUR' },
        { label: 'Mandataire', value: 'MANDATAIRE' },
        { label: 'Lotisseur', value: 'LOTISSEUR' }
    ];

    selectedClient: any;
    selectedQualite: string = 'VENDEUR';
    filteredClients: any[] = [];
    loadingClients: boolean = false;

    parties: ActePartie[] = [];

    constructor(
        private acteService: ActeService,
        private clientService: ClientService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.acteId = this.route.snapshot.paramMap.get('id');
        if (this.acteId) {
            this.editMode = true;
            this.loadActe(this.acteId);
        }
    }

    loadActe(id: string) {
        this.acteService.getById(id).subscribe({
            next: (data) => {
                this.newActe = {
                    ...data,
                    dateActe: data.dateActe ? new Date(data.dateActe) : new Date()
                };
                this.parties = data.parties || [];
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Acte introuvable' });
                this.router.navigate(['/actes']);
            }
        });
    }

    searchClient(event: any) {
        const query = event.query;

        // Don't search if query is empty
        if (!query || query.trim().length === 0) {
            this.filteredClients = [];
            return;
        }

        this.loadingClients = true;

        if (this.selectedClientType === 'physique') {
            this.clientService.autocompletePhysique(query).subscribe({
                next: (data) => {
                    // Map data to include displayName property
                    this.filteredClients = data.map(client => ({
                        ...client,
                        displayName: `${client.nom} ${client.prenom} (${client.cin})`
                    }));
                    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
                    setTimeout(() => this.loadingClients = false, 0);
                },
                error: () => {
                    this.filteredClients = [];
                    setTimeout(() => this.loadingClients = false, 0);
                }
            });
        } else {
            this.clientService.autocompleteMorale(query).subscribe({
                next: (data) => {
                    // Map data to include displayName property
                    this.filteredClients = data.map(client => ({
                        ...client,
                        displayName: `${client.raisonSociale} (${client.ice})`
                    }));
                    setTimeout(() => this.loadingClients = false, 0);
                },
                error: () => {
                    this.filteredClients = [];
                    setTimeout(() => this.loadingClients = false, 0);
                }
            });
        }
    }

    getClientDisplayName(client: any): string {
        if (!client) return '';
        if (client.nom) return `${client.nom} ${client.prenom} (${client.cin})`;
        if (client.raisonSociale) return `${client.raisonSociale} (${client.ice})`;
        return '';
    }

    getClientOptionLabel(client: any): string {
        if (!client) return '';
        // For display in input field, use appropriate field based on type
        if (this.selectedClientType === 'physique' && client.nom) {
            return `${client.nom} ${client.prenom} (${client.cin})`;
        } else if (this.selectedClientType === 'morale' && client.raisonSociale) {
            return `${client.raisonSociale} (${client.ice})`;
        }
        return '';
    }

    addPartie() {
        if (!this.selectedClient || !this.selectedQualite) return;

        // Check duplicate in list
        if (this.parties.some(p => p.clientId === this.selectedClient.id)) {
            this.messageService.add({ severity: 'warn', summary: 'Doublon', detail: 'Ce client est déjà ajouté.' });
            return;
        }

        const partie: ActePartie = {
            clientId: this.selectedClient.id,
            clientNom: this.getClientDisplayName(this.selectedClient),
            qualite: this.selectedQualite
        };

        this.parties = [...this.parties, partie];
        this.selectedClient = null;
        // Keep qualite for convenience or reset? Let's keep it.
    }

    removePartie(index: number) {
        this.parties.splice(index, 1);
        this.parties = [...this.parties]; // Trigger change detection if needed for signals, though this is normal array
    }

    save() {
        // Format date to YYYY-MM-DD for LocalDate backend compatibility
        const payload = {
            ...this.newActe,
            dateActe: this.formatDate(this.newActe.dateActe),
            parties: this.parties
        };

        const request = this.editMode && this.acteId
            ? this.acteService.update(this.acteId, payload)
            : this.acteService.create(payload);

        request.subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: this.editMode ? 'L\'acte a été modifié avec succès' : 'L\'acte a été enregistré avec succès'
                });
                setTimeout(() => this.router.navigate(['/actes']), 1500);
            },
            error: (err: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: err.error?.message || 'Une erreur est survenue'
                });
            }
        });
    }

    private formatDate(date: any): string {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    cancel() {
        this.router.navigate(['/actes']);
    }
}

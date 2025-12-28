import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ClientPhysique, ClientMorale } from '../../models/client.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-clients',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TabsModule,
        InputTextModule,
        FormsModule,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './clients.html'
})
export class ClientsComponent implements OnInit {
    physiques = signal<ClientPhysique[]>([]);
    morales = signal<ClientMorale[]>([]);

    constructor(
        private clientService: ClientService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadClients();
    }

    loadClients() {
        this.clientService.getAllPhysiques().subscribe(data => this.physiques.set(data));
        this.clientService.getAllMorales().subscribe(data => this.morales.set(data));
    }

    createPhysique() {
        this.router.navigate(['/clients/physique/nouveau']);
    }

    createMorale() {
        this.router.navigate(['/clients/morale/nouveau']);
    }

    editPhysique(id: string) {
        this.router.navigate(['/clients/physique', id]);
    }

    editMorale(id: string) {
        this.router.navigate(['/clients/morale', id]);
    }

    deleteClient(event: Event, id: string) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Êtes-vous sûr de vouloir supprimer ce client ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientService.delete(id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Client supprimé' });
                        this.loadClients();
                    },
                    error: (err) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur lors de la suppression' });
                    }
                });
            }
        });
    }
}

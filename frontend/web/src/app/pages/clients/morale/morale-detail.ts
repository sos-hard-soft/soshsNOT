import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { FileExplorerComponent } from '../../../components/file-explorer/file-explorer';
import { MessageService } from 'primeng/api';
import { ClientService } from '../../../services/client.service';
import { ClientMorale, Adresse } from '../../../models/client.model';

@Component({
    selector: 'app-morale-detail',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        FluidModule,
        ToastModule,
        TableModule,
        DialogModule,
        TextareaModule,
        TabsModule,
        FileExplorerComponent
    ],
    providers: [MessageService],
    templateUrl: './morale-detail.html'
})
export class MoraleDetailComponent implements OnInit {
    editMode = false;
    client: ClientMorale = {
        client_type: 'client_morale',
        isActive: true,
        ice: '',
        raisonSociale: '',
        isLotisseur: false,
        adresses: []
    } as any;

    // Address Dialog
    showAdresseDialog = false;
    newAdresse: Adresse = {
        adresse: '',
        ville: '',
        pays: 'Maroc',
        principale: false
    };

    iceExists = false;
    rcExists = false;
    ifExists = false;

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
        this.clientService.getMoraleById(id).subscribe({
            next: (data) => {
                this.client = data;
                this.cdr.detectChanges(); // Force update
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Client introuvable' });
                this.router.navigate(['/clients']);
            }
        });
    }

    checkIce() {
        if (!this.client.ice || this.editMode) return;
        this.clientService.checkIceExists(this.client.ice).subscribe(exists => {
            this.iceExists = exists;
        });
    }

    checkRc() {
        if (!this.client.rc) return;
        this.clientService.checkRcExists(this.client.rc).subscribe(exists => {
            this.rcExists = exists;
            // Warning only
        });
    }

    checkIf() {
        if (!this.client.identifiantFiscal) return;
        this.clientService.checkIfExists(this.client.identifiantFiscal).subscribe(exists => {
            this.ifExists = exists;
            // Warning only
        });
    }

    addAdresse() {
        if (!this.client.adresses) {
            this.client.adresses = [];
        }
        this.client.adresses.push({ ...this.newAdresse });
        this.newAdresse = { adresse: '', ville: '', pays: 'Maroc', principale: false };
        this.showAdresseDialog = false;
    }

    removeAdresse(index: number) {
        this.client.adresses?.splice(index, 1);
    }

    save() {
        if (this.iceExists) return;

        const payload = { ...this.client };

        if (this.editMode && payload.id) {
            this.clientService.updateMorale(payload.id, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Client mis à jour' });
                    setTimeout(() => this.router.navigate(['/clients']), 1000);
                },
                error: (err) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message })
            });
        } else {
            this.clientService.createMorale(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Client créé' });
                    setTimeout(() => this.router.navigate(['/clients']), 1000);
                },
                error: (err) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message })
            });
        }
    }

    cancel() {
        this.router.navigate(['/clients']);
    }
}

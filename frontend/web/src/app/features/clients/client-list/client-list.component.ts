import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ClientService } from '../../../core/services/client.service';
import { Client, ClientType } from '../../../core/models/client.model';
import { ClientSearchComponent } from '../client-search/client-search.component';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        TableModule,
        ButtonModule,
        CardModule,
        ClientSearchComponent
    ],
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

    clients: Client[] = [];
    ClientType = ClientType;

    constructor(
        private clientService: ClientService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadClients();
    }

    loadClients(): void {
        this.clientService.findAll().subscribe((data: Client[]) => {
            this.clients = data;
        });
    }

    onEdit(client: Client): void {
        this.router.navigate(['/clients', client.id, 'edit']);
    }

    onNew(): void {
        this.router.navigate(['/clients/new']);
    }
}

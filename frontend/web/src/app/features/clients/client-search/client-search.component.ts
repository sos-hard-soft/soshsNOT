import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-client-search',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule
    ],
    templateUrl: './client-search.component.html'
})
export class ClientSearchComponent {

    query = '';

    @Output()
    search = new EventEmitter<Client[]>();

    constructor(private clientService: ClientService) { }

    onSearch(): void {
        if (!this.query) {
            this.clientService.findAll().subscribe(r => this.search.emit(r));
            return;
        }

        this.clientService.search({ nom: this.query }).subscribe(r => {
            this.search.emit(r);
        });
    }
}

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(private message: MessageService) { }

    success(detail: string) {
        this.message.add({ severity: 'success', summary: 'Succès', detail });
    }

    error(detail: string) {
        this.message.add({ severity: 'error', summary: 'Erreur', detail });
    }
}

import { Client } from './client.model';

export enum ActeType {
    VENTE = 'VENTE',
    DONATION = 'DONATION',
    SUCCESSION = 'SUCCESSION',
    HYPOTHEQUE = 'HYPOTHEQUE'
}

export enum ActeStatus {
    DRAFT = 'DRAFT',
    SIGNED = 'SIGNED',
    ARCHIVED = 'ARCHIVED'
}

export interface Acte {
    id?: number;
    reference: string;
    type: ActeType;
    status: ActeStatus;
    dateActe: string;

    parties: ActePartie[];
    biens: ActeBien[];
}

export interface ActeCreateRequest {
    reference: string;
    type: ActeType;
    dateActe: string;
}

export interface ActePartie {
    role: 'VENDEUR' | 'ACQUEREUR' | 'DONATEUR' | 'DONATAIRE';
    client: Client;
}

export interface ActeBien {
    id?: number;
    designation: string;
}

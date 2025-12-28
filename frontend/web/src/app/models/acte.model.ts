export interface Acte {
    id?: string;
    numeroActe: string;
    type: string;
    dateActe: Date | string;
    dateReception?: string;
    cloture: boolean;
    parties?: ActePartie[];
}

export interface ActePartie {
    clientId: string;
    clientNom?: string;
    qualite: string;
}

export const ACTE_TYPES = [
    { label: 'Vente', value: 'VENTE' },
    { label: 'Donation', value: 'DONATION' },
    { label: 'Hypothèque', value: 'HYPOTHEQUE' },
    { label: 'Mainlevée', value: 'MAINLEVEE' },
    { label: 'Partage', value: 'PARTAGE' },
    { label: 'Constitution Société', value: 'CONSTITUTION_SOCIETE' },
    { label: 'Saisie', value: 'SAISIE' }
];

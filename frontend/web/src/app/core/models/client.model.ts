import { ClientType } from './enums';
export { ClientType };

export interface Client {
    id?: number;
    type: ClientType;

    // Personne physique
    firstName?: string;
    lastName?: string;
    cin?: string;

    // Personne morale
    raisonSociale?: string;
    rc?: string;
    ice?: string;

    email?: string;
    phone?: string;
}

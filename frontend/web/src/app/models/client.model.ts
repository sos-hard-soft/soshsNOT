export interface Adresse {
    id?: string;
    adresse: string;
    ville: string;
    pays: string;
    codePostal?: string;
    principale: boolean;
}

export interface Client {
    id?: string;
    client_type: string;
    isActive: boolean;
    legalBasis?: string;
    retentionPolicy?: string;
    createdAt?: string;
    updatedAt?: string;
    telephone?: string;
    email?: string;
    adresses?: Adresse[];
}

export interface ClientPhysique extends Client {
    cin: string;
    nom: string;
    prenom: string;
    nomAr?: string;
    prenomAr?: string;
    dateNaissance?: string;
    lieuNaissance?: string;
    nationalite?: string;
}

export interface ClientMorale extends Client {
    ice: string;
    raisonSociale: string;
    formeJuridique?: string;
    rc?: string;
    identifiantFiscal?: string;
    siegeSocial?: string;
    isLotisseur: boolean;
    numeroAgrementLotisseur?: string;
}

export interface Bien {
    id?: number;
    titreFoncier: string;
    adresse: string;

    // Prévu pour SN-GIS
    latitude?: number;
    longitude?: number;
}

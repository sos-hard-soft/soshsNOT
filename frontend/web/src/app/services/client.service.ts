import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, ClientPhysique, ClientMorale } from '../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = 'http://localhost:8081/api/clients';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl);
    }

    // Physiques
    getAllPhysiques(): Observable<ClientPhysique[]> {
        return this.http.get<ClientPhysique[]>(`${this.apiUrl}/physiques`);
    }

    getPhysiqueById(id: string): Observable<ClientPhysique> {
        return this.http.get<ClientPhysique>(`${this.apiUrl}/physiques/${id}`);
    }

    createPhysique(client: ClientPhysique): Observable<any> {
        return this.http.post(`${this.apiUrl}/physiques`, client);
    }

    updatePhysique(id: string, client: ClientPhysique): Observable<any> {
        return this.http.put(`${this.apiUrl}/physiques/${id}`, client);
    }

    autocompletePhysique(query: string): Observable<ClientPhysique[]> {
        return this.http.get<ClientPhysique[]>(`${this.apiUrl}/physiques/autocomplete`, { params: { q: query } });
    }

    checkCinExists(cin: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/physiques/check-cin`, { params: { cin } });
    }

    // Morales
    getAllMorales(): Observable<ClientMorale[]> {
        return this.http.get<ClientMorale[]>(`${this.apiUrl}/morales`);
    }

    getMoraleById(id: string): Observable<ClientMorale> {
        return this.http.get<ClientMorale>(`${this.apiUrl}/morales/${id}`);
    }

    createMorale(client: ClientMorale): Observable<any> {
        return this.http.post(`${this.apiUrl}/morales`, client);
    }

    updateMorale(id: string, client: ClientMorale): Observable<any> {
        return this.http.put(`${this.apiUrl}/morales/${id}`, client);
    }

    autocompleteMorale(query: string): Observable<ClientMorale[]> {
        return this.http.get<ClientMorale[]>(`${this.apiUrl}/morales/autocomplete`, { params: { q: query } });
    }

    checkIceExists(ice: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/morales/check-ice`, { params: { ice } });
    }

    checkRcExists(rc: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/morales/check-rc`, { params: { rc } });
    }

    checkIfExists(identifiantFiscal: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/morales/check-if`, { params: { if: identifiantFiscal } });
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    deactivate(id: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/deactivate`, {});
    }
}

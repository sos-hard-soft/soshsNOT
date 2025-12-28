import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acte } from '../models/acte.model';

@Injectable({
    providedIn: 'root'
})
export class ActeService {
    private apiUrl = 'http://localhost:8081/api/actes';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Acte[]> {
        return this.http.get<Acte[]>(this.apiUrl);
    }

    getById(id: string): Observable<Acte> {
        return this.http.get<Acte>(`${this.apiUrl}/${id}`);
    }

    create(acte: Partial<Acte>): Observable<any> {
        return this.http.post(this.apiUrl, acte);
    }

    update(id: string, acte: Partial<Acte>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, acte);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    cloturer(id: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/cloture`, {});
    }

    addPartie(acteId: string, clientId: string, qualite: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/${acteId}/parties`, {}, {
            params: { clientId, qualite }
        });
    }
}

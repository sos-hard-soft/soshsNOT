import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acte, ActeCreateRequest } from '../models/acte.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActeService {

    private readonly apiUrl = '/api/registry/actes';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Acte[]> {
        return this.http.get<Acte[]>(this.apiUrl);
    }

    getById(id: number): Observable<Acte> {
        return this.http.get<Acte>(`${this.apiUrl}/${id}`);
    }

    create(payload: ActeCreateRequest): Observable<Acte> {
        return this.http.post<Acte>(this.apiUrl, payload);
    }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { CLIENT_API } from '../api/client.api';

@Injectable({ providedIn: 'root' })
export class ClientService {

    constructor(private http: HttpClient) { }

    findAll(): Observable<Client[]> {
        return this.http.get<Client[]>(CLIENT_API.BASE);
    }

    findById(id: number): Observable<Client> {
        return this.http.get<Client>(`${CLIENT_API.BASE}/${id}`);
    }

    create(client: Client): Observable<Client> {
        return this.http.post<Client>(CLIENT_API.BASE, client);
    }

    update(id: number, client: Client): Observable<Client> {
        return this.http.put<Client>(`${CLIENT_API.BASE}/${id}`, client);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${CLIENT_API.BASE}/${id}`);
    }

    search(params: {
        cin?: string;
        nom?: string;
        raisonSociale?: string;
    }): Observable<Client[]> {
        let httpParams = new HttpParams();
        Object.entries(params).forEach(([k, v]) => {
            if (v) httpParams = httpParams.set(k, v);
        });

        return this.http.get<Client[]>(CLIENT_API.SEARCH, { params: httpParams });
    }
}

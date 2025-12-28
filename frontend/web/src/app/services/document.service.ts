import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentDTO {
    fileName: string;
    size: number;
    contentType: string;
    lastModified: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private apiUrl = 'http://localhost:8081/api/documents';

    constructor(private http: HttpClient) { }

    listDocuments(clientId: string): Observable<DocumentDTO[]> {
        return this.http.get<DocumentDTO[]>(`${this.apiUrl}/client/${clientId}`);
    }

    uploadDocument(clientId: string, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/client/${clientId}/upload`, formData);
    }

    deleteDocument(clientId: string, fileName: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/client/${clientId}/${fileName}`);
    }
}

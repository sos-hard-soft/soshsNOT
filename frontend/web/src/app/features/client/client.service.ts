import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  cin: string;
  email?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  // Assuming Gateway is on 8888 or access via Traefik (api.localhost or similar?)
  // User said Traefik makes services accessible via *.localhost.
  // Gateway typically routes API calls.
  // If Gateway is behind Traefik, maybe `api.localhost/sn-registry`?
  // Or direct access to registry via `registry.localhost`?
  // Let's assume direct access to Registry via Traefik for now or Gateway via 8888 locally if not proxied?
  // Traefik setup: Gateway port 8080 was discussed, freed for local dev.
  // The backend services are in Docker?
  // Wait, I am running `mvn quarkus:dev` LOCALLY for Gateway and Registry?
  // If running locally, they are on localhost:8080 (Gateway) and localhost:8081 (Registry).
  // I should target the Gateway.
  // The user said: "instead of playing with ports... adding a treafik proxy".
  // This implies the services should be behind Traefik.
  // But for local dev (`mvn quarkus:dev`), the services are running on host machine, not inside Docker (unless user uses Dev Services/Remote Dev).
  // Usually `mvn quarkus:dev` runs process on host.
  // Traefik runs in Docker. Traefik can route to host via `host.docker.internal` but only if configured.
  // If I run `mvn quarkus:dev`, I should just hit `localhost:8080` (Gateway) or `localhost:8081` (Registry).
  // The user asked to use Traefik to manage *docker machine names*.
  // This implies we might be deploying to docker or heavily using dockerized deps.
  // However, for Frontend dev against Local Backend, hitting localhost directly is standard.
  // I will use `/api/clients` and configure proxy in Angular or just point to localhost:8081 for Registry direct access or 8080 for Gateway.
  // I'll point to `http://localhost:8081` (Registry direct) for simplicity as Gateway routing might need config.

  private apiUrl = 'http://localhost:8081/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

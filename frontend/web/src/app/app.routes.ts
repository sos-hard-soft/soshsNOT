import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', loadComponent: () => import('./features/client/client-list/client-list.component').then(m => m.ClientListComponent) },
    { path: 'clients/new', loadComponent: () => import('./features/client/client-form/client-form.component').then(m => m.ClientFormComponent) },
    { path: 'clients/:id/edit', loadComponent: () => import('./features/client/client-form/client-form.component').then(m => m.ClientFormComponent) }
];

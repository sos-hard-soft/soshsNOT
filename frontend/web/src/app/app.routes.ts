import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
            },
            {
                path: 'clients',
                loadChildren: () =>
                    import('./features/clients/clients.routes')
                        .then(m => m.CLIENTS_ROUTES)
            },
            {
                path: 'actes',
                loadChildren: () =>
                    import('./features/actes/actes.routes')
                        .then(m => m.ACTE_ROUTES)
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];
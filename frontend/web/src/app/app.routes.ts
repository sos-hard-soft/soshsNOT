import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/layout/layout').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
            },
            {
                path: 'actes',
                loadComponent: () => import('./pages/actes/actes').then(m => m.ActesComponent)
            },
            {
                path: 'actes/nouveau',
                loadComponent: () => import('./pages/actes/create/acte-create').then(m => m.ActeCreateComponent)
            },
            {
                path: 'actes/modifier/:id',
                loadComponent: () => import('./pages/actes/create/acte-create').then(m => m.ActeCreateComponent)
            },
            {
                path: 'actes/:id',
                loadComponent: () => import('./pages/actes/view/acte-view').then(m => m.ActeViewComponent)
            },
            {
                path: 'clients',
                loadComponent: () => import('./pages/clients/clients').then(m => m.ClientsComponent)
            },
            {
                path: 'clients/physique/nouveau',
                loadComponent: () => import('./pages/clients/physique/physique-detail').then(m => m.PhysiqueDetailComponent)
            },
            {
                path: 'clients/physique/:id',
                loadComponent: () => import('./pages/clients/physique/physique-detail').then(m => m.PhysiqueDetailComponent)
            },
            {
                path: 'clients/morale/nouveau',
                loadComponent: () => import('./pages/clients/morale/morale-detail').then(m => m.MoraleDetailComponent)
            },
            {
                path: 'clients/morale/:id',
                loadComponent: () => import('./pages/clients/morale/morale-detail').then(m => m.MoraleDetailComponent)
            },
            {
                path: 'biens',
                loadComponent: () => import('./pages/biens/biens').then(m => m.BiensComponent)
            }
        ]
    }
];

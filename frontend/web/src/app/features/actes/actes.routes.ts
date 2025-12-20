import { Routes } from '@angular/router';

export const ACTE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./acte-list/acte-list.component')
                .then(m => m.ActeListComponent)
    },
    {
        path: 'new',
        loadComponent: () =>
            import('./acte-form/acte-form.component')
                .then(m => m.ActeFormComponent)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./acte-detail/acte-detail.component')
                .then(m => m.ActeDetailComponent)
    }
];

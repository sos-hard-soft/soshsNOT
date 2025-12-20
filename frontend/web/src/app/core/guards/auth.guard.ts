import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const isAuthenticated = true; // futur JWT

    if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};

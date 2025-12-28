import { Injectable, signal, computed, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly LANG_KEY = 'selected_language';

    currentLang = signal<string>('fr');

    isRtl = computed(() => this.currentLang() === 'ar');

    constructor(
        private translate: TranslateService,
        private primeConfig: PrimeNG
    ) {
        this.initLanguage();

        // Effect to handle direction changes
        effect(() => {
            const dir = this.isRtl() ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', dir);
            document.documentElement.setAttribute('lang', this.currentLang());

            // Update PrimeNG configuration if needed (though global dir usually suffices)
            // this.primeConfig.ripple.set(true); 
        });
    }

    private initLanguage() {
        const savedLang = localStorage.getItem(this.LANG_KEY);
        const browserLang = this.translate.getBrowserLang();
        const defaultLang = savedLang || (browserLang?.match(/fr|ar/) ? browserLang : 'fr');

        this.setLanguage(defaultLang);
    }

    setLanguage(lang: string) {
        this.translate.use(lang);
        this.currentLang.set(lang);
        localStorage.setItem(this.LANG_KEY, lang);

        // Should also load PrimeNG translations if available
        this.updatePrimeNGTranslations(lang);
    }

    toggleLanguage() {
        const newLang = this.currentLang() === 'fr' ? 'ar' : 'fr';
        this.setLanguage(newLang);
    }

    private updatePrimeNGTranslations(lang: string) {
        this.translate.get('PRIMENG').subscribe(res => {
            if (res) {
                this.primeConfig.setTranslation(res);
            }
        });
    }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Acte } from '../../../core/models/acte.model';

@Component({
    selector: 'app-acte-biens',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './acte-biens.component.html'
})
export class ActeBiensComponent {
    @Input() acte!: Acte;
}

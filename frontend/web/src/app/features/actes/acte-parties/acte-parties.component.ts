import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Acte } from '../../../core/models/acte.model';

@Component({
    selector: 'app-acte-parties',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './acte-parties.component.html'
})
export class ActePartiesComponent {
    @Input() acte!: Acte;
}

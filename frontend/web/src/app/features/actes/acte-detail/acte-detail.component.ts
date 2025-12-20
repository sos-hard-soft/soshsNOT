import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ActeService } from '../../../core/services/acte.service';
import { Acte } from '../../../core/models/acte.model';
import { ActePartiesComponent } from '../acte-parties/acte-parties.component';
import { ActeBiensComponent } from '../acte-biens/acte-biens.component';

@Component({
    selector: 'app-acte-detail',
    standalone: true,
    imports: [
        CommonModule,
        TabsModule,
        ActePartiesComponent,
        ActeBiensComponent
    ],
    templateUrl: './acte-detail.component.html'
})
export class ActeDetailComponent implements OnInit {

    acte!: Acte;

    constructor(
        private route: ActivatedRoute,
        private acteService: ActeService
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params['id'];
        this.acteService.getById(id).subscribe(a => this.acte = a);
    }
}

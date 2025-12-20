import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { ClientType } from '../../../core/models/enums';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-client-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        InputTextModule,
        ButtonModule,
        Select,
        CardModule
    ],
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

    form!: FormGroup;
    clientId?: number;
    clientTypes = [
        { label: 'Personne physique', value: ClientType.PHYSIQUE },
        { label: 'Personne morale', value: ClientType.MORALE }
    ];

    constructor(
        private fb: FormBuilder,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            type: [ClientType.PHYSIQUE, Validators.required],
            firstName: [''],
            lastName: [''],
            cin: [''],
            raisonSociale: [''],
            ice: [''],
            email: [''],
            phone: ['']
        });

        const id = this.route.snapshot.params['id'];
        if (id) {
            this.clientId = +id;
            this.clientService.findById(this.clientId).subscribe(c => {
                this.form.patchValue(c);
            });
        }
    }

    submit(): void {
        if (this.form.invalid) return;

        const action = this.clientId
            ? this.clientService.update(this.clientId, this.form.value)
            : this.clientService.create(this.form.value);

        action.subscribe(() => this.router.navigate(['/clients']));
    }
}

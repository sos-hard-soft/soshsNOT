import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ActeService } from '../../../core/services/acte.service';
import { ActeType } from '../../../core/models/acte.model';

@Component({
    selector: 'app-acte-form',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AutoCompleteModule,
        ButtonModule,
        CardModule,
        Select,
        DatePicker,
        InputTextModule
    ],
    templateUrl: './acte-form.component.html'
})
export class ActeFormComponent {

    acteTypes = Object.values(ActeType);

    form = this.fb.group({
        reference: this.fb.nonNullable.control('', Validators.required),
        type: this.fb.nonNullable.control<ActeType | null>(null, Validators.required),
        dateActe: this.fb.nonNullable.control('', Validators.required)
    });

    constructor(
        private fb: FormBuilder,
        private acteService: ActeService,
        private router: Router
    ) { }

    get f() {
        return this.form.controls;
    }

    submit(): void {
        if (this.form.invalid) return;

        const payload = this.form.value as {
            reference: string;
            type: ActeType;
            dateActe: string;
        };

        this.acteService.create(payload).subscribe(acte => {
            this.router.navigate(['/actes', acte.id]);
        });
    }

    cancel(): void {
        this.router.navigate(['/actes']);
    }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-biens',
    standalone: true,
    imports: [CommonModule, TableModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h2>Biens Immobiliers</h2>
      </div>
      <p-table [value]="[]">
        <ng-template pTemplate="header">
          <tr>
            <th>Titre Foncier</th>
            <th>Type</th>
            <th>Localisation</th>
            <th>Status</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="4" class="text-center p-8">No real estate properties registered.</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class BiensComponent { }

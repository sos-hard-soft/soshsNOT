import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, CardModule, ChartModule, TableModule, ButtonModule, TagModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
    stats = signal([
        { label: 'Total Actes', value: '0', icon: 'pi pi-file', color: 'blue' },
        { label: 'New Clients', value: '0', icon: 'pi pi-user-plus', color: 'green' },
        { label: 'Pending Docs', value: '0', icon: 'pi pi-clock', color: 'orange' },
        { label: 'Revenue', value: '0', icon: 'pi pi-wallet', color: 'purple' }
    ]);

    recentActes = signal<any[]>([]);

    chartData: any;
    chartOptions: any;

    ngOnInit() {
        this.recentActes.set([
            { id: 'ACT-001', client: 'Ahmed Alaoui', type: 'Vente', date: '2025-12-20', status: 'Completed' },
            { id: 'ACT-002', client: 'Société IMMO', type: 'Hypothèque', date: '2025-12-21', status: 'Pending' }
        ]);

        this.chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Actes Created',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: true,
                    borderColor: '#4f46e5',
                    tension: 0.4,
                    backgroundColor: 'rgba(79, 70, 229, 0.1)'
                }
            ]
        };
    }

    getSeverity(status: string) {
        switch (status) {
            case 'Completed': return 'success';
            case 'Pending': return 'info';
            case 'In Review': return 'warn';
            default: return 'secondary';
        }
    }
}

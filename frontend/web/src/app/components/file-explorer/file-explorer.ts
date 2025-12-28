import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DocumentService, DocumentDTO } from '../../services/document.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
    selector: 'app-file-explorer',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        FileUploadModule,
        DialogModule,
        TooltipModule,
        ToastModule,
        SafePipe
    ],
    providers: [MessageService],
    templateUrl: './file-explorer.html',
    styleUrl: './file-explorer.css'
})
export class FileExplorerComponent implements OnInit {
    @Input() clientId!: string;

    documents = signal<DocumentDTO[]>([]);
    loading = signal<boolean>(false);

    previewVisible = signal<boolean>(false);
    selectedDoc = signal<DocumentDTO | null>(null);

    constructor(
        private documentService: DocumentService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        if (this.clientId) {
            this.loadFiles();
        }
    }

    loadFiles() {
        this.loading.set(true);
        this.documentService.listDocuments(this.clientId).subscribe({
            next: (files) => {
                this.documents.set(files);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error loading files:', err);
                this.loading.set(false);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les fichiers' });
            }
        });
    }

    onUpload(event: any) {
        const file = event.files[0];
        this.documentService.uploadDocument(this.clientId, file).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Fichier uploadé avec succès' });
                this.loadFiles();
            },
            error: (err) => {
                console.error('Upload error:', err);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'upload' });
            }
        });
    }

    deleteFile(doc: DocumentDTO) {
        if (confirm(`Voulez-vous vraiment supprimer le fichier ${doc.fileName} ?`)) {
            this.documentService.deleteDocument(this.clientId, doc.fileName).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Fichier supprimé' });
                    this.loadFiles();
                },
                error: (err) => {
                    console.error('Delete error:', err);
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression' });
                }
            });
        }
    }

    previewFile(doc: DocumentDTO) {
        this.selectedDoc.set(doc);
        this.previewVisible.set(true);
    }

    isImage(doc: DocumentDTO): boolean {
        const ext = doc.fileName.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
    }

    isPdf(doc: DocumentDTO): boolean {
        return doc.fileName.toLowerCase().endsWith('.pdf');
    }

    formatSize(bytes: number): string {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

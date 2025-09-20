import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ModelService } from '../../../services/airline/model.service';
import { Model, NewModel } from '../../../models/airline/model.model';
import { AuthService } from '../../../services/auth.service';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-models',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css',
  standalone: true
})
export class ModelsComponent implements OnInit{

  showModal = false;
  models: Model[] = [];
  selectedModel: Model | null = null;
  showManage = false;
  airlineid: number | null = null;
  newModel: NewModel | null = null;
  newModelForm: FormGroup;
  evenNumbers = [2, 4, 6, 8];
  showEdit = false;
  editModelForm!: FormGroup;
  previewExtraLegEdit: number[] = [];

  constructor(private modelService: ModelService, private authService: AuthService, private fb: FormBuilder) {
    this.newModelForm = this.fb.group({
      name: ['', Validators.required],
      firstclass: ['', [Validators.required, Validators.min(0)]],
      rowb: ['', [Validators.required, Validators.min(0)]],
      colb: ['', [Validators.required, Validators.min(0)]],
      rowe: ['', [Validators.required, Validators.min(0)]],
      cole: ['', [Validators.required, Validators.min(0)]],
      extraleg: ['', Validators.pattern(/^(\s*\d+\s*,)*\s*\d+\s*$/)]
    });
    this
   }
    

  ngOnInit(): void {
    this.airlineid = this.authService.getId();
    if (this.airlineid) {
      this.loadModels();
    } else {
      console.error('ID compagnia aerea non trovato');
    }
  }

  private loadModels(): void {
    this.modelService.getModels().subscribe({
      next: (models) => this.models = models,
      error: (err) => console.error('Errore caricamento modelli', err)
    });
  }

  addModel(): void {
    if (this.newModelForm.invalid) return;

    const f = this.newModelForm.value;

    this.newModel = {
      Name: f.name,
      SeatsPC: f.firstclass,
      RowsB: f.rowb,
      ColumnsB: f.colb,
      RowsE: f.rowe,
      ColumnsE: f.cole,
      ExtraLegRows: this.parseExtraLegRows(f.extraleg)
    }
      

    this.modelService.addModel(this.newModel).subscribe({
      next: () => {
        alert('Nuovo modello creato');
        this.closeCreate();
        this.loadModels();
      },
      error: (err) => console.error('Errore creazione modello', err)
    });
  }

  closeCreate(): void {
    this.showModal = false;
    this.newModelForm.reset();
    this.newModelForm.reset({ name: '', firstclass: null, rowb: null, colb: '', rowe: null, cole: '', extraleg: null });
  }

  parseExtraLegRows(raw: string): number[] {
    if (!raw || typeof raw !== 'string') return [];

    const result: number[] = [];
    const parts = raw.split(',');

    for (const part of parts) {
      const trimmed = part.trim();
      if (!/^\d+$/.test(trimmed)) break; // stop al primo non numero
      result.push(Number(trimmed));
    }

    return result;
  }


  get previewExtraLeg(): number[] {
    const raw = this.newModelForm.get('extraleg')?.value;
    return this.parseExtraLegRows(raw);
  }

  gestisci(model: Model): void {
    this.selectedModel = model;
    this.showManage = true;
  }

  closeManage(): void {
    this.showManage = false;
    this.selectedModel = null;
  }

  openEdit(selected:Model): void{

  }
}

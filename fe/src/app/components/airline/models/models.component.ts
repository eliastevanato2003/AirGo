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
  filterForm: FormGroup;

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

    this.filterForm= this.fb.group({
      id:['', Validators.min(0)],
      name: ['']
    })
   }
    

  ngOnInit(): void {
    this.airlineid = this.authService.getId();
    if (this.airlineid) {
      this.loadModels();
    } else {
      console.error('ID compagnia aerea non trovato');
    }
  }

  private loadModels(filters:any={}): void {
    this.modelService.getModels(filters).subscribe({
      next: (models) => this.models = models,
      error: (err) => console.error('Errore caricamento modelli', err)
    });
  }

  addModel(): void {
    if (this.newModelForm.invalid) return;

    const f = this.newModelForm.value;

    this.newModel = {
      name: f.name,
      seatspc: f.firstclass,
      rowsb: f.rowb,
      columnsb: f.colb,
      rowse: f.rowe,
      columnse: f.cole,
      extralegrows: this.parseExtraLegRows(f.extraleg)
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

  openEdit(): void {
    if(!this.selectedModel)return;    
    
    this.editModelForm = this.fb.group({
      name: [this.selectedModel.Nome || '', Validators.required],
      seatspc: [this.selectedModel.PostiPc || 0, [Validators.required, Validators.min(0)]],
      rowsb: [this.selectedModel.RigheB || 0, [Validators.required, Validators.min(0)]],
      columnsb: [this.selectedModel.ColonneB || '', [Validators.required]],
      rowse: [this.selectedModel.RigheE || 0, [Validators.required, Validators.min(0)]],
      columnse: [this.selectedModel.ColonneE || '', [Validators.required]],
      extralegrows: [this.getExtraLegString(this.selectedModel) || '', Validators.pattern(/^(\s*\d+\s*,)*\s*\d+\s*$/)]
    });
    this.showEdit = true;
  }

  get previewExtraLegEdit(): number[] {
    const raw = this.editModelForm.get('extralegrows')?.value;
    return this.parseExtraLegRows(raw);
  }


  saveEdit(): void {
    if (!this.selectedModel || this.editModelForm.invalid) return;

    const f = this.editModelForm.value;

    const updatedModel: any = {};

    if (f.name !== this.selectedModel.Nome) {
      updatedModel.name = f.name;
    }
    if (f.seatspc !== this.selectedModel.PostiPc) {
      updatedModel.seatspc = f.seatspc;
    }
    if (f.rowsb !== this.selectedModel.RigheB) {
      updatedModel.rowsb = f.rowsb;
    }
    if (f.columnsb !== this.selectedModel.ColonneB) {
      updatedModel.columnsb = f.columnsb;
    }
    if (f.rowse !== this.selectedModel.RigheE) {
      updatedModel.rowse = f.rowse;
    }
    if (f.columnse !== this.selectedModel.ColonneE) {
      updatedModel.columnse = f.columnse;
    }

    const newExtraLeg = this.parseExtraLegRows(f.extralegrows);
    const oldExtraLeg = (this.selectedModel.RigheExtraLeg || []).map(r => r.NRiga);

    if (JSON.stringify(newExtraLeg) !== JSON.stringify(oldExtraLeg)) {
      updatedModel.extralegrows = newExtraLeg;
    }

    if (Object.keys(updatedModel).length === 0) {
      this.closeEdit();
      return;
    }

    this.modelService.updateModel(this.selectedModel.IdModello, updatedModel).subscribe({
      next: () => {
        alert('Modello aggiornato con successo');
        this.closeEdit();
        this.filtra(); 
        this.closeManage();
      },
      error: (err) => {
        console.error('Errore aggiornamento modello', err);
        alert(err.error?.message || 'Errore durante l\'aggiornamento');
      }
    });
  }


  closeEdit(): void {
    this.showEdit = false;
    this.editModelForm.reset();
  }

  getExtraLegString(model: Model | null): string {
    if (!model || !model.RigheExtraLeg || model.RigheExtraLeg.length === 0) return '';
    return model.RigheExtraLeg.map(r => r.NRiga).join(', ');
  }

  filtra(): void {
    const filters = { ...this.filterForm.value };

    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    this.loadModels(filters);
  }

  reset(): void {
    this.filterForm.reset();
    this.loadModels();
  }


}

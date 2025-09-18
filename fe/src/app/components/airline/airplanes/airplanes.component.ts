import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaneService } from '../../../services/airline/plane.service';
import { ModelService } from '../../../services/airline/model.service';
import { Plane } from '../../../models/airline/plane.model';
import { filter } from 'rxjs/operators';
import { Model } from '../../../models/airline/model.model';


@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css'],
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  standalone: true
})
export class AirplanesComponent implements OnInit {

  airplanes: Plane[] = [];
  models: Model[] = [];
  showModal = false;
  creatingNewModel = false;
  evenNumbers = [2, 4, 6, 8];
  airlineId: number | null = null;

  newPlaneForm: FormGroup;
  newModelForm: FormGroup;

  constructor(
    private authService: AuthService,
    private planeService: PlaneService,
    private modelService: ModelService,
    private fb: FormBuilder,
  ) {
    this.newPlaneForm = this.fb.group({
      model: ['', Validators.required],
      constructionyear: ['', [Validators.required, Validators.min(1900)]]
    });
    this.newModelForm = this.fb.group({
      name: ['', Validators.required],
      firstclass: ['', [Validators.required, Validators.min(0)]],
      rowb: ['', [Validators.required, Validators.min(0)]],
      colb: ['', [Validators.required, Validators.min(0)]],
      rowe: ['', [Validators.required, Validators.min(0)]],
      cole: ['', [Validators.required, Validators.min(0)]],
      extraleg: ['']
    });
  }

  ngOnInit(): void {
    this.airlineId = this.authService.getId();

    if (this.airlineId) {
      this.loadPlanes();
      this.loadModels();
    } else {
      this.authService.whatId()
        .pipe(filter(id => id !== null))
        .subscribe(id => {
          this.airlineId = id!;
          this.loadPlanes();
          this.loadModels();
        });
    }
  }

  private loadPlanes(): void {
    if (!this.airlineId) return;
    this.planeService.getPlanesByAirline(this.airlineId).subscribe({
      next: (planes) => this.airplanes = planes,
      error: (err) => console.error('Errore caricamento aerei', err)
    });
  }

  private loadModels(): void {
    this.modelService.getModels().subscribe({
      next: (models) => this.models = models,
      error: (err) => console.error('Errore caricamento modelli', err)
    });
  }

  addPlane(): void {
    if (this.newPlaneForm.invalid) return;

    const form = this.newPlaneForm.value;

    this.planeService.addPlane(form.model, form.constructionyear).subscribe({
      next: () => {
        alert('Nuovo aereo creato');
        this.closeModal();
        this.loadPlanes();
      },
      error: (err) => console.error('Errore creazione aereo', err)
    });
  }

  addModel(): void {
    if (this.newModelForm.invalid) return;

    const f = this.newModelForm.value;
    const extralegrows = f.extraleg
      ? f.extraleg.split(',').map((n: string) => Number(n.trim()))
      : [];

    this.modelService.addModel(
      f.name,
      f.firstclass,
      f.rowb,
      f.colb,
      f.rowe,
      f.cole,
      extralegrows
    ).subscribe({
      next: () => {
        alert('Nuovo modello creato');
        this.closeCreate();
        this.loadModels();
      },
      error: (err) => console.error('Errore creazione modello', err)
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.newPlaneForm.reset();
    this.newPlaneForm.reset({ model: '', constructionyear: null });
  }

  closeCreate(): void {
    this.creatingNewModel = false;
    this.newModelForm.reset();
    this.newModelForm.reset({ name: '', firstclass: null, rowb: null, colb: '', rowe: null, cole: '', extraleg: null });
  }

  create(): void {
    this.creatingNewModel = true;
    this.newPlaneForm.reset();
    this.newPlaneForm.reset({ model: '', constructionyear: null });
  }
}

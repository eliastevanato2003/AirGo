import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { UserService } from '../../../services/admin/user.service';
import { User } from '../../../models/admin/user.model';
import { AuthService } from '../../../services/auth.service';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminusers',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css',
  standalone: true
})
export class AdminusersComponent implements OnInit{
  showModal = false;
  users: User[] = [];
  selectedUser: User | null = null;
  showManage = false;
  showEdit = false;
  filterForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private fb: FormBuilder) {
    const token=this.authService.getToken();
    if(!token){
      this.router.navigate(['/login']);
    }

    this.filterForm= this.fb.group({
      id:['', Validators.min(0)],
      name: [''],
      surname: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
      this.loadUsers();
  }

  private loadUsers(filters:any={}): void {
    this.userService.getUsers(filters).subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Errore caricamento utenti', err)
    });
  }
  
  gestisci(user: User): void {
      this.selectedUser = user;
      this.showManage = true;
    }
  
    closeManage(): void {
      this.showManage = false;
      this.selectedUser = null;
    }

    deleteUser(userid: number) {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
      this.userService.deleteUser(userid).subscribe({
        next: (res) => {
          alert('Utente eliminato con successo');
          this.filtra();
          this.closeManage();
        },
        error: (err) => {
          console.error('Errore eliminazione utente', err);
          alert(err.error?.message || 'Errore durante l\'eliminazione');
        }
      });
    }
  }

  filtra(): void {
    const filters = { ...this.filterForm.value };

    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    this.loadUsers(filters);
  }

  reset(): void {
    this.filterForm.reset();
    this.loadUsers();
  }

}

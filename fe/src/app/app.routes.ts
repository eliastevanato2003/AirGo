import { Routes } from '@angular/router';
import { FlightsComponent } from './components/user/flights/flights.component';
import { UserLoginComponent } from './components/auth/user-login/user-login.component';
import { UserSignupComponent } from './components/auth/user-signup/user-signup.component';
import { BaggageSelectionComponent } from './components/user/baggage-selection/baggage-selection.component';
import { FlightsListComponent } from './components/user/flightslist/flightslist.component';
import { SeatSelectionComponent } from './components/user/seat-selection/seat-selection.component';
import { TicketSummaryComponent } from './components/user/ticket-summary/ticket-summary.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { AirlineProfileComponent } from './components/airline/airline-profile/airline-profile.component';
import { PasswordComponent } from './components/airline/password/password.component';
import { AirlineFlightsComponent } from './components/airline/airlineflights/airlineflights.component';
import { AirplanesComponent } from './components/airline/airplanes/airplanes.component';
import { AirlinesComponent } from './components/admin/airlines/airlines.component';
import { ModelsComponent } from './components/airline/models/models.component';
import { RoutesComponent } from './components/airline/routes/routes.component';

export const routes: Routes = [
    { path: '', component: FlightsComponent},
    { path: 'login', component: UserLoginComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'flightslist', component: FlightsListComponent },
    { path: 'seatselection', component: SeatSelectionComponent },
    { path: 'baggageselection', component: BaggageSelectionComponent },
    { path: 'ticketsummary', component: TicketSummaryComponent },
    { path: 'airplanes', component: AirplanesComponent },
    { path: 'admin-airlines', component: AirlinesComponent },
    { path: 'airline-profile', component: AirlineProfileComponent },
    { path: 'password', component: PasswordComponent },
    { path: 'airline-flights', component: AirlineFlightsComponent },
    { path: 'models', component: ModelsComponent },
    { path: 'routes', component: RoutesComponent }
];

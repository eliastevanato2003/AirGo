import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/auth/user-login/user-login.component';
import { UserSignupComponent } from './components/auth/user-signup/user-signup.component';
import { FlightsComponent } from './components/user/flights/flights.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FlightsListComponent } from './components/user/flightslist/flightslist.component';
import { AirplanesComponent } from './components/airline/airplanes/airplanes.component';
import { AirlinesComponent } from './components/admin/airlines/airlines.component';
import { SeatSelectionComponent } from './components/user/seat-selection/seat-selection.component';
import { BaggageSelectionComponent } from './components/user/baggage-selection/baggage-selection.component';
import { TicketSummaryComponent } from './components/user/ticket-summary/ticket-summary.component';
import { AirlineProfileComponent } from './components/airline/airline-profile/airline-profile.component';

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
    { path: 'airline-profile', component: AirlineProfileComponent }
];

import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/auth/user-login/user-login.component';
import { UserSignupComponent } from './components/auth/user-signup/user-signup.component';
import { FlightsComponent } from './components/user/flights/flights.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FlightsListComponent } from './components/user/flightslist/flightslist.component';
import { BuyticketComponent } from './components/user/buyticket/buyticket.component';
import { AirplanesComponent } from './components/airline/airplanes/airplanes.component';
import { AirlinesComponent } from './components/admin/airlines/airlines.component';
import { AirlineProfileComponent } from './components/airline/airline-profile/airline-profile.component';

export const routes: Routes = [
    { path: '', component: FlightsComponent},
    { path: 'login', component: UserLoginComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'flightslist', component: FlightsListComponent },
    { path: 'buyticket', component: BuyticketComponent},
    { path: 'airplanes', component: AirplanesComponent },
    { path: 'admin-airlines', component: AirlinesComponent },
    { path: 'airline-profile', component: AirlineProfileComponent }
];

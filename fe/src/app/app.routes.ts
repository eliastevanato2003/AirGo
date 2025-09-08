import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FlightsComponent } from './flights/flights.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FlightsListComponent } from './flightslist/flightslist.component';
import { BuyticketComponent } from './buyticket/buyticket.component';
import { AirplanesComponent } from './airplanes/airplanes.component';

export const routes: Routes = [
    { path: '', component: FlightsComponent},
    { path: 'login', component: UserLoginComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'flightslist', component: FlightsListComponent },
    { path: 'buyticket', component: BuyticketComponent},
    { path: 'airplanes', component: AirplanesComponent }
];

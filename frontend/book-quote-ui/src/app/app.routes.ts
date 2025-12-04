import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BooksComponent } from './components/books/books.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'books', component: BooksComponent, canActivate: [authGuard] },
    { path: 'quotes', component: QuotesComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];

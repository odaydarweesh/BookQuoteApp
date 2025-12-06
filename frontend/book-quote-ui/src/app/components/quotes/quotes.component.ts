import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesService, Quote } from '../../services/quotes.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-quotes',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './quotes.component.html',
    styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
    quotes: Quote[] = [];
    showForm = false;
    editMode = false;
    currentQuoteId: number | null = null;
    isLoading = false;

    quoteForm = {
        text: '',
        author: ''
    };

    constructor(
        private quotesService: QuotesService,
        private authService: AuthService,
        private router: Router,
        public themeService: ThemeService
    ) { }

    ngOnInit(): void {
        this.loadQuotes();
    }

    loadQuotes(): void {
        this.isLoading = true;
        this.quotesService.getQuotes().subscribe({
            next: (quotes) => {
                this.quotes = quotes;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading quotes', err);
                this.isLoading = false;
            }
        });
    }

    toggleForm(): void {
        this.showForm = !this.showForm;
        if (!this.showForm) {
            this.resetForm();
        }
    }

    resetForm(): void {
        this.quoteForm = { text: '', author: '' };
        this.editMode = false;
        this.currentQuoteId = null;
    }

    onSubmit(): void {
        if (this.editMode && this.currentQuoteId) {
            this.quotesService
                .updateQuote(this.currentQuoteId, this.quoteForm)
                .subscribe({
                    next: () => {
                        this.loadQuotes();
                        this.toggleForm();
                    },
                    error: (err) => console.error('Error updating quote', err)
                });
        } else {
            this.quotesService.createQuote(this.quoteForm).subscribe({
                next: () => {
                    this.loadQuotes();
                    this.toggleForm();
                },
                error: (err) => console.error('Error creating quote', err)
            });
        }
    }

    editQuote(quote: Quote): void {
        this.editMode = true;
        this.currentQuoteId = quote.id;
        this.quoteForm = {
            text: quote.text,
            author: quote.author
        };
        this.showForm = true;
    }

    deleteQuote(id: number): void {
        if (confirm('Are you sure you want to delete this quote?')) {
            this.quotesService.deleteQuote(id).subscribe({
                next: () => this.loadQuotes(),
                error: (err) => console.error('Error deleting quote', err)
            });
        }
    }

    goToBooks(): void {
        this.router.navigate(['/books']);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    getThemeIcon(): string {
        return this.themeService.isDarkMode() ? '☀️' : '🌙';
    }

    getThemeTooltip(): string {
        return this.themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
}

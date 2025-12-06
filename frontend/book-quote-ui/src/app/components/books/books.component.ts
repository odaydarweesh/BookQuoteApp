import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-books',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    books: any[] = [];
    showForm: boolean = false;
    editMode: boolean = false;
    currentBookId: number | null = null;
    isLoading: boolean = false;

    bookForm = {
        title: '',
        author: '',
        publishedDate: ''
    };

    constructor(
        private booksService: BooksService,
        private authService: AuthService,
        private router: Router,
        public themeService: ThemeService
    ) { }

    ngOnInit(): void {
        this.loadBooks();
    }

    loadBooks(): void {
        this.isLoading = true;
        this.booksService.getBooks().subscribe({
            next: (books) => {
                this.books = books;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading books:', error);
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
        this.bookForm = {
            title: '',
            author: '',
            publishedDate: ''
        };
        this.editMode = false;
        this.currentBookId = null;
    }

    onSubmit(): void {
        if (this.editMode && this.currentBookId) {
            this.booksService.updateBook(this.currentBookId, this.bookForm).subscribe({
                next: () => {
                    this.loadBooks();
                    this.toggleForm();
                },
                error: (error) => console.error('Error updating book:', error)
            });
        } else {
            this.booksService.createBook(this.bookForm).subscribe({
                next: () => {
                    this.loadBooks();
                    this.toggleForm();
                },
                error: (error) => console.error('Error creating book:', error)
            });
        }
    }

    editBook(book: any): void {
        this.editMode = true;
        this.currentBookId = book.id;
        this.bookForm = {
            title: book.title,
            author: book.author,
            publishedDate: book.publishedDate.split('T')[0]
        };
        this.showForm = true;
    }

    deleteBook(id: number): void {
        if (confirm('Are you sure you want to delete this book?')) {
            this.booksService.deleteBook(id).subscribe({
                next: () => this.loadBooks(),
                error: (error) => console.error('Error deleting book:', error)
            });
        }
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

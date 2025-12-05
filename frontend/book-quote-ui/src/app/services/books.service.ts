import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    createdAt: string;
    userId: number;
}

interface CreateBookRequest {
    title: string;
    author: string;
    publishedDate: string;
}

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private apiUrl = 'https://bookquoteapp-8pxm.onrender.com/api/Auth';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.apiUrl);
    }

    getBook(id: number): Observable<Book> {
        return this.http.get<Book>(`${this.apiUrl}/${id}`);
    }

    createBook(book: CreateBookRequest): Observable<Book> {
        return this.http.post<Book>(this.apiUrl, book);
    }

    updateBook(id: number, book: CreateBookRequest): Observable<Book> {
        return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
    }

    deleteBook(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}

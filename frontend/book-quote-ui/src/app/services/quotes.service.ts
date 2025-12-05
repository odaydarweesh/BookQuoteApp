import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments';
export interface Quote {
    id: number;
    text: string;
    author: string;
    createdAt: string;
    userId: number;
}

export interface CreateQuoteRequest {
    text: string;
    author: string;
}

@Injectable({
    providedIn: 'root'
})
export class QuotesService {
    private apiUrl = environment.apiUrlQuotes;


    constructor(private http: HttpClient) { }

    getQuotes(): Observable<Quote[]> {
        return this.http.get<Quote[]>(this.apiUrl);
    }

    createQuote(request: CreateQuoteRequest): Observable<Quote> {
        return this.http.post<Quote>(this.apiUrl, request);
    }

    updateQuote(id: number, request: CreateQuoteRequest): Observable<Quote> {
        return this.http.put<Quote>(`${this.apiUrl}/${id}`, request);
    }

    deleteQuote(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

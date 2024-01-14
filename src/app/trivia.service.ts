import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

const TRIVIA_ENDPOINT: string = 'https://opentdb.com/api.php?amount=1&difficulty=medium';

@Injectable({
    providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) { }

    getQuestion() {
        return this.http.get(TRIVIA_ENDPOINT);
    }
}
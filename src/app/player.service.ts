import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  private apiUrl = 'https://localhost:8000';
  
  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
    });
    return this.http.get<Player[]>(this.apiUrl + '/players');
  }
}

export interface Player {
  id: Number,
  name: String,
  answers: Number,
  points: number
}
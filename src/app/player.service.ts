import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<Player[]>(this.apiUrl + '/api/players')
    // .pipe(
    //   map((res:any) => {
    //     let modifiedResult = res.data;
    //     modifiedResult = modifiedResult.map(function(player: { isUpdating: boolean; }) {
    //       player.isUpdating = false;
    //       return player;
    //     });
    //     return modifiedResult;
    //   })
    // )
  };

  addPlayer(player: any): Observable<Player> {
    return this.http.post(this.apiUrl + '/api/players', player)
      .pipe(map((res: any) => res.data));
  }

  deletePlayer(id: any): Observable<Player> {
    return this.http.delete(this.apiUrl + '/api/players/' + id)
      .pipe(map(() => {
        return {
          id: id,
          name: 'Deleted Player',
          answers: 0,
          points: 0,
          isUpdating: false,
        } as Player;
      }
      ));
  }

  answer(id: any, data: any): Observable<Player> {
    return this.http.post<Player>(this.apiUrl + '/api/players/' + id + '/answers', data);
  }
}

export interface Player {
  id: Number,
  name: String,
  answers: Number,
  points: number,
  isUpdating: boolean,
}
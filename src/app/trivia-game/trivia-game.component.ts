import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

  players: Player[] | undefined;
  errorMessage: string | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers() {
    this.playerService
      .getPlayers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (players) => (this.players = players),
        error: (error) => (this.errorMessage = <any>error)
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

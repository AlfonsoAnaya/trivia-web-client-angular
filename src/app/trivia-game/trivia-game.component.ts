import { Component, OnInit } from '@angular/core';
import { Player, PlayerService } from '../player.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TriviaService } from '../trivia.service';

@Component({
  selector: 'app-trivia-game',
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {

  players: { data: Player[] } | any;
  errorMessage: any;
  isLoading: boolean = true;
  question: any;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private playerService: PlayerService,
    private triviaService: TriviaService,) { }

  ngOnInit(): void {
    this.getPlayers();
    this.getQuestion();
  }

  findPlayer(id: any): Player | undefined {
    return this.players?.find((player: { id: any; }) => player.id === id);
  }

  isUpdating(id: any): boolean | undefined {
    return this.findPlayer(id)?.isUpdating;
  }

  appendPlayer(player: Player) {
    this.players.push(player);
  }

  getPlayers() {
    this.playerService
      .getPlayers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => (this.players = res.data,
          this.isLoading = false
          // console.log(res),
          // console.log(Object.keys(res))
        ),
        error: (error) => (this.errorMessage = <any>error,
          this.isLoading = false)
      });
  }

  deletePlayer(id: any) {
    let player: any = this.findPlayer(id);
    player.isUpdating = true;
    this.playerService
      .deletePlayer(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          let index = this.players.findIndex((player: any) => player.id === id);
          this.players.splice(index, 1);
          player.isUpdating = false
        },
        error: (error) => (this.errorMessage = <any>error,
          player.isUpdating = false)
      });
  }

  getQuestion() {
    this.triviaService
      .getQuestion()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (response: any) => {
            this.question = response.results[0],
            console.log(Object.keys(this.question));
          },
          error: (error) => (this.errorMessage = <any>error)
        }
      );
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Player, PlayerService } from '../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})

export class PlayerFormComponent implements OnInit {

  errors: string = '';
  isLoading: boolean = false;

  constructor(private playerService: PlayerService) { }

  @Output()
  playerAdded: EventEmitter<Player> = new EventEmitter<Player>();

  ngOnInit() {
  }

  addPlayer(name:any) {
      this.isLoading = true;
      this.playerService
          .addPlayer({
              name: name
          })
          .subscribe({
              next: (player:any) => (
                this.isLoading = false,
                player.isUpdating = false,
                this.playerAdded.emit(player)
            ),
              error: (error:any) => (
                this.errors = error.json().errors,
                this.isLoading = false
            )}              
          );
  }
}
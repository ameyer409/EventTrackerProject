import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../../models/game';

@Component({
  selector: 'app-gametracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gametracker.component.html',
  styleUrl: './gametracker.component.css',
})
export class GametrackerComponent implements OnInit {
  searchTerm: string = '';
  genreTerm: string = '';
  ratingTerm: string = '';
  low: number = 0;
  high: number = 5;
  newGame = new Game();
  editGame: Game | null = null;
  showComplete: boolean = false;
  games: Game[] = [];
  selected: Game | null = null;

  constructor(private gameService: GameService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    this.gameService.index().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (err) => {
        console.error(
          'GameTrackerHttpComponent.loadGames(): error loading Games:'
        );
        console.error(err);
      },
    });
  }

  displayGame(game: Game): void {
    this.selected = game;
    console.log(this.selected);
  }

  displayTable(): void {
    this.selected = null;
  }

  setEditGame() {
    this.editGame = Object.assign({}, this.selected);
  }

  updateGame(game: Game): void {
    this.gameService.update(game).subscribe({
      next: (result) => {
        this.loadGames();
        if (this.selected != null && this.editGame != null) {
          this.selected = Object.assign({}, this.editGame);
        }
        this.editGame = null;
      },
      error: (err) => {
        console.error(
          'GameTrackerHttpCompenent.updateGame(): error updating Game'
        );
        console.error(err);
      },
    });
  }

  addGame(game: Game): void {
    game.releaseDate = new Date(game.releaseDate);
    game.completedDate = new Date(game.completedDate);
    this.gameService.create(game).subscribe({
      next: (result) => {
        this.loadGames();
        this.newGame = new Game();
      },
      error: (err) => {
        console.error('GameTrackerHttpCompenent.addGame(): error adding Game');
        console.error(err);
      },
    });
  }

  deleteGame(id: number): void {
    this.gameService.destroy(id).subscribe({
      next: () => {
        this.loadGames();
      },
      error: (err) => {
        console.error(
          'GameTrackerHttpComponent.deleteGame(): error deleting Game'
        );
        console.error(err);
      },
    });
  }

  findGamesByGenre(genre: string) {
    if (genre === '') {
      this.loadGames();
    } else {
      this.gameService.gamesByGenre(genre).subscribe({
        next: (games) => {
          this.games = games;
        },
        error: (err) => {
          console.error(
            'GameTrackerHttpComponent.gamesByGenre(): error loading Games:'
          );
          console.error(err);
        },
      });
    }
  }

  findGamesByRating(rating: string) {
      this.gameService.gamesByRating(rating).subscribe({
        next: (games) => {
          this.games = games;
        },
        error: (err) => {
          console.error(
            'GameTrackerHttpComponent.gamesByGenre(): error loading Games:'
          );
          console.error(err);
        },
      });
    }

    findGamesByScore(low: number, high: number) {
      this.gameService.gamesByScore(low, high).subscribe({
        next: (games) => {
          this.games = games;
        },
        error: (err) => {
          console.error(
            'GameTrackerHttpComponent.gamesByGenre(): error loading Games:'
          );
          console.error(err);
        },
      });
    }

  findGamesByKeyword(keyword: string) {
    if (keyword === '') {
      this.loadGames();
    }
    else {
      this.gameService.gamesByKeyword(keyword).subscribe({
        next: (games) => {
          this.games = games;
        },
        error: (err) => {
          console.error(
            'GameTrackerHttpComponent.gamesByGenre(): error loading Games:'
          );
          console.error(err);
        },
      });
    }
  }
}

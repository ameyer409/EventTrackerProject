import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Game } from '../models/game';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.baseUrl + 'api/games'
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
    ) { }

  public index(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.index(): error retrieving games: ' + err)
        );
      })
    );
  }

  public show(id: number): Observable<Game> {
    return this.http.get<Game>(this.url + "/" + id).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('GameService.show: error finding Game: ' + err)
        );
      })
    );
  }

  public create(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url, game).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('GameService.create: error creating Game: ' + err)
        );
      })
    );
  }

  // private generateId() {
  //   return this.todos[this.todos.length-1].id + 1;
  // }

  public update(game: Game): Observable<Game> {
    return this.http.put<Game>(this.url + '/' + game.id, game).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('GameService.update(): error updating Game: ' + err)
        );
      })
    );
    // this.todos[todo.id-1].task = todo.task;
    // this.todos[todo.id-1].completed = todo.completed;
    // this.todos[todo.id-1].description = todo.description;
  }

  public destroy(id: number): Observable<Game> {
    return this.http.delete<Game>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        return throwError(
          () => new Error('GameService.destroy(): error destroying Game: ' + err)
        );
      })
    );
  }

  public gamesByGenre(genre: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "/search/genres/" + genre).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.gamesByGenre(): error retrieving games: ' + err)
        );
      })
    );
  }

  public gamesByRating(rating: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "/search/ratings/" + rating).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.gamesByRatings(): error retrieving games: ' + err)
        );
      })
    );
  }

  public gamesByScore(low: number, high: number): Observable<Game[]> {
    if(low === null) {
      low = 0;
    }
    if(high === null) {
      high = 5;
    }
    return this.http.get<Game[]>(this.url + '/search/scores/' + low + '/' + high).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.gamesByScores(): error retrieving games: ' + err)
        );
      })
    );
  }

  public gamesByKeyword(keyword: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "/search/" + keyword).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('GameService.gamesByKeyword(): error retrieving games: ' + err)
        );
      })
    );
  }

}

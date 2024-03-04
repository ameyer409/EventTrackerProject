import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.baseUrl + 'api/games'
  constructor(private http: HttpClient) { }

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
          () => new Error('TodoService.destroy: error creating Todo: ' + err)
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
          () => new Error('TodoService.destroy: error creating Todo: ' + err)
        );
      })
    );
  }
}

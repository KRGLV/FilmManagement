import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Film } from '../interfaces/film';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private filmsUrl = 'https://ghibliapi.herokuapp.com/films'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /** GET film from the server */
  getFilms(): Observable<Film[]> {
    return this.http
      .get<Film[]>(this.filmsUrl)
      .pipe(catchError(this.handleError<Film[]>('getFilms', [])));
  }

  /** GET film by id. Return `undefined` when id not found */
  getFilmNo404<Data>(id: number): Observable<Film> {
    const url = `${this.filmsUrl}/?id=${id}`;
    return this.http.get<Film[]>(url).pipe(
      map((films) => films[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} film id=${id}`);
      }),
      catchError(this.handleError<Film>(`getFilm id=${id}`))
    );
  }

  /** GET film by id. Will 404 if id not found */
  getFilm(id: string): Observable<Film> {
    const url = `${this.filmsUrl}/${id}`;
    return this.http.get<Film>(url).pipe(
      tap((_) => this.log(`fetched film id=${id}`)),
      catchError(this.handleError<Film>(`getFilm id=${id}`))
    );
  }

  /* GET films whose name contains search term */
  searchFilmes(term: string): Observable<Film[]> {
    if (!term.trim()) {
      // if not search term, return empty film array.
      return of([]);
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found films matching "${term}"`)
          : this.log(`no films matching "${term}"`)
      ),
      catchError(this.handleError<Film[]>('searchFilmes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a FilmService message with the MessageService */
  private log(message: string) {
    //this.messageService.add(`FilmService: ${message}`);
    console.log('Update....', message);
  }
}

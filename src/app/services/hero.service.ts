import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content Type': 'application/json' })
  }

  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched Hero ID=${id}`)),
      catchError(this.handleError<Hero>(`getHero ID=${id}`))
    )
  }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }

  // Update
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Updated Hero ID=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  // Add
  add(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added Hero with ID=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Delete
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // Search
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
        )
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}

import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private readonly url: string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150";

  constructor(private http: HttpClient) { }

  get apiListAllPokemon(): Observable <any>{
    return this.http.get<any>(this.url).pipe(
      tap(
        res => res),
        tap(res => {
          res.results.map( (resPokemons: any) => {
            this.apiGetPokemons(resPokemons.url).subscribe(
              res => resPokemons.status = res)
          })
        })
    )
  }

  public apiGetPokemons(url:string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
all = '',
music = 'music',
sports = 'sports',
theatre = 'theatre',
film = 'film',
family = 'family',
miscellaneous = 'miscellaneous',
}

@Injectable({
  providedIn: 'root',
})
export class Event {
  
  url = 'https://app.ticketmaster.com/discovery/v2/events.json?'
  urlEvents = 'https://app.ticketmaster.com/discovery/v2/events/'
  apiKey = 'CzpnzhQkiZys4bR9Al0tdqAVlA4MJGhB'

  constructor(private http: HttpClient){ }


  searchData(title: string, type: SearchType): Observable<any>{

    return this.http.get(`${this.url}keyword=${encodeURI(title)}&classificationName=${type}&apikey=${this.apiKey}`).pipe(
      map( (results: any ) => {
        console.log('RAW: ', results);
        return results?._embedded?.events ?? [];
      })
    );
  }

  getDetails(id : string): Observable<any>{
    return this.http.get(`${this.urlEvents}${id}.json?&apikey=${this.apiKey}`).pipe(
      map( (results: any ) => {
        console.log('RAW: ', results);
        return results;
      })
    );

  }

}

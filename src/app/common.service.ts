import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // httpOptions = {
  //   // headers?: HttpHeaders | {[header: string]: string | string[]},
  //   // observe?: 'body' | 'events' | 'response',
  //   observe : 'body',
  //   // params?: HttpParams|{[param: string]: string | string[]},
  //   // reportProgress?: boolean,
  //   responseType: 'json',
  // }
  genre : String = '';
  constructor(private http: HttpClient, private router : Router) {
    
  }

   setGenre(genre) {
     this.genre = genre;
     this.router.navigate(['books']);
   }

   getGenre() {
     return this.genre;
   }
   
   showData(isNext : boolean = false,nextUrl='') {
     if(!isNext)
     return this.http.get('http://skunkworks.ignitesol.com:8000/books?mime_type=image%2Fjpeg');
     else {
      return this.http.get(nextUrl);
     }
   }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  genre: String = '';
  constructor(private http: HttpClient, private router: Router) {

  }

  setGenre(genre) {
    this.genre = genre;
    this.router.navigate(['books']);
  }

  getGenre() {
    return this.genre;
  }

  getBooksData(isNext: boolean = false, nextUrl = '', searchParam = '', genre) {
    if (!isNext) {
      if (searchParam) {
        let params = searchParam.split(' ');
        console.log(searchParam);
        return this.http.get('http://skunkworks.ignitesol.com:8000/books?mime_type=image%2Fjpeg&search=' + params[0] + '%20' + params[1] + '&topic=' + genre);
      }
      return this.http.get('http://skunkworks.ignitesol.com:8000/books?mime_type=image%2Fjpeg' + '&topic=' + genre);
    }
    else {
      return this.http.get(nextUrl);
    }
  }

}

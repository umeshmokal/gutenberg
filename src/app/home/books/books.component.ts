import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Location } from '@angular/common'
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  genre : String = '';
  books = [];
  nextUrl = '';
  searchText = '';
  @ViewChild('bookSearchInput', { static: true }) bookSearchInput: ElementRef;
  constructor(
    private commonService : CommonService,
    private location :Location,
    )
  { }
  ngOnInit(): void {
    this.genre = this.commonService.getGenre();
    this.showBooksData(false);
    fromEvent(this.bookSearchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      console.log('res', text);
      this.searchText = text;
      this.showBooksData();
    });
  }

  showBooksData(isNext:boolean = false) {
    this.commonService.getBooksData(isNext,this.nextUrl,this.searchText,this.genre).subscribe(res => {
      console.log(res);
      if(res && (res['next'] === null && res['previous'] === null)) 
        this.books = res['results'];
      this.books.push(...res['results']);
      this.nextUrl = res['next'];
    });
  }

  backToGenres() {
    this.location.back();
  }

  showBookDetails(item) {
    let url = "";
    let formats = item['formats'];
    let keys = Object.keys(formats);
    keys.forEach(item => {
      if(item.includes('text/html')) {
        url = formats[item];
        return;
      } else if(item.includes('text/plain')) {
        url = formats[item];
        return;
      }
    });
    if(url) {
      window.open(url, "_blank");
    } else {
      alert('No viewable version available');
    }
  }

  onScrollDown(){
    console.log("Scrolling down");
    if(this.nextUrl)
    this.showBooksData(true);
  }

  onScrollUp() {
    console.log("Scrolling up");
  }

  clearSearch() {
    this.searchText = '';
    this.books = [];
    this.showBooksData();
  }
}

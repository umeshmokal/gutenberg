import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  genre : String = '';
  books = [];
  nextUrl = ''
  constructor(
    private commonService : CommonService,
    private location :Location
    )
  { }
  ngOnInit(): void {
    this.genre = this.commonService.getGenre();
    this.showBooksData(false);
  }

  showBooksData(isNext:boolean = false) {
    this.commonService.showData(isNext,this.nextUrl).subscribe(res => {
      console.log(res);
      this.books.push(...res['results']);
      this.nextUrl = res['next'];
    });
  }

  search(evt) {
    const searchText = evt.target.value;
    console.log(searchText); 
  }

  backToGenres() {
    this.location.back();
  }

  showBookDetails(item) {
    let url = "";
    let formats = item['formats'];
    let keys = Object.keys(formats);
    console.log(keys);
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
    this.showBooksData(true);
  }

  onScrollUp() {
    console.log("Scrolling up");
  }
}

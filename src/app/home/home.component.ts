import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookGenres = [
    {
      name : 'Fiction',
      image : 'Flask.png'
    },
    {
      name : 'Drama',
      image : 'Drama.png'
    },
    {
      name : 'Humor',
      image : 'Humor.png'
    },
    {
      name : 'Politics',
      image : 'Politics.png'
    },
    {
      name : 'Philosophy',
      image : 'Philosophy.png'
    },
    {
      name : 'History',
      image : 'History.png'
    },
    {
      name : 'Adventure',
      image : 'Adventure.png'
    }
  ]
  constructor(private commonService : CommonService) { }
  ngOnInit(): void {
  }

  //Get specific genre of books
  selectCategory(item) {
    this.commonService.setGenre(item.name);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = [
    {
      name : 'Fiction',
      image : 'Flask.png'
    },
    {
      name : 'Drama',
      image : ''
    },
    {
      name : 'Humor',
      image : ''
    },
    {
      name : 'Politics',
      image : ''
    },
    {
      name : 'Philosophy',
      image : ''
    },
    {
      name : 'History',
      image : ''
    },
    {
      name : 'Adventure',
      image : ''
    }
  ]
  constructor(private commonService : CommonService) { }
  ngOnInit(): void {
  }

  selectCategory(item) {
    this.commonService.setGenre(item.name);
  }

}

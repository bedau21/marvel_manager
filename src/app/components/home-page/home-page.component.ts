import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { AppConst } from '../../ultity/constant';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  heroes: any = null;
  page = 1;
  offset = 0;
  AppConst = AppConst;
  loadMore = false;
  hasMoreHeroes = true;
  isLoading = false;
  constructor(private marvelService: MarvelService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.marvelService.getAllHeroes(this.offset).subscribe(res => {
      this.offset += AppConst.LIMIT;
      if (res.results) {
        this.heroes = this.heroes ? this.heroes.concat(res.results) : res.results;
      }
      if (this.page * AppConst.LIMIT >= res.total) {
        this.hasMoreHeroes = false;
      }
      this.isLoading = false;
    });
  }

  getThumbnailPath(character) {
    return this.marvelService.getThumbnailPath(character.thumbnail.path, character.thumbnail.extension);
  }

  onScroll() {
    if (this.isLoading) {
      return true;
    }
    this.isLoading = true;
    this.getHeroes();
  }
}

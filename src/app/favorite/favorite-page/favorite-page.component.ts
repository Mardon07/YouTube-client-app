// src/app/favorite/favorite-page/favorite-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Video } from '../../redux/models/video.model';
import { selectFavoriteCards } from '../../redux/selectors/favorite-card.selector';
import { ResponseItem } from '../../youtube/models/video-response.model';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent implements OnInit {
  filteredResults$: Observable<ResponseItem[]> | undefined;
  constructor(private store: Store) {
    this.filteredResults$ = store.select(selectFavoriteCards);
  }

  ngOnInit(): void {
  }

  
}

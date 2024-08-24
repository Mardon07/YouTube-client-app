import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import {
  addFavoruteCard,
  deleteFavoruteCard,
} from '../../../../redux/actions/favorite.action';
import { isCardFavorite } from '../../../../redux/selectors/favorite-card.selector';
import { ResponseItem } from '../../../models/video-response.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  date = 0;
  favoriteButton = false;
  daysSincePublished!: number;
  @Input() videoTitle: string | undefined;
  @Input() thumbnailUrl: string | undefined;
  @Input() viewCount: string | undefined;
  @Input() likeCount: string | undefined;
  @Input() dislikeCount: string | undefined;
  @Input() commentCount: string | undefined;
  @Input() publishedAt: string | undefined;
  @Input() id: string | undefined;
  @Input() item: ResponseItem | undefined;

  isFavorite$: Observable<boolean> | undefined
  constructor(private store: Store) {}
  ngOnInit(): void {
    if (this.id) {
      this.isFavorite$ = this.store.select(isCardFavorite(this.id));
    }
    this.calculateDaysSincePublished();
  }

  calculateDaysSincePublished(): void {
    const publishedAtDate = new Date(this.publishedAt!);
    const currentDate = new Date();
    this.daysSincePublished = Math.floor(
      (currentDate.getTime() - publishedAtDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }
  toggleFavorite() {
    this.isFavorite$?.pipe(first()).subscribe((isFavorite) => {
      if (isFavorite) {
        this.store.dispatch(deleteFavoruteCard({ videoId: this.id! }));
      } else {
        this.store.dispatch(addFavoruteCard({ video: this.item! }));
      }
      console.log(isFavorite);
    });
  }
}

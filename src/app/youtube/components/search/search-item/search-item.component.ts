import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  ngOnInit(): void {
    this.calculateDaysSincePublished();
  }

  date = 0;
  daysSincePublished!: number;
  @Input() videoTitle: string | undefined;
  @Input() thumbnailUrl: string | undefined;
  @Input() viewCount: string | undefined;
  @Input() likeCount: string | undefined;
  @Input() dislikeCount: string | undefined;
  @Input() commentCount: string | undefined;
  @Input() publishedAt: string | undefined;
  @Input() id: string| undefined

  onMoreButtonClick() {
    console.log('More button clicked');
  }

  calculateDaysSincePublished(): void {
    const publishedAtDate = new Date(this.publishedAt!);
    const currentDate = new Date();
    this.daysSincePublished = Math.floor(
      (currentDate.getTime() - publishedAtDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }
}

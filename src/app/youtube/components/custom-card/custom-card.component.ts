import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss'
})
export class CustomCardComponent implements OnInit {
  date = 0;
  daysSincePublished!: number;
  @Input() videoTitle: string | undefined;
  @Input() thumbnailUrl: string | undefined;
  @Input() viewCount: string | undefined;
  @Input() likeCount: string | undefined;
  @Input() dislikeCount: string | undefined;
  @Input() commentCount: string | undefined;
  @Input() publishedAt: Date | undefined;
  @Input() id: string | undefined;
  ngOnInit(): void {
    this.calculateDaysSincePublished();
    
  }

  

  calculateDaysSincePublished(): void {
    const publishedAtDate = this.publishedAt!;
    const currentDate = new Date();
    this.daysSincePublished = Math.floor(
      (currentDate.getTime() - publishedAtDate.getTime()) 
    );
    
  }
}

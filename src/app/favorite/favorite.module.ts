import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { YoutubeModule } from '../youtube/youtube.module';

@NgModule({
  declarations: [FavoritePageComponent],
  imports: [CommonModule, YoutubeModule],
})
export class FavoriteModule {}

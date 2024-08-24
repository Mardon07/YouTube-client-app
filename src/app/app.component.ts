import { Component, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SearchService } from './shared/services/search.service';
import { YoutubeModule } from './youtube/youtube.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FavoriteModule } from './favorite/favorite.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreModule,
    MatSlideToggleModule,
    RouterModule,
    AuthModule,
    YoutubeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FavoriteModule
  ],
  providers: [SearchService, MatDatepickerModule, MatNativeDateModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'youtube-intro';
}

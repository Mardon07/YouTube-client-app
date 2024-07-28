import { Component, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, RouterOutlet } from '@angular/router';
import { appConfig } from './app.config';
import { routeConfig } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SearchService } from './shared/services/search.service';
import { YoutubeModule } from './youtube/youtube.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
  ],
  providers: [SearchService, ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'youtube-intro';
}

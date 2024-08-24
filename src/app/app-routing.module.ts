import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardCreationComponent } from './auth/components/card-creation/card-creation.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { FavoritePageComponent } from './favorite/favorite-page/favorite-page.component';
import { SearchResultsComponent } from './youtube/components/search/search-results/search-results.component';
import { DetailedInformationComponent } from './youtube/pages/detailed-information/detailed-information.component';

export const routeConfig: Routes = [
  {
    path: '',
    component: SearchResultsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'video/:id', component: DetailedInformationComponent },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: CardCreationComponent,
  },
  { path: 'favorite', component: FavoritePageComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

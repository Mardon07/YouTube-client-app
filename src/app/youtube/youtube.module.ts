import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BorderColorDirective } from './directives/border-color.directive';
import { SharedModule } from '../shared/shared.module';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { RouterModule } from '@angular/router';
import { DetailedInformationComponent } from './pages/detailed-information/detailed-information.component';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    BorderColorDirective,
    SearchFilterPipe,
    DetailedInformationComponent,
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    SharedModule,
    CommonModule,
    MatIcon,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    SearchItemComponent,
    SearchResultsComponent,
    DetailedInformationComponent,
  ],
})
export class YoutubeModule {}

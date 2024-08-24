import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, filter, Observable, Subject, switchMap } from 'rxjs';
import { loadYouTubeVideosSuccess } from '../../../../redux/actions/video.actions';
import { CustomCard } from '../../../../redux/models/custom-card.model';
import { SearchService } from '../../../../shared/services/search.service';
import { ResponseItem } from '../../../models/video-response.model';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  filteredResults$: Observable<ResponseItem[]> | undefined;
  customCardResults$: Observable<CustomCard[]> | undefined;
  searchQuery = '';
  filterQuery = '';
  private searchSubject = new Subject<string>();
  constructor(
    private searchService: SearchService,
    private store: Store<{
      videoCard: ResponseItem[];
      customCard: CustomCard[];
    }>,
  ) {
    this.filteredResults$ = store.select('videoCard');
    this.customCardResults$ = store.select('customCard');
  }

  ngOnInit(): void {
    // this.searchService.resultsChanged.subscribe((results: ResponseItem[]) => {
    //   this.filteredResults = results;
    // });
    // this.searchService.resultsChanged.subscribe((results: ResponseItem[]) => {
    //   this.filteredResults = results;
    // });
    this.searchSubject.next(this.searchQuery);
    this.searchService.searchQueryChanged.subscribe((query: string) => {
      this.searchQuery = query;
    });

    // this.searchService.filterQueryChanged.subscribe((query: string) => {
    //   this.filterQuery = query;
    // });
  }

  loadNextPage() {
    if (this.searchService.nextPageToken) {
      this.searchService.searchVideos(this.searchQuery, this.searchService.nextPageToken)
        .subscribe((videos) => {
          this.store.dispatch(loadYouTubeVideosSuccess({ videos }));
        });
    }
  }

  loadPrevPage() {
    if (this.searchService.prevPageToken) {
      this.searchService.searchVideos(this.searchQuery, this.searchService.prevPageToken)
        .subscribe((videos) => {
          this.store.dispatch(loadYouTubeVideosSuccess({ videos }));
        });
    }}
}

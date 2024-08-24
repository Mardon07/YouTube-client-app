import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, filter, Observable, Subject, switchMap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { loadYouTubeVideosSuccess } from '../../../redux/actions/video.actions';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  private searchSubject = new Subject<string>();
  filterQuery = '';
  filterButtonStatus = false;
  currentSort: { criteria: string; order: 'asc' | 'desc' } = {
    criteria: 'date',
    order: 'asc',
  };
  isLoggedIn: Observable<boolean> | undefined;

  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        filter((value) => value.length >= 3),
        debounceTime(300),
        switchMap((value) => this.searchService.searchVideos(value)),
      )
      .subscribe((videos) => {
        
        
        // this.searchService.updateSearchResults(videos);
        this.store.dispatch(loadYouTubeVideosSuccess({ videos }));
      });
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  onSortChange(criteria: string) {
    this.currentSort = {
      criteria: criteria,
      order: this.currentSort.order === 'asc' ? 'desc' : 'asc',
    };
    this.searchService.setSortCriteria(this.currentSort);
  }

  toggleFilter() {
    this.filterButtonStatus = !this.filterButtonStatus;
  }

  onFilterChange(query: string) {
    this.filterQuery = query;
    this.searchService.filterQueryChanged.emit(query);
  }
}

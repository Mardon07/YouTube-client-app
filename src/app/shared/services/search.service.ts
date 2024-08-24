import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { loadYouTubeVideosSuccess } from '../../redux/actions/video.actions';
import {
  ResponseData,
  ResponseDataVideo,
  ResponseItem,
  ResponseItemWithVideoId,
} from '../../youtube/models/video-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: ResponseItem[] | undefined;
  private searchQuery = '';
  private sortCriteria: { criteria: string; order: 'asc' | 'desc' } = {
    criteria: 'date',
    order: 'asc',
  };
  nextPageToken: string | undefined;
  prevPageToken: string | undefined;
  resultsChanged = new EventEmitter<ResponseItem[]>();
  searchQueryChanged = new EventEmitter<string>();
  filterQueryChanged = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  searchVideos(query: string,  pageToken?: string) {
    const url = `/search?type=video&part=snippet&maxResults=20&q=${query}&pageToken=${pageToken || ''}`;
    this.searchQuery = query;
    this.searchQueryChanged.emit(this.searchQuery);
    return this.http.get<ResponseDataVideo>(url).pipe(
      tap((response) => {
        this.nextPageToken = response.nextPageToken;
        this.prevPageToken = response.prevPageToken;
      }),
      map((response) => response.items),
      switchMap((items: ResponseItemWithVideoId[]) => {
        const videoIds = items.map((item) => item.id.videoId).join(',');
       
        
        return this.getVideoDetails(videoIds);
      }),
    );
  }
  getVideoDetails(videoIds: string): Observable<ResponseItem[]> {
    const url = `/videos?id=${videoIds}&part=snippet,statistics`;
    return this.http
      .get<ResponseData>(url)
      .pipe(map((response) => response.items));
  }

  setSortCriteria(sortCriteria: { criteria: string; order: 'asc' | 'desc' }) {
    this.sortCriteria = sortCriteria;
    this.sortResults();
  }

  getResults(): ResponseItem[] {
    return this.searchResults!;
  }

  // nextPage() {
  //   if (this.nextPageToken) {
  //     console.log(this.nextPageToken);
  //     this.searchVideos(this.searchQuery, this.nextPageToken)
  //     // this.searchVideos();
  //   }
  // }

  // prevPage() {
  //   if (this.prevPageToken) {
  //     console.log(this.prevPageToken);
      
  //     this.searchVideos(this.searchQuery, this.prevPageToken);
  //   }
  // }

  // updateSearchResults(videos: ResponseItem[]) {
  //   // this.store.dispatch(loadYouTubeVideosSuccess({ videos }));
  //   this.searchResults = videos;
  //   this.sortResults();
  //   this.resultsChanged.emit(videos);
  // }

  private sortResults() {
    const { criteria, order } = this.sortCriteria;
    this.searchResults?.sort((a, b) => {
      if (criteria === 'date') {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return order === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else if (criteria === 'views') {
        return order === 'asc'
          ? +a.statistics.viewCount - +b.statistics.viewCount
          : +b.statistics.viewCount - +a.statistics.viewCount;
      }
      return 0;
    });
    this.resultsChanged.emit(this.searchResults);
  }
}

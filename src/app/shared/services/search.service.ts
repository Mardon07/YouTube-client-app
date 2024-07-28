import { EventEmitter, Injectable } from '@angular/core';
import * as response from '../../../assests/mock/response.json';
import { ResponseItem } from '../../youtube/models/video-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private data: ResponseItem[] = response.items;
  private searchResults: ResponseItem[] = [...this.data];
  private searchQuery = '';
  private sortCriteria: { criteria: string; order: 'asc' | 'desc' } = {
    criteria: 'date',
    order: 'asc',
  };

  resultsChanged = new EventEmitter<ResponseItem[]>();
  searchQueryChanged = new EventEmitter<string>();
  filterQueryChanged = new EventEmitter<string>();

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.updateSearchResults();
    this.searchQueryChanged.emit(this.searchQuery);
  }

  setSortCriteria(sortCriteria: { criteria: string; order: 'asc' | 'desc' }) {
    this.sortCriteria = sortCriteria;
    this.sortResults();
  }

  getResults(): ResponseItem[] {
    return this.searchResults;
  }

  private updateSearchResults() {
    this.searchResults = this.data.filter((item) =>
      item.snippet.title.includes(this.searchQuery),
    );
    this.sortResults();
    this.resultsChanged.emit(this.searchResults);
  }

  private sortResults() {
    const { criteria, order } = this.sortCriteria;
    this.searchResults.sort((a, b) => {
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
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchService } from '../../../../shared/services/search.service';
import { ResponseItem } from '../../../models/video-response.model';
@Component({
  selector: 'app-search-results',

  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  filteredResults: ResponseItem[] = [];
  searchQuery = '';
  filterQuery = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.filteredResults = this.searchService.getResults();

    this.searchService.resultsChanged.subscribe((results: ResponseItem[]) => {
      this.filteredResults = results;
    });

    this.searchService.searchQueryChanged.subscribe((query: string) => {
      this.searchQuery = query;
    });

    this.searchService.filterQueryChanged.subscribe((query: string) => {
      this.filterQuery = query;
    });
  }
}
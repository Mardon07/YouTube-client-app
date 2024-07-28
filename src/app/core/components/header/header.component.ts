import { Component } from '@angular/core';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchQuery = '';
  filterQuery = '';
  filterButtonStatus = false;
  currentSort: { criteria: string; order: 'asc' | 'desc' } = {
    criteria: 'date',
    order: 'asc',
  };

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.setSearchQuery(this.searchQuery);
  }

  onSearchChange(query: string) {
    this.searchService.setSearchQuery(query);
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

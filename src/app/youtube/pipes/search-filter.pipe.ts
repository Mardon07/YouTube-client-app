import { Pipe, PipeTransform } from '@angular/core';
import { ResponseItem } from '../models/video-response.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(
    items: ResponseItem[],
    filterQuery: string | undefined,
  ): ResponseItem[] {
    if (!items || !filterQuery) {
      return items;
    }
    return items.filter((item) =>
      item.snippet.title.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }
}

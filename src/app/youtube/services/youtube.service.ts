import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseData, ResponseItem } from '../models/video-response.model';
@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  getVideoDetails(videoIds: string): Observable<ResponseItem> {
    const url = `/videos?id=${videoIds}&part=snippet,statistics`;
    return this.http
      .get<ResponseData>(url)
      .pipe(map((response) => response.items[0]));
  }
}
